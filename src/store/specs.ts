import { AnyAction } from 'redux'
import { SpecItem } from '@/interfaces/mode'

let specs = (state: SpecItem[] = [], action: AnyAction): SpecItem[] => {
  switch (action.type) {
    case 'SET_SPECS_INFO':
      return action.specs
    default:
      return state
  }
}

export default specs
