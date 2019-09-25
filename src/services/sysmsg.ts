import httpService from '@/common/http'
import store from '@/store/store'

export default {
  setMallInfo(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/setMallInfo',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  getMallInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/getMallInfo',
          data: {}
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取营业状态
   */
  getBusinessInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/getBusinessInfo',
          data: {}
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 设置营业状态
   */
  setBusinessInfo(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/setBusinessInfo',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取数据库备份列表
   */
  listDatabaseBackup(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/listDatabaseBackup',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 生成数据库备份
   */
  createDatabaseBackup(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/createDatabaseBackup',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除数据库备份
   */
  deleteDatabaseBackup(dbids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/deleteDatabaseBackup',
          data: { dbids }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 还原数据库备份
   */
  recoverDatabaseBackup(dbid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/recoverDatabaseBackup',
          data: { dbid }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取Email信息
   */
  getEmailInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/getEmailInfo'
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
    设置Email信息
    "mailServerHost": "smtp.exmail.qq.com",
    "mailServerPort": 465,
    "password": "2hiNHMCCqBgrMYE4",
    "userName": "test@1kuaipan.cn"
   */
  setEmailInfo(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/setEmailInfo',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**测试邮箱 */
  testMail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/testMail',
          data: { email }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取模板
   */
  getMessageTemplet(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/getMessageTemplet',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 设置模板
   */
  updateMessageTemplet(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/sysmsg/updateMessageTemplet',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
