import httpService from '@/common/http'

export default {
  /**
   * 获取广告标签列表
   */
  listAllAdTag(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/ad/listAllAdTag',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加广告标签
   */
  addAdTag(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/ad/addAdTag',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除广告标签
   */
  deleteAdTag(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/ad/deleteAdTag',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 更新广告标签
   */
  updateAdTag(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/ad/updateAdTag',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取广告列表
   */
  listAllAd(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/ad/listAllAd',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加广告
   */
  addAd(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/ad/addAd',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除广告
   */
  deleteAd(adids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/ad/deleteAd',
          data: { adids }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 更新广告
   */
  updateAd(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/ad/updateAd',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
