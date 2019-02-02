import {
  spendUTXOAction, spendWalletAction, controlProgramAction,
  controlAddressAction, listDappUTXO, updateBase, updateUtxo ,updateBalances
} from '../../bytom'
import {
  depositProgram, profitProgram, assetDeposited, assetBill, gas
} from "../../constants";

export function FixedLimitDeposit(account, amount, address) {
  return new Promise((resolve, reject) => {
    return listDappUTXO({
      "program": depositProgram,
      "asset": assetBill
    }).then(resp => {
      const billAmount = resp.amount
      const billAsset = resp.asset
      const utxo = resp.hash

      if(amount > billAmount){
        throw 'input amount must be smaller or equal to ' + billAmount +'.'
      }else{
        const input = []
        const output = []

        input.push(spendUTXOAction(utxo, amount, address))
        input.push(spendWalletAction(amount, assetDeposited))

        if(amount < billAmount){
          output.push(controlProgramAction(amount, assetDeposited, profitProgram))
          output.push(controlAddressAction(amount, billAsset, address))
          output.push(controlProgramAction((billAmount-amount), billAsset, depositProgram))
        }else{
          output.push(controlProgramAction(amount, assetDeposited, profitProgram))
          output.push(controlAddressAction(billAmount, billAsset, address))
        }

        window.bytom.advancedTransfer(account, input, output, gas*10000000)
          .then((resp) => {
            if(resp.action === 'reject'){
              reject('user reject the request')
            }else if(resp.action === 'success'){
              updateUtxo({"hash": utxo})
                .then(()=>{
                  updateBalances({
                    address,
                    "asset": assetDeposited,
                    "amount": -amount
                  }).then(()=>{
                    updateBalances({
                      address,
                      "asset": assetBill,
                      "amount": amount
                    }).then(()=>{
                      resolve()
                    })
                  })
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

export function UpdateProgramBase(){
  return updateBase({
    "program": depositProgram,
    "asset": assetBill
  })
}
