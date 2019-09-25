import httpService from '@/common/http'

export default {
  listCoupons(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/coupon/listCoupons',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  addCoupon(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/coupon/addCoupon',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteCoupons(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/coupon/deleteCoupons',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateCoupon(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/coupon/updateCoupon',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  checkCoupon(code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/coupon/checkCoupon',
          data: { code }
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
