import RouteAction from '@/common/route'

import back from './tools.back'
import optimize from './tools.optimize'
import logset from './tools.logset'
import logs from './tools.logs'
import pics from './tools.pics'
import recycle from './tools.recycle'

RouteAction.addRoute({
  path: '/index/tools/back',
  component: back,
  link: '/index/tools/back',
  modules: 'tools',
  group: 'data',
  gname: '数据管理',
  exact: true,
  menu: '数据备份',
  icon: 'inbox',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/tools/optimize',
  component: optimize,
  link: '/index/tools/optimize',
  modules: 'tools',
  group: 'data',
  gname: '数据管理',
  exact: true,
  menu: '数据优化',
  icon: 'rocket',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/tools/logset',
  component: logset,
  link: '/index/tools/logset',
  modules: 'tools',
  group: 'logs',
  gname: '日志管理',
  exact: true,
  menu: '日志设置',
  icon: 'hourglass',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/tools/logs',
  component: logs,
  link: '/index/tools/logs',
  modules: 'tools',
  group: 'logs',
  gname: '日志管理',
  exact: true,
  menu: '操作日志',
  icon: 'scan',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/tools/pics',
  component: pics,
  link: '/index/tools/pics',
  modules: 'tools',
  group: 'pics',
  gname: '图片空间',
  exact: true,
  menu: '图片空间',
  icon: 'picture',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/tools/recycle',
  component: recycle,
  link: '/index/tools/recycle',
  modules: 'tools',
  group: 'recycle',
  gname: '回收站',
  exact: true,
  menu: '回收站',
  icon: 'delete',
  entry: 'admin',
  order: 10
})
