import httpService from '@/common/http'

export default {
  /**
   * 获取设计师列表
   */
  listDesigner(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/designer/listDesigner',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取设计师信息
   */
  getDesigner(did: number): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/designer/getDesigner',
          data: {did}
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 设计师作品列表
   */
  listGoods(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/designer/listGoods',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 设计师添加作品
   */
  createGoods(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/designer/createGoods',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 设计师更新作品(管理员)
   */
  updateGoodsByAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/designer/updateGoodsByAdmin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 设计师更新作品
   */
  updateGoodsByUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/designer/updateGoodsByUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除作品（用户）
   */
  deleteGoodsByUser(dgids: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/designer/deleteGoodsByUser',
          data: { dgids }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除用户（管理员）
   */
  deleteGoodsByAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/designer/deleteGoodsByAdmin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  getDesignerGoodsInfo(dgid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/designer/getDesignerGoodsInfo',
          data: {dgid}
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
