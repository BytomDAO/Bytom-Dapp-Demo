import rotateReducer from "./reducers/rotateReducer"
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

function configureStore(state = { account: '' , depositAssetBalance:'',billAssetBalance:''}) {
  return createStore(
    rotateReducer,
    state,
    compose(
      applyMiddleware(
        thunkMiddleware,
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
export default configureStore