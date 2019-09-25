import { AnyAction } from 'redux'
import { ListItem } from '@/interfaces/mode'
let list = (state: ListItem = { items: [] }, action: AnyAction): ListItem => {
  switch (action.type) {
    case 'LIST_ADD':
      return {
        items:
          action.list.pageIndex > 1 && !action.list.pagination
            ? state.items.concat(
                action.list.items.map((item: any) => {
                  return Object.assign({}, item, {
                    selected: false,
                    isrename: false
                  })
                })
              )
            : action.list.items.map((item: any) => {
                return Object.assign({}, item, {
                  selected: false,
                  isrename: false
                })
              }),
        total: action.list.total || state.total,
        pageIndex: action.list.pageIndex || state.pageIndex,
        pageSize: action.list.pageSize || state.pageSize,
        index: -1,
        pagination: action.list.pagination || state.pagination
      }
    case 'LIST_TOGGLE_RNAME':
      return {
        items: state.items.map((item: any, index: number) => {
          return Object.assign({}, item, {
            isrename: state.index === index ? !item.isrename : false
          })
        }),
        total: state.total,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
        index: state.index,
        pagination: state.pagination
      }
    case 'LIST_TOGGLE_ITEM':
      return {
        items: state.items[action.list.index].selected
          ? state.items.map((item: any, index: number) => {
              return Object.assign({}, item, {
                selected: action.list.index === index ? !item.selected : item.selected,
                isrename: false
              })
            })
          : state.items.map((item: any, index: number) => {
              return Object.assign({}, item, {
                selected: action.list.index === index ? !item.selected : false,
                isrename: false
              })
            }),
        total: state.total,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
        index: action.list.index,
        pagination: state.pagination
      }
    case 'LIST_MULTI_ITEM':
      return {
        items: state.items.map((item: any, index: number) => {
          return Object.assign({}, item, {
            selected: action.list.index == index ? !item.selected : item.selected,
            isrename: false
          })
        }),
        total: state.total,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
        index: action.list.index,
        pagination: state.pagination
      }
    case 'LIST_SELECT_ITEM':
      return {
        items: state.items.map((item: any, index: number) => {
          return Object.assign({}, item, {
            selected: action.list.index == index ? true : false,
            isrename: false
          })
        }),
        total: state.total,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
        index: action.list.index,
        pagination: state.pagination
      }
    case 'LIST_SELECT_ALL':
      return {
        items: state.items.map((item: any) => {
          return Object.assign({}, item, {
            selected: true,
            isrename: false
          })
        }),
        total: state.total,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
        index: -1,
        pagination: state.pagination
      }
    case 'LIST_SELECT_NONE':
      return {
        items: state.items.map((item: any) => {
          return Object.assign({}, item, {
            selected: false,
            isrename: false
          })
        }),
        total: state.total,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
        index: -1,
        pagination: state.pagination
      }
    default:
      return state
  }
}
export default list
