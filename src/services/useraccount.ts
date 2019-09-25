import httpService from '@/common/http'
import store from '@/store/store'

export default {
  /**
   * 管理员获取提单列表
   */
  getWithdrawCardsByAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/useraccount/getWithdrawCardsByAdmin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取用户资金信息
   */
  getUserAccount(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/useraccount/getUserAccount',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 提取资金
   */
  createWithdrawCards(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/useraccount/createWithdrawCards',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 提单列表
   */
  getWithdrawCardsByUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/useraccount/getWithdrawCardsByUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 修改提取单信息（用户）
   */
  updateWithdrawCardsByAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/useraccount/updateWithdrawCardsByAdmin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
