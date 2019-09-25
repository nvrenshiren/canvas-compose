import { ProInfo } from './mode'

export interface Base {
  stat: string
  rows?: any[]
  errText?: string
  [key: string]: any
}

export interface getProductInfo extends Base {
  product: ProInfo
}
