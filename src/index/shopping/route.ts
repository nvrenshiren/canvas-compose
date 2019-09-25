import RouteAction from '@/common/route'
import Cart from './cart.shop'
import Steps from './steps.shop'
import PaySuccess from './pay.success'

RouteAction.addRoute({
  path: '/shopping/cart',
  component: Cart,
  link: '/shopping/cart',
  exact: true,
  entry: 'index',
  order: 10
})

RouteAction.addRoute({
  path: '/shopping/steps',
  component: Steps,
  link: '/shopping/steps',
  exact: true,
  entry: 'index',
  order: 10
})