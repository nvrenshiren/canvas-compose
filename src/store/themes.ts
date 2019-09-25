import { AnyAction } from 'redux'
import { ThemeItem } from '@/interfaces/mode'

let themes = (state: ThemeItem[] = [], action: AnyAction): ThemeItem[] => {
  switch (action.type) {
    case 'SET_THEMES_INFO':
      return action.themes
    default:
      return state
  }
}

export default themes
