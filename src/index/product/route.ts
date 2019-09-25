import RouteAction from '@/common/route'
import Info from './product.info'
import List from './product.list'

RouteAction.addRoute({
  path: '/product/list/:catid/:flower',
  component: List,
  link: '/product/list/0/0',
  exact: true,
  entry: 'index',
  order: 10
})

RouteAction.addRoute({
  path: '/product/info/:pid/:flower',
  component: Info,
  link: '/product/info/0/0',
  exact: true,
  entry: 'index',
  order: 10
})
