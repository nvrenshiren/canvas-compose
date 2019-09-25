import httpService from '@/common/http'
import store from '@/store/store'

export default {
  listNavigation(data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      httpService
        .post({
          url: '/api/navigation/listNavigation',
          data: { ...data }
        })
        .then((res) => {
          if (res.stat === 'OK') {
            store.dispatch({ type: 'SET_NAVS_INFO', navs: res.rows })
          }
          resolve(res)
        })
    })
  }
}
