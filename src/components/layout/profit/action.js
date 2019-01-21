import { spendUTXOAction, spendWalletAction, controlProgramAction, controlAddressAction, listUTXO } from '../../bytom'

export function FixedLimitProfit(amountBill, saver) {

  const program = "203f98494c8fcce82a1da8054cda521295333a6c7a6ea3b861a27fd766a5cea5731600140014f19df269f9334bdcb496da6b63b275d49447016401500500c817a8040500e40b540220df4638860378a2203466833c935efa19f513ac3aae2cb52d36cee7fa5010b0794ca4587a64980000005479cd9f6959790400e1f5059653790400e1f505967800a07800a09a5c7956799f9a6955797b957c967600a069c3787c9f91616481000000005b795479515b79c1695178c2515d79c16952c3527994c251005d79895c79895b79895a79895979895879895779895679890274787e008901c07ec1696393000000005b795479515b79c16951c3c2515d79c16963a4000000557acd9f69577a577aae7cac747800c0"

  listUTXO({
    "filter": {
      "script": program,
      "asset":"bbc81814b304cf4e129582b094672b917d28e1109aab4569697d72f102af07c8"
    }
  }).then(resp => {
    const capitalAmount = resp.amount
    const capitalAsset = resp.asset
    const utxo = resp.hash

    const gas = 40000000
    const assetBill = "df4638860378a2203466833c935efa19f513ac3aae2cb52d36cee7fa5010b079"
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
      output.push(controlProgramAction((capitalAmount - gain), capitalAsset, program))
    }else{
      output.push(controlProgramAction(amountBill, assetBill, banker ))
      output.push(controlAddressAction(capitalAmount, capitalAsset, saver))
    }

    window.bytom.advancedTransfer(input, output)

  })

}