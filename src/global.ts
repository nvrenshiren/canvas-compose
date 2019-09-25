import '@babel/polyfill'

//定义全局类型,方便其他文件调用
declare global {
  interface Window {
    fabric: {
      name: string
      value: number
    }[]
    Place: string[]
    userInfo: any
  }
}

//面料
window.fabric = [
  {
    name: '牛奶丝：Polyester',
    value: 1
  },
  {
    name: '真丝：Silk',
    value: 2
  },
  {
    name: '雪纺:Chiffon',
    value: 3
  },
  {
    name: '人造皮革：PU',
    value: 4
  },
  {
    name: 'TUP',
    value: 5
  }
]
window.Place = ['front', 'back', 'left', 'right']
//禁止右键
/*
window.addEventListener('contextmenu', (e: any) => {
  e.preventDefault()
})*/
//路由的Link组件(渲染出A标签)重复点击报错...路由不允许PUSH相同的地址,
window.addEventListener(
  'click',
  (e: any) => {
    if (e.target.tagName === 'A') {
      if (e.target.hash == window.location.hash) {
        e.preventDefault()
      }
    }
  },
  true
)

export interface winroute {
  name: string
  model: string
}
