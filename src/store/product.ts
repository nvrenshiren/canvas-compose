import { AnyAction } from 'redux'
import { Place } from '@/interfaces/mode'

interface ComposeStore {
  global?: boolean
  place?: string
  compose?: {
    left?: Place
    right?: Place
    back?: Place
    front?: Place
  }
  action?: string
  index?: number
}

let defaultValue = {
  global: false,
  place: '',
  action: '',
  index: 0
}

let product = (
  state: ComposeStore = defaultValue,
  action: AnyAction
): ComposeStore => {
  switch (action.type) {
    case 'SET_COMPOSE_INIT':
      return {
        global: action.product.global,

        place: action.product.place,
        compose: action.product.compose,
        action: state.action,
        index: state.index
      }
    case 'SET_COMPOSE_PLACE':
      return {
        global: state.global,
        place: action.product.place,
        compose: action.product.compose,
        action: action.product.action,
        index: action.product.index
      }
    case 'SET_COMPOSE_REPEAT':
      return {
        global: state.global,

        place: state.place,
        compose: state.compose,
        action: action.product.action,
        index: state.index
      }
    case 'SET_COMPOSE_GLOBAL':
      return {
        global: action.product.global,

        place: state.place,
        compose: state.compose,
        action: action.product.action,
        index: state.index
      }
    case 'SET_COMPOSE_COLOR':
      return {
        global: state.global,
        place: state.place,
        compose: action.product.compose,
        action: action.product.action,
        index: state.index
      }
    case 'SET_COMPOSE_OK':
      return {
        global: state.global,
        place: state.place,
        compose: action.product.compose || state.compose,
        action: '',
        index: state.index
      }
    default:
      return state
  }
}

export default product
