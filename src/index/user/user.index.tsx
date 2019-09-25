import * as React from 'react'
import Common from '@/common/common'
import Link from 'umi/link'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import store from '@/store/store'
import { Avatar, Col, Modal, Row } from 'antd'
import { RouteComponentProps } from 'react-router'
import { UserInfo } from '@/interfaces/mode'
import './user.index.less'
interface State {
  userinfo: UserInfo
  thumb?: string
}

interface RouteConfig extends RouteComponentProps<any> {
  route: {
    routes: any[]
    [key: string]: any
  }
}

export default class extends React.Component<RouteConfig> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: State
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      userinfo: store.getState().user
    }
  }

  render() {
    return (
      <Row id="user-center">
        <Row className="user-header-box">
          <Row className="user-head-bg">
            <Row type="flex" align="bottom" className="user-nav-box">
              <Row className="user-nav-warp">
                <Row type="flex" justify="center" className="user-nav main">
                  <Col span={3} className="user-logo">
                    <Avatar
                      size={80}
                      icon="user"
                      src={
                        '/api/transfer/downloadThumbs/' +
                        this.state.userinfo.pic
                      }
                    />
                  </Col>
                  {this.props.route.routes
                    .filter((route) => {
                      return !!route.link
                    })
                    .map((item: any) => {
                      return (
                        <Col
                          key={'nav-item' + item.model}
                          span={2}
                          className={
                            this.props.match.params.model === item.model
                              ? 'nav-item active'
                              : 'nav-item'
                          }
                        >
                          <Link to={item.link}>{item.title}</Link>
                        </Col>
                      )
                    })}
                  <Col span={2} className="nav-item">
                    <a
                      onClick={() => {
                        Common.loginOut()
                        window.location.href = '/'
                      }}
                    >
                      Log Out
                    </a>
                  </Col>
                </Row>
              </Row>
            </Row>
          </Row>
        </Row>
        <Row className="user-content-box" style={{ minHeight: 300 }}>
          {this.props.children}
        </Row>
      </Row>
    )
  }
  componentDidMount() {
    if (!Common.isLogin()) {
      Modal.error({
        title: 'Need to Login',
        content: 'This module needs to Login for normal use.',
        onOk: () => {
          window.location.href = '/'
        }
      })
    }
  }
  componentWillUnmount() {}
}
