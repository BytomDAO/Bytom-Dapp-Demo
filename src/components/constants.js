import config from '../../contracts/configure.json'

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

const GetContractArgs = function() {
  if(window.bytom && window.bytom.defaultAccount && window.bytom.defaultAccount.net){
    let network = window.bytom.defaultAccount.net

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
      gas
    };
}

export default GetContractArgs;