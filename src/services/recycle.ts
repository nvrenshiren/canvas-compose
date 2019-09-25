import httpService from '@/common/http'
import store from '@/store/store'

export default {
  listRecycles(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/recycle/listRecycles',
          data: { ...data }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  recover(rids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/recycle/recover',
          data: {
            rids: rids
          }
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
