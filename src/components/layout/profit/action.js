import { spendUTXOAction, spendWalletAction, controlProgramAction, controlAddressAction, listUTXO } from '../../bytom'
import { profitProgram, assetDeposited, assetBill } from "../../constants";

export function FixedLimitProfit(amountBill, saver) {

  listUTXO({
    "filter": {
      "script": profitProgram,
      "asset": assetDeposited
    }
  }).then(resp => {
    const capitalAmount = resp.amount
    const capitalAsset = resp.asset
    const utxo = resp.hash

    const gas = 40000000
    const btm = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

    const input = []
    const output = []

    const totalAmountBill = 10000000000
    const totalAmountCapital = 20000000000

    const sAmountBill = amountBill/100000000
    const sTotalAmountBill = totalAmountBill/100000000
    const gain = totalAmountCapital*sAmountBill/sTotalAmountBill

    const banker = "00140014f19df269f9334bdcb496da6b63b275d49447"

    input.push(spendUTXOAction(utxo, amountBill, saver))
    input.push(spendWalletAction(amountBill, assetBill))
    input.push(spendWalletAction(gas, btm))

    if(amountBill < capitalAmount){
      output.push(controlProgramAction(amountBill, assetBill, banker ))
      output.push(controlAddressAction(gain, capitalAsset, saver))
      output.push(controlProgramAction((capitalAmount - gain), capitalAsset, profitProgram))
    }else{
      output.push(controlProgramAction(amountBill, assetBill, banker ))
      output.push(controlAddressAction(capitalAmount, capitalAsset, saver))
    }

    window.bytom.advancedTransfer(input, output)

  })

}