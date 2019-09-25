import httpService from '@/common/http'
import store from '@/store/store'

export default {
  /**
   * 供应商
   */
  listOrder(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/supplier/listOrder',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加订单到供应商
   */
  addSupplier(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/supplier/addSupplier',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 订单发货
   */
  deliveryOrder(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/supplier/deliveryOrder',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listSupplier(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/supplier/listSupplier',
          data: {}
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
