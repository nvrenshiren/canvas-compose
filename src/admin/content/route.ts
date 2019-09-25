import RouteAction from '@/common/route'

import ContentNav from './content.nav'
import ContentFlink from './content.flink'
import ContentAbout from './content.about'
import ContentPage from './content.page'
import ContentList from './content.list'
import ContentComment from './content.comment'


RouteAction.addRoute({
  path: '/index/content/nav',
  component: ContentNav,
  link: '/index/content/nav',
  modules: 'content',
  group: 'nav',
  gname: '导航管理',
  exact: true,
  menu: '导航管理',
  icon: 'environment-o',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/content/comment',
  component: ContentComment,
  link: '/index/content/comment',
  modules: 'content',
  group: 'link',
  gname: '网站管理',
  exact: true,
  menu: '评论管理',
  icon: 'bars',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/content/flink',
  component: ContentFlink,
  link: '/index/content/flink',
  modules: 'content',
  group: 'link',
  gname: '网站管理',
  exact: true,
  menu: '图片广告',
  icon: 'api',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/content/about',
  component: ContentAbout,
  link: '/index/content/about',
  modules: 'content',
  group: 'link',
  gname: '网站管理',
  exact: true,
  menu: '关于我们',
  icon: 'team',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/content/page',
  component: ContentPage,
  link: '/index/content/page',
  modules: 'content',
  group: 'page',
  gname: '单页管理',
  exact: true,
  menu: '单页类别',
  icon: 'appstore-o',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/content/list',
  component: ContentList,
  link: '/index/content/list',
  modules: 'content',
  group: 'page',
  gname: '单页管理',
  exact: true,
  menu: '单页文章',
  icon: 'bars',
  entry: 'admin',
  order: 10
})

