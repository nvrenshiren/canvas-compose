import { Alert, Button, Col, InputNumber, message, Row, Tag } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Common from '@/common/common'
import LoginModal from '@/layout/index/login.form'
import AuthService from '@/services/auth'
import ShopService from '@/services/shopping'
import store from '@/store/store'
import ModalForm from '@/util/modal/modal.form'
import CartCom from './cart.common'
import './cart.shop.less'
interface State {
  items: {
    cartItem: {
      cid: number
      count: number
      gid: number
      total: number
    }
    goods: any
  }[]
}

export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      items: []
    }
  }
  state: State
  get Login() {
    return (
      <Button
        onClick={() => {
          this.LoginForm()
        }}
      >
        Sign in
      </Button>
    )
  }
  render() {
    return (
      <div id="cart-shop" className="main">
        {!Common.isLogin() && (
          <div className="cart-shop-islogin">
            <Alert
              message="Already a customer?"
              description={this.Login}
              type="warning"
              showIcon
            />
          </div>
        )}
        <Row id="cart-shop-main">
          <Row
            className="cart-shop-head"
            type="flex"
            justify="space-between"
            style={{ margin: '20px 0' }}
          >
            <Col>
              <h1>Your Shopping Cart</h1>
            </Col>
            <Col>
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  this.Checkout()
                }}
              >
                Proceed to Checkout
              </Button>
            </Col>
          </Row>

          <Row className="cart-shop-table">
            <Row
              className="cart-shop-thead text-cn"
              type="flex"
              justify="space-between"
            >
              <Col span={12} style={{ textAlign: 'left' }}>
                Item
              </Col>
              <Col span={4}>Price</Col>
              <Col span={4}>Qty</Col>
              <Col span={4}>Total</Col>
            </Row>
            <Row className="cart-shop-tbody">
              {this.state.items.length > 0 &&
                this.state.items.map((item: any, index: number) => {
                  let pics = item.goods.pics
                  return (
                    <Row
                      className="cart-shop-item"
                      key={'cart-shop-' + item.goods.gid}
                    >
                      <Col span={12}>
                        <Row type="flex" gutter={10}>
                          <Col span={8} hidden={!pics[0] && !pics[2]}>
                            <img
                              src={Common.getThumb(pics[0] || pics[2], 180)}
                            />
                          </Col>
                          <Col span={8} hidden={!pics[1] && !pics[3]}>
                            <img
                              src={Common.getThumb(pics[1] || pics[3], 180)}
                            />
                          </Col>
                          <Col span={8}>
                            {item.goods.name}
                            <div>
                              <Tag color="#108ee9">{item.goods.sizeName}</Tag>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={4} className="text-cn">
                        <h4>
                          US$
                          {item.goods.price}
                        </h4>
                        <small>per piece</small>
                      </Col>
                      <Col span={4}>
                        <Row type="flex" justify="space-between">
                          <Col>X</Col>
                          <Col>
                            <InputNumber
                              min={1}
                              defaultValue={item.cartItem.count}
                              onChange={(value) => {
                                this.ChangeCount(index, value)
                              }}
                              className="text-cn"
                            />
                            <Row style={{ marginTop: 10 }}>
                              <Button
                                type="dashed"
                                onClick={() => {
                                  this.removeItem(index)
                                }}
                              >
                                remove
                              </Button>
                            </Row>
                          </Col>
                          <Col>=</Col>
                        </Row>
                      </Col>
                      <Col span={4} className="text-cn">
                        <h4>
                          US$
                          {(item.cartItem.count * item.goods.price).toFixed(2)}
                        </h4>
                      </Col>
                    </Row>
                  )
                })}
            </Row>
          </Row>
          <Row className="cart-shop-foot" type="flex" justify="end">
            <Col style={{ textAlign: 'right' }}>
              <h3 className="cart-shop-subtotal">
                <span>Subtotal: </span> US$
                {this.getSubtotal}
              </h3>
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  this.Checkout()
                }}
              >
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </Row>
      </div>
    )
  }
  Checkout() {
    if (Common.isLogin()) {
      window.location.href = '/shopping/steps'
    } else {
      this.LoginForm()
    }
  }
  ChangeCount(index: number, value: any) {
    let count = value * 1
    let item = this.state.items[index]
    ShopService.setGoodsCount({
      cid: item.cartItem.cid,
      gid: item.cartItem.gid,
      count
    }).then((res) => {
      if (res.stat === 'OK') {
        this.getCart()
      }
    })
  }
  removeItem(index: number) {
    let gids = [this.state.items[index].cartItem.gid]
    ShopService.deleteGoods({
      cid: this.state.items[index].cartItem.cid,
      gids
    }).then((res) => {
      if (res.stat === 'OK') {
        this.getCart()
      }
    })
  }
  LoginForm() {
    ModalForm.open({
      key: 'userlogin',
      title: 'Secure Sign In',
      type: 'userlogin',
      formCom: LoginModal,
      module: 'index',
      service: AuthService.login,
      width: 450,
      footer: null,
      callback: (res: any) => {
        if (res.stat === 'OK') {
          Common.setCooike('token', res.token)
          store.dispatch({
            type: 'SET_USER_INFO',
            user: res.user
          })
          ShopService.transTouristCartToUser(store.getState().carts.cid).then(
            () => {
              CartCom.getCart()
            }
          )
          window.location.href = '/'
        } else {
          message.error(res.errText)
        }
      }
    })
  }
  get getSubtotal() {
    let subtotal: number = 0
    this.state.items.map((item: any) => {
      subtotal += item.cartItem.count * item.goods.price
    })
    return subtotal.toFixed(2)
  }
  getCart() {
    CartCom.getCart(true, (res: any) => {
      this.setState({
        items: res.items
      })
    })
  }
  componentDidMount() {
    this.getCart()
  }
  componentWillUnmount() {}
}
