import RouteAction from '@/common/route'
import List from './flower.list'

RouteAction.addRoute({
  path: '/flower/list/:tid',
  component: List,
  link: '/flower/list/0',
  exact: true,
  entry: 'index',
  order: 10
})

