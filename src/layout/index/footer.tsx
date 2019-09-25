import * as React from 'react'
import Link from 'umi/link'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import store from '@/store/store'
import SubscribeService from '@/services/subscribe'
import { Button, Col, Icon, Input, message, Row } from 'antd'
import { UserInfo } from '@/interfaces/mode'
interface State {
  user: UserInfo
}
export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: any
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      emailVal: '',
      user: store.getState().user
    }
  }
  render() {
    let userinfo = this.state.user
    return (
      <Row className="index-footer-warp main">
        <Col>
          <Row type="flex" justify="center" className="footer-info">
            <Col span={5}>
              <img src={require('../../statics/img/logo.png')} />
              <div className="follow">
                FOLLOW US
                <div className="follow-icons">
                  <Link to="" className="follow-icon">
                    <Icon type="twitter" />
                  </Link>
                  <Link to="" className="follow-icon">
                    <Icon type="wechat" />
                  </Link>
                  <Link to="" className="follow-icon">
                    <Icon type="google-plus" />
                  </Link>
                  <Link to="" className="follow-icon">
                    <Icon type="facebook" />
                  </Link>
                  {/* <Link to="" className="follow-icon">
                    <Icon type="weibo" />
                  </Link> */}
                </div>
                WE ACCEPT
                <div className="payment">
                  <span className="payment-icons paypal" />
                  <span className="payment-icons visa" />
                  <span className="payment-icons mast" />
                  <span className="payment-icons disc" />
                </div>
              </div>
            </Col>
            <Col span={3}>
              <span>HELP & SUPPORT</span>
              <ul>
                <li>
                  <a href="#/page/14" target="_blank">
                    How To Track
                  </a>
                </li>
                <li>
                  <a href="#/page/15" target="_blank">
                    The Size
                  </a>
                </li>
                <li>
                  <a href="#/page/16" target="_blank">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#/page/17" target="_blank">
                    Return & Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#/page/18" target="_blank">
                    How To Design
                  </a>
                </li>
              </ul>
            </Col>
            <Col span={3}>
              <span>COMPANY INFO</span>
              <ul>
                <li>
                  <a href="#/page/5" target="_blank">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#/page/11" target="_blank">
                    Be Our Desinger Now
                  </a>
                </li>
                <li>
                  <a href="#/page/7" target="_blank">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#/page/8" target="_blank">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#/page/19" target="_blank">
                    Term Of Service
                  </a>
                </li>
              </ul>
            </Col>
            <Col span={3}>
              <span>CUSTOMER CARE</span>
              <ul>
                <li>
                  <a href="#/page/23" target="_blank">
                    Technology
                  </a>
                </li>
                <li>
                  <Link to="#/page/24">Our Products</Link>
                </li>
                <li>
                  <Link to="">Contact Us</Link>
                </li>
                <li>
                  <Link to="">Payment Method</Link>
                </li>
                <li>
                  <Link to="">Online Help</Link>
                </li>
              </ul>
            </Col>
            <Col span={5}>
              <span>GET EXCLUSIVE OFFERS</span>
              <div className="sign-me">
                <Input
                  placeholder="Email Address"
                  prefix={<Icon type="mail" style={{ color: '#999' }} />}
                  ref={(node) => (this.emailInput = node)}
                  className="emalInput"
                  onChange={(e) => {
                    this.setState({
                      emailVal: e.target.value
                    })
                  }}
                />
                <Button
                  ghost
                  icon="user-add"
                  onClick={() => {
                    let reg = new RegExp(
                      '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
                    )
                    if (!reg.test(this.state.emailVal)) {
                      message.error('email error')
                    }
                    if (!userinfo.hasOwnProperty('uid')) {
                      message.error('please login')
                      return
                    }
                    SubscribeService.addSubscribe({
                      email: this.state.emailVal,
                      uid: userinfo.uid
                    }).then((res) => {
                      if (res.stat === 'OK') {
                        message.info('Subscribe Success!')
                        this.setState({
                          email: ''
                        })
                      }
                    })
                  }}
                  className="emalBtn"
                >
                  Sign me up!
                </Button>
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="center" className="footer-rights">
            <Col>Copyright © 2000-2018 RIGHR.COM Inc. All rights reserved.</Col>
          </Row>
        </Col>
      </Row>
    )
  }
  emailInput: any
  componentDidMount() {}
  componentWillUnmount() {}
}
