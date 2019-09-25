import httpService from '@/common/http'
import { resolve } from 'url'

interface addSinglePagesRequest {
  name: string
  detail: string
  spcid: number
  isurl: false
  url: string
  content: string
  pic: string
}

interface updateSinglePagesRequest extends addSinglePagesRequest {
  spid: number
}

interface addAboutUsRequest {
  title: string
  content: string
}

export default {
  listNavigation(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/navigation/listNavigation',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteNavigation(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/navigation/deleteNavigation',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  addNavigation(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/navigation/addNavigation',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateNavigation(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/navigation/updateNavigation',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 单页分类
   */
  listCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/singlepage/listCategory',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  addCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/singlepage/addCategory',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  deleteCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/singlepage/deleteCategory',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  updateCategory(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/singlepage/updateCategory',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 获取单页列表
   */
  listSinglePages(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/singlepage/listSinglePages',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加单页
   */
  addSinglePages(data: addSinglePagesRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/singlepage/addSinglePages',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加单页
   */
  updateSinglePages(data: updateSinglePagesRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/singlepage/updateSinglePages',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除单页
   */
  deleteSinglePages(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/singlepage/deleteSinglePages',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 关于我们列表
   */
  listAll(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aboutus/listAll',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 添加关于我们
   */
  addAboutUs(data: addAboutUsRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aboutus/addAboutUs',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 删除关于我们
   */
  deleteAboutUs(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aboutus/deleteAboutUs',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  },
  /**
   * 更新关于我们
   */
  updateAboutUs(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/aboutus/updateAboutUs',
          data: data
        })
        .then((res) => {
          resolve(res)
        })
    })
  }
}
