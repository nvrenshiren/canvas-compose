import cooike, { CookieAttributes } from 'js-cookie'
import moment from 'moment'
import { orderInfo } from '@/interfaces/mode'

interface orderAction {
  view: boolean //是否可查看
  dispatch: boolean //是否可派单
  delivery: boolean //是否可发货
  pay: boolean //是否可支付
  cancel: boolean //是否可取消
  break: boolean //是否可作废
  done: boolean //是否可完成
  get: boolean //是否可收货
  comment: boolean //是否可评价
}

export default {
  /**
   * 格式化显示日期时间
   */
  dateTime(value: number, format: string = 'YYYY-MM-DD HH:mm') {
    return moment(value).format(format)
  },
  getTime(days:number){
    moment.locale('en')
    return moment.months(moment().add(days, 'd').month())+' '+ moment().add(days, 'd').date()
  },
  /**
   * 获取Cooike
   */
  getCooike(key?: string) {
    return cooike.get(key)
  },
  /**
   * 设置Cooike
   */
  setCooike(name: string, value: any, options?: CookieAttributes) {
    return cooike.set(name, value, {
      expires: moment()
        .add(30, 'days')
        .valueOf()
    })
  },
  /**
   * 删除Cooike
   */
  removeCooike(name: string, options?: CookieAttributes) {
    return cooike.remove(name, options)
  },
  /**
   * 用户退出
   */
  loginOut() {
    this.removeCooike('token')
  },
  adminLogOut() {
    this.removeCooike('server_admin')
  },
  isLogin() {
    return !!this.getCooike('token')
  },
  /**
   * 获取随机数
   * @param length 随机数长度
   */
  getRan(length: number = 5) {
    return Math.floor((Math.random() + 1) * Math.pow(10, length - 1))
  },
  /**
   * 获取缩略图
   * @param img 图片ID
   * @param width 宽
   * @param height 高
   */
  getThumb(img: string, width: number = 30, height: number = 30) {
    return `/api/transfer/thumbs/${img}?w=${width}&h=${height}`
  },
  /**
   * 获取可操作
   * @param issuper
   * @param orderinfo
   */
  getOption(issuper: boolean, orderinfo: orderInfo): orderAction {
    return {
      view: true,
      dispatch: issuper && !orderinfo.hasSupplier && !orderinfo.status && orderinfo.ispay,
      delivery:
        !issuper &&
        // orderinfo.hasSupplier &&
        !orderinfo.status &&
        !orderinfo.isdelivery &&
        orderinfo.ispay,
      pay: !issuper && !orderinfo.status && !orderinfo.ispay,
      cancel: !issuper && !orderinfo.status && !orderinfo.ispay,
      break: issuper && !orderinfo.status && !orderinfo.ispay,
      done: issuper && !orderinfo.status && orderinfo.ispay && orderinfo.isdelivery,
      get: !issuper && !orderinfo.status && orderinfo.ispay && orderinfo.isdelivery,
      comment: !issuper && orderinfo.status === 2 && orderinfo.ispay && orderinfo.isdelivery
    }
  },
  getRequest() {
    let url = window.location.search;
    let request:any = {};
    let strs = []
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
      }
    }
    return request;
  }
}
