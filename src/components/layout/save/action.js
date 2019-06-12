import {
  spendUTXOAction, spendWalletAction, controlProgramAction,
  controlAddressAction, contractArguments
} from '../../util/bytomAction'
import { listDappUTXO, updateBalances
} from '../../util/api'
import GetContractArgs from '../../constants'
import { matchesUTXO } from '../../filter'
import { submitContract } from '../../util/submitContract'
import BigNumber from 'bignumber.js'

export function FixedLimitDeposit(amount, address) {
  const object = {
    address: address,
    amount: amount,
    parameter: [amount, address]
  }
  return submitContract(listDepositUTXO, createContractTransaction, updateDatatbaseBalance, object)
}

function listDepositUTXO() {
  return listDappUTXO({
    "program": GetContractArgs().depositProgram,
    "asset": GetContractArgs().assetBill,
    "sort": {
      "by":"amount",
      "order":"desc"
    }
  })
}

function createContractTransaction(resp, amount, address){
  return new Promise((resolve, reject) => {
    //utxo pre calculation
    const limit = GetContractArgs().radio * 100000000
    if (resp.length === 0) {
      reject( 'Empty UTXO info, it might be that the utxo is locked. Please retry after 60s.')
    } else if (amount < limit) {
      reject( `Please enter an amount bigger or equal than ${limit}.`)
    }

    const result = matchesUTXO(resp, amount)
    const billAmount = result.amount
    const billAsset = result.asset
    const utxo = result.hash

    //contract calculation
    if (amount > billAmount) {
      reject('input amount must be smaller or equal to ' + billAmount + '.')
    } else {
      const input = []
      const output = []

      const args = contractArguments(amount, address)

      input.push(spendUTXOAction(utxo))
      input.push(spendWalletAction(amount, GetContractArgs().assetDeposited))

      if (amount < billAmount) {
        output.push(controlProgramAction(amount, GetContractArgs().assetDeposited, GetContractArgs().profitProgram))
        output.push(controlAddressAction(amount, billAsset, address))
        output.push(controlProgramAction((BigNumber(billAmount).minus(BigNumber(amount))).toNumber(), billAsset, GetContractArgs().depositProgram))
      } else {
        output.push(controlProgramAction(amount, GetContractArgs().assetDeposited, GetContractArgs().profitProgram))
        output.push(controlAddressAction(billAmount, billAsset, address))
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

function updateDatatbaseBalance(resp, amount, address){
 return updateBalances({
    "tx_id": resp.transaction_hash,
    address,
    "asset": GetContractArgs().assetDeposited,
    "amount": -amount
  }).then(()=>{
    return updateBalances({
      "tx_id": resp.transaction_hash,
      address,
      "asset": GetContractArgs().assetBill,
      "amount": amount
    })
  }).catch(err => {
    throw err
  })
}
