import {
  spendUTXOAction, spendWalletAction, controlProgramAction, controlAddressAction,
  updateBalances, updateUtxo, listDappUTXO, contractArguments
} from '../../bytom'
import GetContractArgs from '../../constants'
import { matchesUTXO } from '../../filter'
import BigNumber from 'bignumber.js'

export function FixedLimitProfit(account, amountBill, saver) {
  return new Promise((resolve, reject) => {
    return listDappUTXO({
      "program": GetContractArgs().profitProgram,
      "asset": GetContractArgs().assetDeposited,
      "sort": {
        "by":"amount",
        "order":"desc"
      }
    }).then(resp => {
      if(resp.length === 0) {
        throw 'Empty UTXO info, it might be that the utxo is locked. Please retry after 60s.'
      }else if(amountBill < 100000000){
        throw 'Please enter an amount bigger or equal than 100000000.'
      }

      const radio = BigNumber( GetContractArgs().radio )
      const matchesAmount = radio.multipliedBy(amountBill).toNumber()

      const result = matchesUTXO(resp, matchesAmount)
      const capitalAmount = result.amount
      const capitalAsset = result.asset
      const utxo = result.hash

      if(matchesAmount > capitalAmount) {
        throw 'input amount must be smaller or equal to ' + capitalAmount/radio.toNumber() + '.'
      }else{
        const input = []
        const output = []

        const sAmountBill = BigNumber(amountBill).div( 100000000 )
        const sTotalAmountBill = BigNumber(GetContractArgs().totalAmountBill).div( 100000000 )
        const multiplyResult = BigNumber( GetContractArgs().totalAmountCapital).multipliedBy( sAmountBill )
        const gain = multiplyResult.div( sTotalAmountBill ).toNumber()

        if( multiplyResult.isGreaterThan( 9223372036854775807 ) ){
          throw 'The entered amount is too big, please reduce the amount.'
        }

        const args = contractArguments(amountBill, saver)

        input.push(spendUTXOAction(utxo))
        input.push(spendWalletAction(amountBill, GetContractArgs().assetBill))

        if( gain < capitalAmount ){
          output.push(controlProgramAction(amountBill, GetContractArgs().assetBill, GetContractArgs().banker ))
          output.push(controlAddressAction(gain, capitalAsset, saver))
          output.push(controlProgramAction((BigNumber(capitalAmount).minus(gain)).toNumber(), capitalAsset, GetContractArgs().profitProgram))
        }else{
          output.push(controlProgramAction(amountBill, GetContractArgs().assetBill, GetContractArgs().banker ))
          output.push(controlAddressAction(capitalAmount, capitalAsset, saver))
        }

        updateUtxo({"hash": utxo})
          .then(()=>{
            window.bytom.advancedTransfer(account, input, output, GetContractArgs().gas*10000000, args, 1)
              .then((resp) => {
                if(resp.action === 'reject'){
                  reject('user reject the request')
                }else if(resp.action === 'success'){
                  updateBalances({
                    "tx_id": resp.message.result.data.transaction_hash,
                    "address": saver,
                    "asset": GetContractArgs().assetDeposited,
                    "amount": amountBill*GetContractArgs().totalAmountCapital/GetContractArgs().totalAmountBill
                  }).then(()=>{
                    updateBalances({
                      "tx_id": resp.message.result.data.transaction_hash,
                      "address": account.address,
                      "asset": GetContractArgs().assetBill,
                      "amount": -amountBill
                    }).then(()=>{
                      resolve()
                    }).catch(err => {
                      throw err
                    })
                  }).catch(err => {
                    throw err
                  })
                }
              })
              .catch(err => {
                throw err
              })
            })
          .catch(err => {
            throw err
          })
      }
    }).catch(err => {
      reject(err)
    })
  })
}


