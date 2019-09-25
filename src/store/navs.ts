import { AnyAction } from 'redux'
import { NavItem } from '@/interfaces/mode'

let navs = (state: NavItem[] = [], action: AnyAction): NavItem[] => {
  switch (action.type) {
    case 'SET_NAVS_INFO':
      return action.navs
    default:
      return state
  }
}

export default navs
