import httpService from '@/common/http'

export default {
  listArea(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/area/listArea',
          data: data
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  addArea(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/area/addArea',
          data: data
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  deleteArea(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/area/deleteArea',
          data: data
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  updateArea(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/area/updateArea',
          data: data
        })
        .then(res => {
          resolve(res)
        })
    })
  }
}
