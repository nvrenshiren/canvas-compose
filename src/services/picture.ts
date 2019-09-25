import httpService from '@/common/http'

export default {
  listPics(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/picture/listPics',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deletePics(fids:string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/picture/deletePics',
          data: {
            fids: fids
          }
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
