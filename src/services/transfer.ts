import httpService from '@/common/http'

export default {
  getUploadId(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/transfer/getUploadId',
          data: {}
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  tansUpload(data: string): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/transfer/getUploadId',
          data: { data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  tansUploadBase(data: string): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/transfer/tansUpload',
          data: { data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
