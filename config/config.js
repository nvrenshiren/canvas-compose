import Routes from '../src/pages/routers'
import Plugins from '../src/plugins'
import Webpack from './webpack'
import Themes from './themes'
export default {
  // 插件配置
  plugins: Plugins,
  // 路由配置
  routes: Routes,
  // 禁用 redirect 上提。
  disableRedirectHoist: false,
  // 如需切换 history 方式为 hash（默认是 browser history），配置 history: 'hash'。
  history: 'hash',
  // 指定输出路径
  outputPath: './default',
  // 指定 react-router 的 base，部署到非根目录时需要配置
  base: '/',
  // 指定 webpack 的 publicPath，指向静态资源文件所在的路径。
  publicPath: '/',
  // 值为 true 时使用 HTML 里指定的 window.publicPath
  runtimePublicPath: false,
  // 指定 react app 渲染到的 HTML 元素 id。
  mountElementId: 'app',
  // 是否开启 hash 文件后缀。
  hash: false,
  // 配置浏览器最低版本，会自动引入 polyfill 和做语法转换，配置的 targets 会和合并到默认值，所以不需要重复配置。
  targets: {
    ie: 10
  },
  // 配置全局 context，会覆盖到每个 pages 里的 context。
  context: {},
  // 如果设为 true 或 Object，则导出全部路由为静态页面，否则默认只输出一个 index.html。
  exportStatic: false,
  // 如果设为 true，启用单数模式的目录。
  singular: false,
  /**webpack
   * webpack相关配置
   */
  // 通过 webpack-chain 的 API 扩展或修改 webpack 配置
  chainWebpack: Webpack,
  // 配置主题，实际上是配 less 变量。支持对象和字符串两种类型，字符串需要指向一个返回配置的文件。
  theme: Themes,
  // 通过 webpack 的 DefinePlugin 传递给代码，值会自动做 JSON.stringify 处理。
  define: {},
  // 配置 webpack 的?externals?属性。
  externals: {},
  // 配置 webpack 的 resolve.alias 属性
  alias: {},
  // 配置 browserslist，同时作用于 babel-preset-env 和 autoprefixer。
  // browserslist: {},
  // 配置 webpack 的 devtool 属性
  devtool: '',
  // 禁用 CSS Modules
  disableCSSModules: true,
  // 禁用 CSS 的 SourceMap 生成
  disableCSSSourceMap: false,
  // 定义额外的 babel preset 列表，格式为数组。
  extraBabelPresets: [],
  // 定义额外的 babel plugin 列表，格式为数组
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ],
  // 定义额外需要做 babel 转换的文件匹配列表，格式为数组，数组项是 webpack#Condition
  extraBabelIncludes: [],
  // 定义额外的 PostCSS 插件，格式为数组
  extraPostCSSPlugins: [],
  // 指定项目目录下的文件不走 css modules，格式为数组，项必须是 css 或 less 文件
  cssModulesExcludes: [],
  // 定义需要单纯做复制的文件列表，格式为数组，项的格式参考 copy-webpack-plugin 的配置
  copy: [
    {
      from: 'src/statics/img/favicon.ico',
      to: 'favicon.ico'
    }
  ],
  // 配置 webpack-dev-server 的 proxy 属性
  proxy: {
    '/api': {
      target: 'http://47.90.247.104',
      changeOrigin: true
      // pathRewrite: {'^/api': ''},
      // secure: false
    }
  },
  // 配置 node-sass 的选项。注意：使用 sass 时需在项目目录安装 node-sass 和 sass-loader 依赖
  sass: {},
  // 配置后会生成 manifest.json
  manifest: {},
  // 忽略 moment 的 locale 文件，用于减少尺寸
  ignoreMomentLocale: true,
  // 给 less-loader 的额外配置项
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  // 给 css-loader 的额外配置项。
  cssLoaderOptions: {},
  cssnano: {
    mergeRules: false
  }
}
