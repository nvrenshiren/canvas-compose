import httpService from '@/common/http'
import store from '@/store/store'

export default {
  deleteAddress(adid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/address/deleteAddress',
          data: { adid }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  insertAddress(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/address/insertAddress',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateAddress(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/address/updateAddress',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listAddress(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/address/listAddress'
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/user/listUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  searchUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/user/searchUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  addUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/addUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  adminaddUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/adminaddUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  getUserInfo(uid?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/user/getUserInfo',
          data: { uid }
        })
        .then((res) => {
          if (res.stat === 'OK') {
            store.dispatch({
              type: 'SET_USER_INFO',
              user: res.userInfo
            })
          }
          resolve(res)
        })
    })
  },
  updateUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/updateUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 管理员修改用户信息
   */
  updateUserByAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/updateUserByAdmin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 用户申请设计师
   */
  applyDesigner(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/applyDesigner',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 修改密码
   */
  changePwd(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/changePwd',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 用户删除
   */
  delUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/delUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 用户销户
   */
  cancelUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/cancelUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  vaildationUser(email: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/vaildationUser?name=' + email
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 正在申请成为设计师的数量
   */
  getApplyDesignersCount(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: 'api/user/getApplyDesignersCount',
          data: {}
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
}
