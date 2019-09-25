import Common from '@/common/common'
import cartCommon from '@/index/shopping/cart.common'
import { CartInfo, UserInfo } from '@/interfaces/mode'
import AuthService from '@/services/auth'
import ShoppingServer from '@/services/shopping'
import UserService from '@/services/user'
import store from '@/store/store'
import ModalForm from '@/util/modal/modal.form'
import { Badge, Breadcrumb, Col, Icon, message, Modal, Row } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Link from 'umi/link'
import LoginModal from './login.form'
import RegeditModal from './regedit.form'

interface State {
  user: UserInfo
  carts: CartInfo
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
      user: store.getState().user,
      carts: store.getState().carts
    }
  }
  state: State
  render() {
    let userinfo = this.state.user
    return (
      <Row className="index-head-warp main" type="flex" justify="space-between">
        <Col className="head-left" span={12}>
          <Row gutter={60} type="flex">
            <Col>EngLish</Col>
            <Col>$USD</Col>
          </Row>
        </Col>
        <Col className="head-right oh" span={12}>
          <Row type="flex" justify="end" gutter={60}>
            <Col className="head-user">
              {!userinfo.uid ? (
                <div>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={this.ModeLogin.bind(this)}
                  >
                    Sign in
                  </span>{' '}
                  /
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={this.ModeRegedit.bind(this)}
                  >
                    Join Free
                  </span>
                  <Icon type="user" style={{ marginLeft: '10px' }} />
                </div>
              ) : (
                <Breadcrumb separator="||">
                  <Breadcrumb.Item>
                    <Link to="/user/home">
                      <span>{userinfo.nickname || userinfo.name}</span>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a onClick={this.LoginOut.bind(this)}>Sign out</a>
                  </Breadcrumb.Item>
                </Breadcrumb>
              )}
            </Col>
            <Col className="head-cart" span={4}>
              <Badge count={this.state.carts.total}>
                <Link to="/shopping/cart">
                  <Icon type="shopping-cart" />
                </Link>
              </Badge>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
  ModeLogin() {
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
          this.setState({
            user: res.user
          })
          ShoppingServer.transTouristCartToUser(
            store.getState().carts.cid
          ).then(() => {
            cartCommon.getCart()
          })
          window.location.href = '/'
        }
      }
    })
  }
  ModeRegedit() {
    ModalForm.open({
      key: 'userregedit',
      title: 'New to RIGHR',
      type: 'userregedit',
      formCom: RegeditModal,
      module: 'index',
      service: UserService.addUser,
      width: 450,
      footer: null,
      callback: (res: any, data: any) => {
        if (res.stat === 'OK') {
          UserService.vaildationUser(data.name).then(() => {
            Modal.success({
              title: 'Registration success',
              content:
                'Your email will soon receive an activation email. Please check and activate your account.'
            })
          })
        } else {
          message.error(res.errText)
        }
      }
    })
  }
  LoginOut() {
    Common.loginOut()
    window.location.href = '/'
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        carts: store.getState().carts
      })
    })
  }
  componentWillUnmount() {
    this.setState = () => {
      return false
    }
  }
}
