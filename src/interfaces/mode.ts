export interface ListItem {
  items?: any[] //数据rows
  total?: number //数据总量
  pageIndex?: number //当前页序列
  pageSize?: number //页面容量
  index?: number //当前选择序列
  pagination?: boolean //是否开启分页
}
export interface ListCol {
  field: string //字段名
  width?: number //宽度,不设置就自适应
  checkbox?: boolean //是否选择框
  title?: string //列名称
  sortable?: boolean //是否支持排序
  formatter?: Function //格式化函数
  grid?: boolean //是否grid模式放入
}
export interface UserInfo {
  name?: string //用户名
  nickname?: string //用户昵称
  status?: boolean //用户状态
  uid: number //用户ID
  designer?: boolean //是否设计师
  email?: string //邮箱
  phone?: string //手机号
  pic?: string // 头像
  digest?: string // digest  （设计师需要）
  abstract?: string // 设计师背景图片  （设计师需要）
  describe?: string // 设计师描述
  type?: number // 支付方式
  account?: string // 支付账号
  designerInfo?: DesginerInfo
}

export interface ProInfo {
  sold?: number // 销售量
  amount?: number //总量
  proCode?: string // 商品编号
  fabid?: number //面料的id
  pid?: number //产品id
  iscombinepic?: boolean // 是否可以自定义样式
  books?: string //3D样式的文件id
  name?: string //名称
  describe?: string //详情
  detail?: string //简介
  dimension?: number //是否为3D（1：是，2不是）
  catids?: number[] // 分类id的集合
  items?: [
    {
      pid?: number //产品id
      ptid?: number //产品小项的id
      size?: number //规格id（小规格X M L等）
      price?: number //价格
      amount?: number //总量
      itemCode?: string //商品编号
      sold?: number //销售
      stat?: number //状态
      sizeName?: string
    }
  ]
  binditems?: {
    //  自定义样式
    front?: {
      //左
      main?: string //"316af6cfe2cc433fa428275c212bf013", //主图片id
      pid?: number // 产品id
      shadow?: string //"cf5a057bad80456a9234a8b2c94b7689", //阴影图片id
      cpid?: number // 数据库编号
      mask?: string[] //遮盖图片 id
      part?: string //  部位
    }
    back?: {
      //左
      main?: string //"316af6cfe2cc433fa428275c212bf013", //主图片id
      pid?: number // 产品id
      shadow?: string //"cf5a057bad80456a9234a8b2c94b7689", //阴影图片id
      cpid?: number // 数据库编号
      mask?: string[] //遮盖图片 id
      part?: string //  部位
    }
    left?: {
      //左
      main?: string //"316af6cfe2cc433fa428275c212bf013", //主图片id
      pid?: number // 产品id
      shadow?: string //"cf5a057bad80456a9234a8b2c94b7689", //阴影图片id
      cpid?: number // 数据库编号
      mask?: string[] //遮盖图片 id
      part?: string //  部位
    }
    right?: {
      //左
      main?: string //"316af6cfe2cc433fa428275c212bf013", //主图片id
      pid?: number // 产品id
      shadow?: string //"cf5a057bad80456a9234a8b2c94b7689", //阴影图片id
      cpid?: number // 数据库编号
      mask?: string[] //遮盖图片 id
      part?: string //  部位
    }
  }
  priceshow?: string // 显示的价格
  status?: number //状态（1标识库存，0标识在销售）
  thumbs?: string //"ef2189e8a5f341d7803647a4be890138" 缩略图
}

//分类
export interface CatItem {
  catid: number
  describe: string
  key: string
  name: string
  sort: number
  title: string
}
//购物车
export interface CartInfo {
  cid?: number //购物车ID
  id?: number //购物车所属会员ID(如果是游客则是随机的)
  idtype?: number //购物车信息类型 1详情  0大概
  total?: number //购物车总数
}

//导航
export interface NavItem {
  catid: number
  classify: number
  name: string
  nid: number
  sort: number
  spcid: number
  url: string
}
//规格
export interface SpecItem {
  name: string //规格名称
  pic: string //规格图片
  sid: number //父规格ID
  sort: number //排序
  stid: number //规格ID
}

//画布
export interface Mask {
  mask: string
  flower: string
  scale: number
  position: {
    x: number
    y: number
  }
}
//部位
export interface Place {
  main: string
  shadow: string
  bgcolor: string
  repeat: boolean
  flowers: string[]
  masks: Mask[]
}

export interface ThemeItem {
  name: string
  pic: string
  sort: number
  tid: number
}

export interface DesginInfo {
  ctime?: number
  dgid?: number
  did?: number
  dstids?: string[]
  isshow?: boolean
  name?: string
  notice?: string
  pid?: number
  processData?: any
  product?: ProInfo
  type?: number
}

export interface DesginerInfo {
  uid: number
  exattr: string
  digest: string
  count: number
  ctime: number
  describe: string
  pic: string
  type: number
  did: number
  abstract: string
}

export interface orderInfo {
  oid: number //订单ID
  uid: number //会员ID
  reciept: string //订单号
  postage: number //邮费
  total: number //总费用
  status: number //订单状态
  fullname: string //收货人姓名
  address: string //收货地址
  age: number //收货人年纪
  sex: number //收货人性别
  postcode: number //收货人邮编
  phone: string //收货人手机号码
  detail: string //订单备注
  ptime: number //完成时间
  ctime: number //创建时间
  detime: number //发货时间
  delivery: number //快递种类ID
  ispay: boolean //是否支付
  isdelivery: boolean //是否发货
  country: string //收货国家
  province: string //收货地区
  exattr1: string //快递单号
  exattr2: string //修改价格的原因
  hasSupplier:boolean//是否已派单
  [keys: string]: any
}
