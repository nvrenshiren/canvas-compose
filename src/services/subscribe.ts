import httpService from '@/common/http'
import store from '@/store/store'

export default {
  /**
   * 获取群发邮件
   */
  getMassMails(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/subscribe/getMassMails',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 新增群发邮件
   */
  massMail(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/subscribe/massMail',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除群发邮件
   */
  deleteMassMails(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/subscribe/deleteMassMails',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除订阅
   */
  deleteSubscribes(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/subscribe/deleteSubscribes',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加订阅
   */
  addSubscribe(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/subscribe/addSubscribe',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取订阅列表
   */
  listSubscribes(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/subscribe/listSubscribes',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
}
