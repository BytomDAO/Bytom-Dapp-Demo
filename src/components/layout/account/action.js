import { listAddress } from '../../util/api'


import GetContractArgs from "../../constants";

const updateBalances = (guid = '') => {
  return (dispatch) => {
    return listAddress(guid)
      .then((resp)=>{
        const balances = resp.balances
        const billBalance = balances.filter(balance => balance.asset === GetContractArgs().assetBill)
        const depositBalance = balances.filter(balance => balance.asset === GetContractArgs().assetDeposited)
        if(billBalance.length === 1){
          dispatch({
            type: "UPDATE_BILL_ASSET_BALANCES",
            billAssetBalance: billBalance[0].balance
          })
        }
        if(depositBalance.length === 1){
          dispatch({
            type: "UPDATE_DEPOSIT_ASSET_BALANCES",
            depositAssetBalance: depositBalance[0].balance
          })
        }
      })
      .catch((err) => {
        throw err
      })
  }
}

let actions = {
  updateBalances,
}

export default actions
