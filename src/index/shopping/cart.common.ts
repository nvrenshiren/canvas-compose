import Common from '@/common/common'
import store from '@/store/store'
import ShoppingServer from '@/services/shopping'

export default {
  getCartID() {
    if (Common.isLogin()) {
      return store.getState().user.uid
    } else {
      if (!!Common.getCooike('catrid')) {
        return parseInt(Common.getCooike('catrid'))
      } else {
        let catrid = Common.getRan(11)
        Common.setCooike('catrid', catrid)
        return catrid
      }
    }
  },
  getCart(hasDetail: boolean = false, callback?: Function) {
    let type = Common.isLogin() ? 1 : 0
    ShoppingServer.getCart({ type, id: this.getCartID(), hasDetail }).then(
      (res) => {
        callback && callback(res)
      }
    )
  }
}
