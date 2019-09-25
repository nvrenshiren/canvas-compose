import RouteAction from '@/common/route'
import Home from './user.home'
import Product from './user.product'
import Info from './user.info'
import Collect from './user.collect'
import Address from './user.address'
import Order from './user.order'
import Money from './user.money'
import Refund from './user.refund'
import RefundItem from './user.refund.item'
import Index from './user.index'
import PayLink from './user.paylink'






RouteAction.addRoute({
  path: '/user/:model',
  component: Index,
  link: '/user',
  exact: true,
  entry: 'index',
  order: 10,
  menu: 'Index'
})



RouteAction.addRoute({
  path: '/user/paylink/:oid',
  component: PayLink,
  link: '/user/paylink/0',
  exact: true,
  entry: 'index',
  order: 10,
  menu: 'Index'
})


RouteAction.addRoute({
  path: '/user/home',
  component: Home,
  link: '/user/home',
  exact: true,
  model: 'home',
  entry: 'user',
  order: 1,
  menu: 'Home'
})

RouteAction.addRoute({
  path: '/user/order',
  component: Order,
  link: '/user/order',
  model: 'order',
  exact: true,
  entry: 'user',
  order: 2,
  menu: 'My Order'
})

RouteAction.addRoute({
  path: '/user/collect',
  component: Collect,
  link: '/user/collect',
  model: 'collect',
  exact: true,
  entry: 'user',
  order: 3,
  menu: 'Collect'
})

RouteAction.addRoute({
  path: '/user/info',
  component: Info,
  link: '/user/info',
  model: 'info',
  exact: true,
  entry: 'user',
  order: 4,
  menu: 'Infomation'
})

RouteAction.addRoute({
  path: '/user/address',
  component: Address,
  link: '/user/address',
  model: 'address',
  exact: true,
  entry: 'user',
  order: 5,
  menu: 'Address'
})

RouteAction.addRoute({
  path: '/user/product',
  component: Product,
  link: '/user/product',
  model: 'product',
  exact: true,
  entry: 'user',
  order: 6,
  menu: 'My Product'
})

RouteAction.addRoute({
  path: '/user/money',
  component: Money,
  link: '/user/money',
  model: 'money',
  exact: true,
  entry: 'user',
  order: 7,
  menu: 'My Money'
})

RouteAction.addRoute({
  path: '/user/refund',
  component: Refund,
  link: '/user/refund',
  model: 'refund',
  exact: true,
  entry: 'user',
  order: 8,
  menu: 'Refunding'
})

RouteAction.addRoute({
  path: '/user/refunditem/:id',
  component: RefundItem,
  link: '/user/refunditem',
  exact: true,
  entry: 'index',
  order: 10
})
