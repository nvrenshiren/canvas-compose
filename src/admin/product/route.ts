import RouteAction from '@/common/route'
import ProductList from './product.list'
import ProductClass from './product.class'
import ProductSpec from './product.spec'
import ProductTheme from './product.theme'
import ProductFlower from './product.flower'

RouteAction.addRoute({
  path: '/index/product/list',
  component: ProductList,
  link: '/index/product/list',
  modules: 'product',
  group: 'manger',
  gname: '商品管理',
  exact: true,
  menu: '商品列表',
  icon: 'skin',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/product/class',
  component: ProductClass,
  link: '/index/product/class',
  modules: 'product',
  group: 'class',
  gname: '商品分类',
  exact: true,
  menu: '分类列表',
  icon: 'profile',
  entry: 'admin',
  order: 10
})

RouteAction.addRoute({
  path: '/index/product/spec',
  component: ProductSpec,
  link: '/index/product/spec',
  modules: 'product',
  group: 'spec',
  gname: '商品规格',
  exact: true,
  menu: '规格列表',
  icon: 'calculator',
  entry: 'admin',
  order: 10
})
RouteAction.addRoute({
  path: '/index/product/theme',
  component: ProductTheme,
  link: '/index/product/theme',
  modules: 'product',
  group: 'theme',
  gname: '花型库',
  exact: true,
  menu: '主题列表',
  icon: 'rocket',
  entry: 'admin',
  order: 10
})
RouteAction.addRoute({
  path: '/index/product/flower',
  component: ProductFlower,
  link: '/index/product/flower',
  modules: 'product',
  group: 'theme',
  gname: '花型库',
  exact: true,
  menu: '花型',
  icon: 'gift',
  entry: 'admin',
  order: 10
})
