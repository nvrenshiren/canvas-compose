module.exports = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: false,
      dll: false,
      hardSource: false,
      targets: {
        ie: 10
      },
      locale: {
        enable: true, // default false
        default: 'en-US' // default zh-CN
      },
      dynamicImport: {
        loadingComponent: './layout/load/load.tsx',
        webpackChunkName: true,
        level:4
      }
    }
  ]
]
