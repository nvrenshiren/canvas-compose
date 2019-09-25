import RouteAction from '@/common/route'

import Sale from './statistics.sale'
import Product from './statistics.product'

/*
RouteAction.addRoute({
  path: '/index/statistics/sale',
  component: Sale,
  link: '/index/statistics/sale',
  modules: 'statistics',
  group: 'sale',
  gname: '销售统计',
  exact: true,
  menu: '销售记录',
  icon: 'area-chart',
  entry: 'admin',
  order: 10
})
*/
RouteAction.addRoute({
  path: '/index/statistics/product',
  component: Product,
  link: '/index/statistics/product',
  modules: 'statistics',
  group: 'sale',
  gname: '销售统计',
  exact: true,
  menu: '商品访问记录',
  icon: 'pie-chart',
  entry: 'admin',
  order: 10
})

