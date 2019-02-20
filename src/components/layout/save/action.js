import {
  spendUTXOAction, spendWalletAction, controlProgramAction,
  controlAddressAction, listDappUTXO, updateUtxo, updateBalances,
  contractArguments
} from '../../bytom'
import GetContractArgs from "../../constants";

export function FixedLimitDeposit(account, amount, address) {
  return new Promise((resolve, reject) => {
    return listDappUTXO({
      "program": GetContractArgs().depositProgram,
      "asset": GetContractArgs().assetBill
    }).then(resp => {
      if(!resp) {
        throw 'cannot load UTXO info.'
      }

      const billAmount = resp.amount
      const billAsset = resp.asset
      const utxo = resp.hash

      if(amount > billAmount){
        throw 'input amount must be smaller or equal to ' + billAmount +'.'
      }else{
        const input = []
        const output = []

        const args = contractArguments(amount, address)

        input.push(spendUTXOAction(utxo))
        input.push(spendWalletAction(amount, GetContractArgs().assetDeposited))

        if(amount < billAmount){
          output.push(controlProgramAction(amount, GetContractArgs().assetDeposited, GetContractArgs().profitProgram))
          output.push(controlAddressAction(amount, billAsset, address))
          output.push(controlProgramAction((billAmount-amount), billAsset, GetContractArgs().depositProgram))
        }else{
          output.push(controlProgramAction(amount, GetContractArgs().assetDeposited, GetContractArgs().profitProgram))
          output.push(controlAddressAction(billAmount, billAsset, address))
        }

        window.bytom.advancedTransfer(account, input, output, GetContractArgs().gas*10000000, args, 1)
          .then((resp) => {
            if(resp.action === 'reject'){
              reject('user reject the request')
            }else if(resp.action === 'success'){
              updateUtxo({"hash": utxo})
                .then(()=>{
                  updateBalances({
                    address,
                    "asset": GetContractArgs().assetDeposited,
                    "amount": -amount
                  }).then(()=>{
                    updateBalances({
                      address,
                      "asset": GetContractArgs().assetBill,
                      "amount": amount
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
