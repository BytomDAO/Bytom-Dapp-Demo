import {
  spendUTXOAction, spendWalletAction, controlProgramAction, controlAddressAction,
  updateBalances, updateUtxo, listDappUTXO, contractArguments
} from '../../bytom'
import {profitProgram, assetDeposited, assetBill, gas, banker, totalAmountBill, totalAmountCapital} from "../../constants";

export function FixedLimitProfit(account, amountBill, saver) {
  return new Promise((resolve, reject) => {
    return listDappUTXO({
      "program": profitProgram,
      "asset": assetDeposited
    }).then(resp => {

      const capitalAmount = resp.amount
      const capitalAsset = resp.asset
      const utxo = resp.hash

      if(amountBill > capitalAmount) {
        throw 'input amount must be smaller or equal to ' + capitalAmount + '.'
      }else{
        const input = []
        const output = []

        const sAmountBill = amountBill/100000000
        const sTotalAmountBill = totalAmountBill/100000000
        const gain = totalAmountCapital*sAmountBill/sTotalAmountBill

        const args = contractArguments(amountBill, saver)

        input.push(spendUTXOAction(utxo))
        input.push(spendWalletAction(amountBill, assetBill))

        if(amountBill < capitalAmount){
          output.push(controlProgramAction(amountBill, assetBill, banker ))
          output.push(controlAddressAction(gain, capitalAsset, saver))
          output.push(controlProgramAction((capitalAmount - gain), capitalAsset, profitProgram))
        }else{
          output.push(controlProgramAction(amountBill, assetBill, banker ))
          output.push(controlAddressAction(capitalAmount, capitalAsset, saver))
        }

        window.bytom.advancedTransfer(account, input, output, gas*10000000, args)
          .then((resp) => {
            if(resp.action === 'reject'){
              reject('user reject the request')
            }else if(resp.action === 'success'){
              updateUtxo({"hash": utxo})
                .then(()=>{
                  updateBalances({
                    "address": saver,
                    "asset": assetDeposited,
                    "amount": amountBill*totalAmountCapital/totalAmountBill
                  }).then(()=>{
                    updateBalances({
                      "address": account.address,
                      "asset": assetBill,
                      "amount": -amountBill
                    }).then(()=>{
                      resolve()
                    }).catch(err => {
                      throw err
                    })
                  }).catch(err => {
                    throw err
                  })
                })
                .catch(err => {
                  throw err
                })
            }
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
