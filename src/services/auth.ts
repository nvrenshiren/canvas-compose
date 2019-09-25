import httpService from '@/common/http'

export default {
  login(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/auth/login',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  adminLogin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/auth/adminLogin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  checkAdminLogin(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/auth/checkAdminLogin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  checkLogin(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/auth/checkLogin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
