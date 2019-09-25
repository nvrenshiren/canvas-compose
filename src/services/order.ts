import httpService from '@/common/http'

export default {
  createOrder(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/order/createOrder',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listOrder(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/order/listOrderByUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listOrderByAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/order/listOrderByAdmin',
          data: data
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
          url: '/api/order/deliveryOrder',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 订单完成
   */
  finishOrder(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/order/finishOrder',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 订单完成（管理员）
   */
  finishOrderByAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/order/finishOrderByAdmin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 订单作废
   */
  rejectOrder(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/order/rejectOrder',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 配送接口
   */
  listDelivery(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/delivery/listDelivery',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteDelivery(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/delivery/deleteDelivery',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  insertDelivery(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/delivery/insertDelivery',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateDelivery(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/delivery/updateDelivery',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  getUserOrderInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/order/getUserOrderInfo',
          data: {}
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listOrderByUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/order/listOrderByUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  orderPay(oid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/pay/orderPay',
          data: { oid }
        })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  /**
   * 工作台接口
   */
  getOrderReport(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/order/getOrderReport',
          data: {}
        })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
