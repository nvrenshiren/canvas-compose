import { combineReducers, createStore } from 'redux'
import admin from './admin'
import carts from './carts'
import cats from './cats'
import list from './list'
import navs from './navs'
import product from './product'
import specs from './specs'
import themes from './themes'
import user from './user'

let reducer = combineReducers({
  user,
  list,
  admin,
  cats,
  specs,
  navs,
  product,
  carts,
  themes
})
let store = createStore(
  reducer,
  window['__REDUX_DEVTOOLS_EXTENSION__'] &&
    window['__REDUX_DEVTOOLS_EXTENSION__']()
)
export default store
