import RouteAction from '@/common/route'
import Home from './home'
import Page from './page'

RouteAction.addRoute({
  path: '/index',
  component: Home,
  link: '/index',
  modules: 'home',
  exact: true,
  menu: '首页',
  entry: 'index',
  order: 10
})

RouteAction.addRoute({
  path: '/page/:id',
  component: Page,
  link: '/page',
  exact: true,
  entry: 'index',
  order: 10
})
