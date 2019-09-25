import RouteAction from '@/common/route'

import admin from './setting.admin'
import base from './setting.base'
import district from './setting.district'
import msg from './setting.msg'
import role from './setting.role'
import status from './setting.status'
import tplset from './setting.tplset'

RouteAction.addRoute({
  path: '/index/settings/base',
  component: base,
  link: '/index/settings/base',
  modules: 'settings',
  group: 'base',
  gname: '我的商城',
  exact: true,
  menu: '基本设置',
  icon: 'setting',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/settings/status',
  component: status,
  link: '/index/settings/status',
  modules: 'settings',
  group: 'base',
  gname: '我的商城',
  exact: true,
  menu: '营业状态',
  icon: 'coffee',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/settings/msg',
  component: msg,
  link: '/index/settings/msg',
  modules: 'settings',
  group: 'msg',
  gname: '消息设置',
  exact: true,
  menu: '消息设置',
  icon: 'notification',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/settings/tplset',
  component: tplset,
  link: '/index/settings/tplset',
  modules: 'settings',
  group: 'msg',
  gname: '消息设置',
  exact: true,
  menu: '模版设置',
  icon: 'layout',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/settings/district',
  component: district,
  link: '/index/settings/district',
  modules: 'settings',
  group: 'district',
  gname: '地区设置',
  exact: true,
  menu: '地区设置',
  icon: 'pushpin-o',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/settings/admin',
  component: admin,
  link: '/index/settings/admin',
  modules: 'settings',
  group: 'admin',
  gname: '管理员',
  exact: true,
  menu: '管理员',
  icon: 'team',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/settings/role',
  component: role,
  link: '/index/settings/role',
  modules: 'settings',
  group: 'admin',
  gname: '管理员',
  exact: true,
  menu: '角色',
  icon: 'meh-o',
  entry: 'admin',
  order: 10
})
