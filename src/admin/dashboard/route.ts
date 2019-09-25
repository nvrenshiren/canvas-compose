import RouteAction from '@/common/route'
import DashBoard from './dashboard'

RouteAction.addRoute({
  path: '/index/dashboard',
  component: DashBoard,
  link: '/index/dashboard',
  modules: 'dashboard',
  exact: true,
  menu: '工作台',
  entry: 'admin',
  order: 10
})
