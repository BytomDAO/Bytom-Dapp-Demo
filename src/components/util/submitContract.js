import GetContractArgs from "../constants";
import { updateUtxo } from './api'

export function submitContract(listDepositUTXO, createContractTransaction, updateDatatbaseBalance, object) {
  const address = object.address
  const amount = object.amount
  const updateParameters = object.parameter

  return new Promise((resolve, reject) => {
    //list available utxo
    return listDepositUTXO().then(resp => {

      //create the Contract Transaction
      return createContractTransaction(resp, amount, address).then(object =>{
        const input = object.input
        const output = object.output
        const args = object.args

        const utxo = object.utxo

        //Lock UTXO
        return updateUtxo({"hash": utxo})
          .then(()=>{

            //Transactions
            return window.bytom.send_advanced_transaction({input, output, gas: GetContractArgs().gas*100000000, args})
              .then((resp) => {
                  //Update Balance
                  return updateDatatbaseBalance(resp, ...updateParameters).then(()=>{
                    resolve()
                  }).catch(err => {
                    throw err
                  })
              })
              .catch(err => {
                throw err.message
              })
          })
          .catch(err => {
            throw err
          })
      }).catch(err => {
        throw err
      })
    }).catch(err => {
      reject(err)
    })
  })
}
