import { Base } from '@/interfaces/response'

interface HeaderOption {
  [propName: string]: string
}

export default new class {
  post<T extends Base, U = any>(option: { url: string; cache?: any; data?: U; headers?: HeaderOption; async?: boolean }): Promise<T> {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      if (typeof option.cache !== 'undefined' && !option.cache) {
        let nowTime = new Date().getTime()
        let timeHash = option.url.indexOf('?') < 0 ? '?t=' + nowTime : '&t=' + nowTime
        option.url = option.url + timeHash
      }
      let async: boolean = true
      if (option.hasOwnProperty('async')) {
        async = option.async
      }
      xhr.open('POST', option.url, async)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.setRequestHeader('X-Device', 'Web')
      xhr.setRequestHeader('X-Language', 'zh')
      for (let key in option.headers || {}) {
        xhr.setRequestHeader(key, option.headers[key])
      }
      xhr.onload = () => {
        try {
          let data = JSON.parse(xhr.responseText)
          resolve(data as T)
        } catch (error) {
          reject(error)
        }
      }
      xhr.onerror = (error) => {
        reject(error)
      }
      xhr.send(JSON.stringify(option.data))
    })
  }
}()
