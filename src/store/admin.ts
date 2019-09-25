import { AnyAction } from 'redux'

let admin = (state: any = {}, action: AnyAction): any => {
  switch (action.type) {
    case 'SET_ADMIN_INFO':
      return action.admin
    default:
      return state
  }
}

export default admin
