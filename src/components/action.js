const setBytom = (bytom) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_BYTOM",
      bytom
    })
  }
}

let actions = {
  setBytom,
}

export default actions
