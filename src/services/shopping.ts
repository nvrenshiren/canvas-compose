import httpService from '@/common/http'
import store from '@/store/store'

export default {
  deleteGoods(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/shopping/deleteGoods',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  getCart(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/shopping/getCart',
          data: { ...data }
        })
        .then((res) => {
          if (res.stat === 'OK') {
            store.dispatch({
              type: 'SET_INFO_CART',
              carts: res.cart
            })
          }
          resolve(res)
        })
    })
  },
  addGoods(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/shopping/addGoods',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  setGoodsCount(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/shopping/setGoodsCount',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  transTouristCartToUser(cid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/shopping/transTouristCartToUser',
          data: { cid }
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
