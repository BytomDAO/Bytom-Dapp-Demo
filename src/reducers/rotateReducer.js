export default (state, action) => {
  switch (action.type) {
    case "UPDATE_BILL_ASSET_BALANCES":
      return {
        ...state,
        billAssetBalance: action.billAssetBalance
      };
    case "UPDATE_DEPOSIT_ASSET_BALANCES":
      return {
        ...state,
        depositAssetBalance: action.depositAssetBalance
      };
    case "UPDATE_BYTOM":
      return {
        ...state,
        bytom: action.bytom
      };
    default:
      return state
  }
}