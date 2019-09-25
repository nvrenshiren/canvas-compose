import httpService from '@/common/http'

export default {
  addFavorite(pid: number, dgid: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/favorite/addFavorite',
          data: { pid, dgid }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listFavorites(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/favorite/listFavorites',
          data: {
            pageIndex: 1,
            pageSize: 999
          }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteFavorites(fids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/favorite/deleteFavorites',
          data: { fids }
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
