import httpService from '@/common/http'

export default {
  /**
   * 获取评论列表
   */
  searchComment(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/comment/searchComment',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加评论
   */
  addComment(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/comment/addComment',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除评论（管理员）
   */
  deleteCommentByAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/comment/deleteCommentByAdmin',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除评论（用户）
   */
  deleteCommentByUser(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/comment/deleteCommentByUser',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 设置评论状态
   */
  operateComment(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/comment/operateComment',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取产品评分
   */
  getScore(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/comment/getScore',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加评分
   */
  addScore(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/comment/addScore',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
