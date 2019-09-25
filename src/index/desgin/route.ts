import RouteAction from '@/common/route'
import List from './desgin.list'
import Prouct from './desgin.product'
import ProuctInfo from './desgin.product.info'

RouteAction.addRoute({
  path: '/desgin/product/info/:did/:dgid',
  component: ProuctInfo,
  link: '/desgin/prouct/info/0/0',
  exact: true,
  entry: 'index',
  order: 10
})


RouteAction.addRoute({
  path: '/desgin',
  component: List,
  link: '/desgin',
  exact: true,
  entry: 'index',
  order: 10
})

RouteAction.addRoute({
  path: '/desgin/product/:did',
  component: Prouct,
  link: '/desgin/prouct/0',
  exact: true,
  entry: 'index',
  order: 10
})