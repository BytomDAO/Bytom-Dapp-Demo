import { spendUTXOAction, spendWalletAction, controlProgramAction, controlAddressAction, listUTXO } from '../../bytom'
import { depositProgram, profitProgram, assetDeposited, assetBill } from "../../constants";

export function FixedLimitDeposit(amount, address) {
  //
  // listUTXO({
  //   "filter": {
  //     "script": depositProgram,
  //     "asset": assetBill
  //   }
  // }).then(resp => {
  listUTXO({
    "filter": {
      "script":"2022e829107201c6b975b1dc60b928117916285ceb4aa5c6d7b4b8cc48038083e074037caa8700c0",
      "asset":"df4638860378a2203466833c935efa19f513ac3aae2cb52d36cee7fa5010b079"
    }
  }).then(resp => {
    const billAmount = resp.amount
    const billAsset = resp.asset
    const utxo = resp.hash


    const gas = 40000000
    const btm = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

    const input = []
    const output = []

    input.push(spendUTXOAction(utxo, amount, address))
    input.push(spendWalletAction(amount, assetDeposited))
    input.push(spendWalletAction(gas, btm))

    if(amount < billAmount){
      output.push(controlProgramAction(amount, assetDeposited, profitProgram))
      output.push(controlAddressAction(amount, billAsset, address))
      output.push(controlProgramAction((billAmount-amount), billAsset, depositProgram))
    }else{
      output.push(controlProgramAction(amount, assetDeposited, profitProgram))
      output.push(controlAddressAction(billAmount, billAsset, address))
    }

    window.bytom.advancedTransfer(input, output)
  })
}