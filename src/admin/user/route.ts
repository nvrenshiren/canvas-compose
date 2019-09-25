import RouteAction from '@/common/route'
import UserList from './user.list'
import UserQueue from './user.queue'
import UserScribe from './user.scribe'
import UserSendbox from './user.sendbox'
import UserWorks from './user.works'

RouteAction.addRoute({
  path: '/index/user/list',
  component: UserList,
  link: '/index/user/list',
  modules: 'user',
  group: 'manger',
  gname: '会员管理',
  exact: true,
  menu: '会员列表',
  icon: 'idcard',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/user/works',
  component: UserWorks,
  link: '/index/user/works',
  modules: 'user',
  group: 'works',
  gname: '设计师作品管理',
  exact: true,
  menu: '作品列表',
  icon: 'picture',
  entry: 'admin',
  order: 10
})
RouteAction.addRoute({
  path: '/index/user/queue',
  component: UserQueue,
  link: '/index/user/queue',
  modules: 'user',
  group: 'message',
  gname: '消息',
  exact: true,
  menu: '邮件队列',
  icon: 'switcher',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/user/scribe',
  component: UserScribe,
  link: '/index/user/scribe',
  modules: 'user',
  group: 'scribe',
  gname: '订阅管理',
  exact: true,
  menu: '邮箱列表',
  icon: 'tags-o',
  entry: 'admin',
  order: 10
})
RouteAction.addRoute({
  path: '/index/user/sendbox',
  component: UserSendbox,
  link: '/index/user/sendbox',
  modules: 'user',
  group: 'message',
  gname: '消息',
  exact: true,
  menu: '群发邮件',
  icon: 'mail',
  entry: 'admin',
  order: 10
})
