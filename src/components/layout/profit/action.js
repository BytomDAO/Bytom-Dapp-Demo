import {
  spendUTXOAction, spendWalletAction, controlProgramAction, controlAddressAction,
  contractArguments
} from '../../util/bytomAction'
import {
  updateBalances, listDappUTXO
} from '../../util/api'
import { submitContract } from '../../util/submitContract'
import GetContractArgs from '../../constants'
import { matchesUTXO } from '../../filter'
import BigNumber from 'bignumber.js'

export function FixedLimitProfit(account, amountBill, saver) {
  const object = {
    address: saver,
    amount: amountBill,
    parameter: [saver, amountBill, account]
  }
  return submitContract(listDepositUTXO, createContractTransaction, updateDatatbaseBalance, object)
}

function listDepositUTXO() {
  return listDappUTXO({
    "program": GetContractArgs().profitProgram,
    "asset": GetContractArgs().assetDeposited,
    "sort": {
      "by":"amount",
      "order":"desc"
    }
  })
}

function createContractTransaction(resp, amountBill, saver) {
  return new Promise((resolve, reject) => {
      if(resp.length === 0) {
        reject( 'Empty UTXO info, it might be that the utxo is locked. Please retry after 60s.')
      }else if(amountBill < 100000000){
        reject( 'Please enter an amount bigger or equal than 100000000.')
      }

      const radio = BigNumber( GetContractArgs().radio )
      const profitAmount = radio.multipliedBy(amountBill).toNumber()

      const result = matchesUTXO(resp, profitAmount)
      const capitalAmount = result.amount
      const capitalAsset = result.asset
      const utxo = result.hash

      if(profitAmount > capitalAmount) {
        reject( 'input amount must be smaller or equal to ' + capitalAmount/radio.toNumber() + '.')
      }else {
        const input = []
        const output = []

        const sAmountBill = BigNumber(amountBill).div(100000000)
        const sTotalAmountBill = BigNumber(GetContractArgs().totalAmountBill).div(100000000)
        const multiplyResult = BigNumber(GetContractArgs().totalAmountCapital).multipliedBy(sAmountBill)
        const gain = multiplyResult.div(sTotalAmountBill).toNumber()

        if (multiplyResult.isGreaterThan(9223372036854775807)) {
          reject( 'The entered amount is too big, please reduce the amount.')
        }

        const args = contractArguments(amountBill, saver)

        input.push(spendUTXOAction(utxo))
        input.push(spendWalletAction(amountBill, GetContractArgs().assetBill))

        if (gain < capitalAmount) {
          output.push(controlProgramAction(amountBill, GetContractArgs().assetBill, GetContractArgs().banker))
          output.push(controlAddressAction(gain, capitalAsset, saver))
          output.push(controlProgramAction((BigNumber(capitalAmount).minus(gain)).toNumber(), capitalAsset, GetContractArgs().profitProgram))
        } else {
          output.push(controlProgramAction(amountBill, GetContractArgs().assetBill, GetContractArgs().banker))
          output.push(controlAddressAction(capitalAmount, capitalAsset, saver))
        }

        resolve({
          input,
          output,
          args,
          utxo
        })
      }
  })
}

function updateDatatbaseBalance(resp, saver, amountBill, account){
  const transactionHash = resp.transaction_hash
  const radio = BigNumber( GetContractArgs().radio )
  const profitAmount = radio.multipliedBy(amountBill).toNumber()
  return updateBalances({
    "tx_id": transactionHash,
    "address": saver,
    "asset": GetContractArgs().assetDeposited,
    "amount": profitAmount
  }).then(()=>{
    return updateBalances({
      "tx_id": transactionHash,
      "address": account.address,
      "asset": GetContractArgs().assetBill,
      "amount": -amountBill
    })
  }).catch(err => {
    throw err
  })
}
