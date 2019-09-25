import httpService from '@/common/http'

export default {
  /**
   * 管理员获取售后列表
   */
  listByAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aftersold/listByAdmin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 用户获取售后列表
   */
  listByUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aftersold/listByUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除售后信息
   */
  deleteByAdmin(asids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aftersold/deleteByAdmin',
          data: {
            asids: asids
          }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加售后信息
   */
  add(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aftersold/add',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 将售后信息设为完成
   */
  setFinish(asids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aftersold/setFinish',
          data: {
            asids: asids
          }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取售后详情
   */
  getInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aftersold/getInfo',
          data: {}
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 更新售后功能信息
   */
  setInfo(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aftersold/setInfo',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
