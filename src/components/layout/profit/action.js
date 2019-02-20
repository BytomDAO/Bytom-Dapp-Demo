import {
  spendUTXOAction, spendWalletAction, controlProgramAction, controlAddressAction,
  updateBalances, updateUtxo, listDappUTXO, contractArguments
} from '../../bytom'
import GetContractArgs from "../../constants";

export function FixedLimitProfit(account, amountBill, saver) {
    return listDappUTXO({
      "program": GetContractArgs().profitProgram,
      "asset": GetContractArgs().assetDeposited
    }).then(resp => {

      if(!resp) {
        throw 'cannot load UTXO info.'
      }

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
        input.push(spendWalletAction(amountBill, GetContractArgs().assetBill))

        if(amountBill < capitalAmount){
          output.push(controlProgramAction(amountBill, GetContractArgs().assetBill, GetContractArgs().banker ))
          output.push(controlAddressAction(gain, capitalAsset, saver))
          output.push(controlProgramAction((capitalAmount - gain), capitalAsset, GetContractArgs().profitProgram))
        }else{
          output.push(controlProgramAction(amountBill, GetContractArgs().assetBill, GetContractArgs().banker ))
          output.push(controlAddressAction(capitalAmount, capitalAsset, saver))
        }

        window.bytom.advancedTransfer(account, input, output, GetContractArgs().gas*10000000, args, 1)
          .then((resp) => {
            if(resp.action === 'reject'){
              reject('user reject the request')
            }else if(resp.action === 'success'){
              updateUtxo({"hash": utxo})
                .then(()=>{
                  updateBalances({
                    "address": saver,
                    "asset": GetContractArgs().assetDeposited,
                    "amount": amountBill*GetContractArgs().totalAmountCapital/GetContractArgs().totalAmountBill
                  }).then(()=>{
                    updateBalances({
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
}


