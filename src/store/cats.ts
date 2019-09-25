import { AnyAction } from 'redux'
import { CatItem } from '@/interfaces/mode'

let cats = (state: CatItem[] = [], action: AnyAction): CatItem[] => {
  switch (action.type) {
    case 'SET_CATS_INFO':
      return action.cats
    default:
      return state
  }
}

export default cats
