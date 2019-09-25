import { AnyAction } from 'redux'
import { UserInfo } from '@/interfaces/mode'

let user = (state: UserInfo = { uid: 0 }, action: AnyAction): UserInfo => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return action.user
    default:
      return state
  }
}

export default user
