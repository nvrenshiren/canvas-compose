import { AnyAction } from 'redux'
import { CartInfo } from '@/interfaces/mode'

let carts = (
  state: CartInfo = { cid: 0, id: 0, idtype: 1, total: 0 },
  action: AnyAction
): CartInfo => {
  switch (action.type) {
    case 'SET_INFO_CART':
      return {
        cid: action.carts.cid,
        id: action.carts.id,
        idtype: action.carts.idtype,
        total: action.carts.total
      }
    case 'SET_ADD_CART':
      return {
        cid: state.cid,
        id: state.id,
        idtype: state.idtype,
        total: state.total + 1
      }
    case 'SET_DEL_CART':
      return {
        cid: state.cid,
        id: state.id,
        idtype: state.idtype,
        total: state.total - 1
      }
    default:
      return state
  }
}

export default carts
