import httpService from '@/common/http'

export default {
  addScore(pid: number, point: number, dgid: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/comment/addScore',
          data: { pid, dgid, point }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  getScore(pid: number, dgid: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/comment/getScore',
          data: { pid, dgid }
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
