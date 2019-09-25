import httpService from '@/common/http'
import { getProductInfo } from '@/interfaces/response'
import store from '@/store/store'

export default {
  listProductsByStatus(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/product/listProductsByStatus',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  undercarriageProduct(pids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/product/undercarriageProduct',
          data: { pids }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteProduct(pids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/product/deleteProduct',
          data: { pids }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  addProduct(form: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/product/addProduct',
          data: form
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateProduct(form: Object = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/product/updateProduct',
          data: form
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  getProductInfo(pid: number): Promise<getProductInfo> {
    return new Promise((resolve, reject) => {
      httpService
        .post<getProductInfo>({
          url: '/api/product/getProductInfo',
          data: { pid }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listCatagorys(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/catagory/listCatagorys',
          data: data
        })
        .then((res) => {
          if (res.stat === 'OK') {
            store.dispatch({
              type: 'SET_CATS_INFO',
              cats: res.rows
            })
          }
          resolve(res)
        })
    })
  },
  addCatagory(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/catagory/addCatagory',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteCatagory(catids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/catagory/deleteCatagory',
          data: { catids }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateCatagory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/catagory/updateCatagory',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listTheme(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/theme/listTheme',
          data: data
        })
        .then((res) => {
          if (res.stat === 'OK') {
            store.dispatch({
              type: 'SET_THEMES_INFO',
              themes: res.rows
            })
          }
          resolve(res)
        })
    })
  },
  insertTheme(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/theme/insertTheme',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateTheme(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/theme/updateTheme',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteTheme(tids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/theme/deleteTheme',
          data: { tids }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listStyle(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/theme/listStyle',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  insertStyle(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/theme/insertStyle',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateStyle(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/theme/updateStyle',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  listSpecifications(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/specification/listSpecifications',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  addSpecification(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/specification/addSpecification',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateSpecification(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/specification/updateSpecification',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteSpecification(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/specification/deleteSpecification',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateSpecificationItems(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/specification/updateSpecificationItems',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteStyle(styids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/theme/deleteStyle',
          data: { styids }
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  searchProducts(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/product/searchProducts',
          data: data
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
          url: '/api/product/getMallInfo',
          data: {}
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  getEmptyProduct(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/product/getEmptyProduct',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  getProductViews(data:any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/product/getProductViews',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
