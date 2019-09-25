module.exports = [
  {
    path: '/login',
    component: '../layout/login/login.tsx',
    entry: 'login',
    routes: [
      {
        path: '/login',
        redirect: '/login/index'
      },
      {
        path: '/login/index',
        component: '../admin/login/login.tsx',
        name: '管理后台',
        module: 'index'
      }
    ]
  },
  {
    path: '/admin/:module',
    component: '../layout/admin/admin.tsx',
    entry: 'admin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/dashboard'
      },
      {
        path: '/admin/dashboard',
        component: '../admin/dashboard/dashboard.tsx',
        name: '工作台',
        title: '工作台',
        module: 'dashboard',
        link: '/admin/dashboard'
      },
      {
        path: '/admin/product',
        name: '商品',
        title: '商品',
        module: 'product',
        link: '/admin/product/list',
        right: 1,
        routes: [
          {
            path: '/admin/product/list',
            component: '../admin/product/product.list.tsx',
            gname: '商品管理',
            group: 'manger',
            name: '商品列表',
            title: '商品列表',
            model: 'list',
            link: '/admin/product/list',
            icon: 'skin'
          },
          {
            path: '/admin/product/class',
            component: '../admin/product/product.class.tsx',
            gname: '商品分类',
            group: 'class',
            name: '分类列表',
            title: '分类列表',
            model: 'class',
            link: '/admin/product/class',
            icon: 'profile'
          },
          {
            path: '/admin/product/spec',
            component: '../admin/product/product.spec.tsx',
            gname: '商品规格',
            group: 'spec',
            name: '规格列表',
            title: '规格列表',
            model: 'spec',
            link: '/admin/product/spec',
            icon: 'calculator'
          },
          {
            path: '/admin/product/theme',
            component: '../admin/product/product.theme.tsx',
            gname: '花型库',
            group: 'desgin',
            name: '主题列表',
            title: '主题列表',
            model: 'theme',
            link: '/admin/product/theme',
            icon: 'rocket'
          },
          {
            path: '/admin/product/flower',
            component: '../admin/product/product.flower.tsx',
            gname: '花型库',
            group: 'desgin',
            name: '花型',
            title: '花型',
            model: 'flower',
            link: '/admin/product/flower',
            icon: 'gift'
          }
        ]
      },
      {
        path: '/admin/user',
        name: '会员',
        title: '会员',
        module: 'user',
        link: '/admin/user/list',
        right: 2,
        routes: [
          {
            path: '/admin/user/list',
            component: '../admin/user/user.list.tsx',
            gname: '会员管理',
            group: 'manger',
            name: '会员列表',
            title: '会员列表',
            model: 'list',
            link: '/admin/user/list',
            icon: 'idcard'
          },
          {
            path: '/admin/user/works',
            component: '../admin/user/user.works.tsx',
            gname: '设计师作品管理',
            group: 'works',
            name: '作品列表',
            title: '作品列表',
            model: 'works',
            link: '/admin/user/works',
            icon: 'picture'
          },
          {
            path: '/admin/user/queue',
            component: '../admin/user/user.queue.tsx',
            gname: '消息',
            group: 'message',
            name: '邮件队列',
            title: '邮件队列',
            model: 'queue',
            link: '/admin/user/queue',
            icon: 'switcher'
          },
          {
            path: '/admin/user/sendbox',
            component: '../admin/user/user.sendbox.tsx',
            gname: '消息',
            group: 'message',
            name: '群发邮件',
            title: '群发邮件',
            model: 'sendbox',
            link: '/admin/user/sendbox',
            icon: 'mail'
          },
          {
            path: '/admin/user/scribe',
            component: '../admin/user/user.scribe.tsx',
            gname: '订阅管理',
            group: 'scribe',
            name: '订阅列表',
            title: '订阅列表',
            model: 'scribe',
            link: '/admin/user/scribe',
            icon: 'tags-o'
          }
        ]
      },
      {
        path: '/admin/order',
        name: '订单',
        title: '订单',
        module: 'order',
        link: '/admin/order/list',
        right: 3,
        routes: [
          {
            path: '/admin/order/list',
            component: '../admin/order/order.list.tsx',
            gname: '订单管理',
            group: 'manger',
            name: '订单列表',
            title: '订单列表',
            model: 'list',
            link: '/admin/order/list',
            icon: 'bars'
          },
          {
            path: '/admin/order/way',
            component: '../admin/order/order.way.tsx',
            gname: '发货设置',
            group: 'way',
            name: '配送方式',
            title: '配送方式',
            model: 'way',
            link: '/admin/order/way',
            icon: 'compass'
          },
          {
            path: '/admin/order/paycode',
            component: '../admin/order/order.paycode.tsx',
            gname: '支付方式',
            group: 'pay',
            name: '优惠券',
            title: '优惠券',
            model: 'paycode',
            link: '/admin/order/paycode',
            icon: 'pay-circle-o'
          },
          {
            path: '/admin/order/set',
            component: '../admin/order/order.set.tsx',
            gname: '售后服务',
            group: 'aftersale',
            name: '功能设置',
            title: '功能设置',
            model: 'set',
            link: '/admin/order/set',
            icon: 'setting'
          },
          {
            path: '/admin/order/aftersale',
            component: '../admin/order/order.aftersale.tsx',
            gname: '售后服务',
            group: 'aftersale',
            name: '售后申请列表',
            title: '售后申请列表',
            model: 'list',
            link: '/admin/order/aftersale',
            icon: 'tags-o'
          },
          {
            path: '/admin/order/record',
            component: '../admin/order/order.record.tsx',
            gname: '订单管理',
            group: 'manger',
            name: '设计师提现',
            title: '设计师提现',
            model: 'record',
            link: '/admin/order/record',
            icon: 'red-envelope'
          }
        ]
      },
      {
        path: '/admin/content',
        name: '内容',
        title: '内容',
        module: 'content',
        link: '/admin/content/nav',
        right: 4,
        routes: [
          {
            path: '/admin/content/nav',
            component: '../admin/content/content.nav.tsx',
            gname: '导航',
            group: 'navmanger',
            name: '导航管理',
            title: '导航管理',
            model: 'navlist',
            link: '/admin/content/nav',
            icon: 'environment-o'
          },
          {
            path: '/admin/content/comment',
            component: '../admin/content/content.comment.tsx',
            gname: '网站管理',
            group: 'sitemanger',
            name: '评论管理',
            title: '评论管理',
            model: 'comment',
            link: '/admin/content/comment',
            icon: 'bars'
          },
          {
            path: '/admin/content/flink',
            component: '../admin/content/content.flink.tsx',
            gname: '网站管理',
            group: 'sitemanger',
            name: '图片广告',
            title: '图片广告',
            model: 'flink',
            link: '/admin/content/flink',
            icon: 'api'
          },
          {
            path: '/admin/content/about',
            component: '../admin/content/content.about.tsx',
            gname: '网站管理',
            group: 'sitemanger',
            name: '关于我们',
            title: '关于我们',
            model: 'about',
            link: '/admin/content/about',
            icon: 'team'
          },
          {
            path: '/admin/content/page',
            component: '../admin/content/content.page.tsx',
            gname: '单页管理',
            group: 'pagemanger',
            name: '单页类别',
            title: '单页类别',
            model: 'pagetype',
            link: '/admin/content/page',
            icon: 'appstore-o'
          },
          {
            path: '/admin/content/list',
            component: '../admin/content/content.list.tsx',
            gname: '单页管理',
            group: 'pagemanger',
            name: '单页文章',
            title: '单页文章',
            model: 'pagelist',
            link: '/admin/content/list',
            icon: 'bars'
          }
        ]
      },
      {
        path: '/admin/statistics',
        name: '统计',
        title: '统计',
        module: 'statistics',
        link: '/admin/statistics/product',
        right: 5,
        routes: [
          {
            path: '/admin/statistics/product',
            component: '../admin/statistics/statistics.product.tsx',
            gname: '销售统计',
            group: 'statistics',
            name: '商品访问记录',
            title: '商品访问记录',
            model: 'product',
            link: '/admin/statistics/product',
            icon: 'pie-chart'
          },
          {
            path: '/admin/statistics/sale',
            component: '../admin/statistics/statistics.sale.tsx',
            gname: '销售统计',
            group: 'statistics',
            name: '销售记录',
            title: '销售记录',
            model: 'sale',
            link: '/admin/statistics/sale',
            icon: 'area-chart',
            ishidden: true
          }
        ]
      },
      {
        path: '/admin/settings',
        name: '设置',
        title: '设置',
        module: 'settings',
        link: '/admin/settings/base',
        right: 6,
        routes: [
          {
            path: '/admin/settings/base',
            component: '../admin/settings/setting.base.tsx',
            gname: '我的商城',
            group: 'mall',
            name: '基本设置',
            title: '基本设置',
            model: 'base',
            link: '/admin/settings/base',
            icon: 'setting'
          },
          {
            path: '/admin/settings/status',
            component: '../admin/settings/setting.status.tsx',
            gname: '我的商城',
            group: 'mall',
            name: '营业状态',
            title: '营业状态',
            model: 'status',
            link: '/admin/settings/status',
            icon: 'coffee'
          },
          {
            path: '/admin/settings/msg',
            component: '../admin/settings/setting.msg.tsx',
            gname: '消息',
            group: 'message',
            name: '邮箱帐号',
            title: '邮箱帐号',
            model: 'email',
            link: '/admin/settings/msg',
            icon: 'notification'
          },
          {
            path: '/admin/settings/tplset',
            component: '../admin/settings/setting.tplset.tsx',
            gname: '消息',
            group: 'message',
            name: '邮箱模版',
            title: '邮箱模版',
            model: 'tplset',
            link: '/admin/settings/tplset',
            icon: 'layout'
          },
          {
            path: '/admin/settings/district',
            component: '../admin/settings/setting.district.tsx',
            gname: '地区管理',
            group: 'districtmanger',
            name: '地区列表',
            title: '地区列表',
            model: 'district',
            link: '/admin/settings/district',
            icon: 'pushpin-o'
          },
          {
            path: '/admin/settings/admin',
            component: '../admin/settings/setting.admin.tsx',
            gname: '管理员',
            group: 'adminmanger',
            name: '管理员列表',
            title: '管理员列表',
            model: 'adminlist',
            link: '/admin/settings/admin',
            icon: 'team'
          },
          {
            path: '/admin/settings/role',
            component: '../admin/settings/setting.role.tsx',
            gname: '管理员',
            group: 'adminmanger',
            name: '角色',
            title: '角色',
            model: 'role',
            link: '/admin/settings/role',
            icon: 'meh-o'
          }
        ]
      },
      {
        path: '/admin/tools',
        name: '工具',
        title: '工具',
        module: 'tools',
        link: '/admin/tools/back',
        right: 7,
        routes: [
          {
            path: '/admin/tools/back',
            component: '../admin/tools/tools.back.tsx',
            gname: '数据管理',
            group: 'datamanger',
            name: '数据备份',
            title: '数据备份',
            model: 'back',
            link: '/admin/tools/back',
            icon: 'inbox'
          },
          {
            path: '/admin/tools/optimize',
            component: '../admin/tools/tools.optimize.tsx',
            gname: '数据管理',
            group: 'datamanger',
            name: '数据优化',
            title: '数据优化',
            model: 'optimize',
            link: '/admin/tools/optimize',
            icon: 'rocket'
          },
          {
            path: '/admin/tools/logset',
            component: '../admin/tools/tools.logset.tsx',
            gname: '日志管理',
            group: 'logmanger',
            name: '日志设置',
            title: '日志设置',
            model: 'logset',
            link: '/admin/tools/logset',
            icon: 'hourglass'
          },
          {
            path: '/admin/tools/logs',
            component: '../admin/tools/tools.logs.tsx',
            gname: '日志管理',
            group: 'logmanger',
            name: '操作日志',
            title: '操作日志',
            model: 'logs',
            link: '/admin/tools/logs',
            icon: 'scan'
          },
          {
            path: '/admin/tools/pics',
            component: '../admin/tools/tools.pics.tsx',
            gname: '图片空间',
            group: 'picsmanger',
            name: '素材列表',
            title: '素材列表',
            model: 'pics',
            link: '/admin/tools/pics',
            icon: 'picture'
          },
          {
            path: '/admin/tools/recycle',
            component: '../admin/tools/tools.recycle.tsx',
            gname: '回收站',
            group: 'recycle',
            name: '回收站管理',
            title: '回收站管理',
            model: 'recycle',
            link: '/admin/tools/recycle',
            icon: 'delete'
          }
        ]
      },
      {
        path: '/admin/supplier',
        name: '供应商',
        title: '供应商',
        module: 'supplier',
        link: '/admin/supplier/list',
        right: 8,
        routes: [
          {
            path: '/admin/supplier/list',
            component: '../admin/supplier/supplier.list.tsx',
            gname: '供应商订单',
            group: 'supplier',
            name: '订单列表',
            title: '订单列表',
            model: 'list',
            link: '/admin/supplier/list',
            icon: 'inbox'
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: '../layout/index/index.tsx',
    entry: 'index',
    routes: [
      {
        path: '/',
        redirect: '/index'
      },
      {
        path: '/index',
        component: '../index/home/home.tsx',
        name: 'index',
        module: 'index',
        link: '/index'
      },
      {
        path: '/page/:id',
        component: '../index/home/page.tsx',
        name: '单页',
        module: 'page'
      },
      {
        path: '/product',
        name: '产品模块',
        module: 'product',
        routes: [
          {
            path: '/product',
            redirect: '/product/list/7/0'
          },
          {
            path: '/product/list/:catid/:flower',
            component: '../index/product/product.list.tsx',
            name: '产品列表页面',
            link: '/product/list/7/0'
          },
          {
            path: '/product/info/:pid/:flower',
            component: '../index/product/product.info.tsx',
            name: '产品展示页面',
            link: '/product/info/0/0'
          }
        ]
      },
      {
        path: '/shopping',
        name: '购物模块',
        module: 'shopping',
        routes: [
          {
            path: '/shopping',
            redirect: '/shopping/cart'
          },
          {
            path: '/shopping/cart',
            component: '../index/shopping/cart.shop.tsx',
            name: '购物车列表',
            link: '/shopping/cart'
          },
          {
            path: '/shopping/steps',
            component: '../index/shopping/steps.shop.tsx',
            name: '购物车结算',
            link: '/shopping/steps'
          },
          {
            path: '/shopping/success',
            component: '../index/shopping/pay.success.tsx',
            name: '支付成功',
            link: '/shopping/success'
          },
          {
            path: '/shopping/fail',
            component: '../index/shopping/pay.fail.tsx',
            name: '支付失败',
            link: '/shopping/fail'
          }
        ]
      },
      {
        path: '/user/:model',
        component: '../index/user/user.index.tsx',
        name: '用户模块',
        module: 'user',
        routes: [
          {
            path: '/user',
            redirect: '/user/home'
          },
          {
            path: '/user/home',
            component: '../index/user/user.home.tsx',
            name: '用户首页',
            title: 'Home',
            model: 'home',
            link: '/user/home'
          },
          {
            path: '/user/order',
            component: '../index/user/user.order.tsx',
            name: '用户订单列表',
            title: 'My Order',
            model: 'order',
            link: '/user/order'
          },
          {
            path: '/user/collect',
            component: '../index/user/user.collect.tsx',
            name: '用户收藏列表',
            title: 'My Collect',
            model: 'collect',
            link: '/user/collect'
          },
          {
            path: '/user/info',
            component: '../index/user/user.info.tsx',
            name: '用户信息列表',
            title: 'Infomation',
            model: 'info',
            link: '/user/info'
          },
          {
            path: '/user/address',
            component: '../index/user/user.address.tsx',
            name: '用户地址',
            title: 'Address',
            model: 'address',
            link: '/user/address'
          },
          {
            path: '/user/product',
            component: '../index/user/user.product.tsx',
            name: '用户设计产品',
            title: 'My Product',
            model: 'product',
            link: '/user/product'
          },
          {
            path: '/user/money',
            component: '../index/user/user.money.tsx',
            name: '用户金额',
            title: 'My Money',
            model: 'money',
            link: '/user/money'
          },
          {
            path: '/user/refund',
            component: '../index/user/user.refund.tsx',
            name: '用户售后列表',
            title: 'Refunding',
            model: 'refund',
            link: '/user/refund'
          },
          {
            path: '/user/paylink/:oid',
            component: '../index/user/user.paylink.tsx',
            name: '支付地址',
            title: 'Paylinking',
            model: 'paylink'
          }
        ]
      },
      {
        path: '/flower/list/:tid',
        component: '../index/flower/flower.list.tsx',
        name: '花纹列表',
        module: 'flower',
        link: '/flower/list/0'
      },
      {
        path: '/desgin',
        name: '设计师模块',
        module: 'desgin',
        routes: [
          {
            path: '/desgin',
            component: '../index/desgin/desgin.list.tsx',
            name: '设计师列表',
            model: 'list'
          },
          {
            path: '/desgin/product/:did',
            component: '../index/desgin/desgin.product.tsx',
            name: '设计师作品列表',
            model: 'product'
          },
          {
            path: '/desgin/product/info/:did/:dgid',
            component: '../index/desgin/desgin.product.info.tsx',
            name: '设计师作品详情',
            model: 'info'
          }
        ]
      }
    ]
  }
]
