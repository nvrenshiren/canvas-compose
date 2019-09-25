import RouteAction from '@/common/route'

import supplier from './supplier.list'

RouteAction.addRoute({
  path: '/index/supplier/list',
  component: supplier,
  link: '/index/supplier/list',
  modules: 'supplier',
  group: 'data',
  gname: '供应商',
  exact: true,
  menu: '供应商',
  icon: 'inbox',
  entry: 'admin',
  order: 10
})
