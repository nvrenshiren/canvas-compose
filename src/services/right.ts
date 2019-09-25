import httpService from '@/common/http'
import store from '@/store/store'

interface addRoleRequest {
  roleid?: number
  title: string
  content: string
  right: number[]
}

interface updateRoleRequest extends addRoleRequest {
  roleid?: number
}

interface addServerAdminRequest {
  name: string
  pwd: string
  nickName: string
  email: string
  dept: string
  issuper: boolean
  right: number[]
  remark: string
}

interface updateServerAdminRequest extends addServerAdminRequest {
  said?: number
}

interface deleteAdmins {
  saids: number[]
}

export default {
  /**
   * 获取所有角色
   */
  listRoles(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/right/listRoles',
          data: { ...data }
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  /**
   * 添加角色
   */
  addRole(data: addRoleRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/right/addRole',
          data: data
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  /**
   * 更新角色
   */
  updateRole(data: updateRoleRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/right/updateRole',
          data: data
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  /**
   * 删除角色
   */
  deleteRole(roleids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/right/deleteRole',
          data: {
            roleids: roleids
          }
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  /**
   * 管理员列表
   */
  listServerAdmin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/right/listServerAdmin',
          data: data
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  /**
   * 添加管理员
   */
  addServerAdmin(data: addServerAdminRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/right/addServerAdmin',
          data: data
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  /**
   * 添加管理员
   */
  updateServerAdmin(data: updateServerAdminRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/right/updateServerAdmin',
          data: data
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  /**
   * 删除角色
   */
  deleteAdmins(saids: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/right/deleteAdmins',
          data: {
            saids: saids
          }
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  /**
   * 获取管理员自身信息
   */
  getServerAdminInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/right/getServerAdminInfo',
          data: {}
        })
        .then(res => {
          resolve(res)
        })
    })
  },

}
