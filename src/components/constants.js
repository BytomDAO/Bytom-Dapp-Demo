import config from 'config';
import BigNumber from "bignumber.js/bignumber";

let depositProgram
let profitProgram
let assetDeposited
let assetBill
let totalAmountBill
let totalAmountCapital
let dueBlockHeight
let expireBlockHeight
let banker
let gas
let radio

const GetContractArgs = function() {
  if(window.bytom && window.bytom.default_account && window.bytom.net){
    let network = window.bytom.net

    const object = config[network]
    if(object){
      depositProgram = object.depositProgram
      profitProgram = object.profitProgram
      assetDeposited = object.assetDeposited
      assetBill = object.assetBill
      totalAmountBill = object.totalAmountBill
      totalAmountCapital = object.totalAmountCapital
      dueBlockHeight = object.dueBlockHeight
      expireBlockHeight = object.expireBlockHeight
      banker = object.banker
      gas = object.gas
      radio =BigNumber(object.totalAmountCapital).div(object.totalAmountBill).toNumber()
    }
  }

  return {
      depositProgram,
      profitProgram,
      assetDeposited,
      assetBill,
      totalAmountBill,
      totalAmountCapital,
      dueBlockHeight,
      expireBlockHeight,
      banker,
      gas,
      radio
    };
}

export default GetContractArgs;