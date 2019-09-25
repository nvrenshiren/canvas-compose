import * as React from 'react'
import RouteAction from '@/common/route'
import OrderList from './order.list'
import OrderItem from './order.item'
import OrderRecord from './order.record'
import OrderWay from './order.way'
import OrderPayment from './order.payment'
import OrderPaycode from './order.paycode'
import OrderSet from './order.set'
import OrderAftersale from './order.aftersale'
import rightService from '@/services/right'
import * as _ from 'underscore'
import store from '@/store/store'
/*
store.subscribe(() => {
  let adminInfo = store.getState().admin
  if (adminInfo.info.issuper === true) {
    
  }
})
*/

RouteAction.addRoute({
  path: '/index/order/list',
  component: OrderList,
  link: '/index/order/list',
  modules: 'order',
  group: 'manger',
  gname: '订单管理',
  exact: true,
  menu: '订单列表',
  icon: 'bars',
  entry: 'admin',
  role: 8,
  order: 10
})

RouteAction.addRoute({
  path: '/index/order/way',
  component: OrderWay,
  link: '/index/order/way',
  modules: 'order',
  group: 'way',
  gname: '发货设置',
  exact: true,
  menu: '配送方式',
  icon: 'compass',
  entry: 'admin',
  order: 10
})
RouteAction.addRoute({
  path: '/index/order/paycode',
  component: OrderPaycode,
  link: '/index/order/paycode',
  modules: 'order',
  group: 'pay',
  gname: '支付方式',
  exact: true,
  menu: '优惠券',
  icon: 'pay-circle-o',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/order/set',
  component: OrderSet,
  link: '/index/order/set',
  modules: 'order',
  group: 'aftersale',
  gname: '售后服务',
  exact: true,
  menu: '功能设置',
  icon: 'setting',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/order/aftersale',
  component: OrderAftersale,
  link: '/index/order/aftersale',
  modules: 'order',
  group: 'aftersale',
  gname: '售后服务',
  exact: true,
  menu: '售后申请列表',
  icon: 'customer-service',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/order/record',
  component: OrderRecord,
  link: '/index/order/record',
  modules: 'order',
  group: 'manger',
  gname: '订单管理',
  exact: true,
  menu: '设计师提现',
  icon: 'red-envelope',
  entry: 'admin',
  order: 10
})
