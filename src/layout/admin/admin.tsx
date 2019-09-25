import { Button, Layout } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { RouteComponentProps } from 'react-router'
import DocumentTitle from 'react-document-title'
import Common from '@/common/common'
import Auth from '@/services/auth'
import rightService from '@/services/right'
import store from '@/store/store'
import '@/statics/css/pub.less'
import './admin.less'
import SubMenu from './submenu'
import TopMenu from './topmenu'

const { Header, Content, Sider } = Layout

interface RouteConfig extends RouteComponentProps<any> {
  route: any
}

export default class extends React.Component<RouteConfig> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.state = {
      hasReady: false
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  state: {
    hasReady: boolean
  }
  render() {
    return (
      <DocumentTitle title="后台管理">
        <Layout className="home-box">
          <Header className="home-box-header">
            <div className="fr login-out">
              <Button
                type="primary"
                icon="windows-o"
                onClick={() => {
                  Common.adminLogOut()
                  this.props.history.push('/login')
                }}
              >
                退出
              </Button>
            </div>
            <div className="home-logo logo fl" />
            <TopMenu
              module={this.props.match.params.module}
              history={this.props.history}
              route={this.props.route}
            />
          </Header>
          {this.state.hasReady && (
            <Layout className="home-box-main">
              {this.props.match.params.module !== 'dashboard' && (
                <Sider className="home-sider">
                  <SubMenu
                    module={this.props.match.params.module}
                    history={this.props.history}
                    route={this.props.route}
                  />
                </Sider>
              )}
              <Layout style={{ padding: '24px 24px 24px' }}>
                <Content className="home-box-content">
                  {this.props.children}
                  {/* <Switch>
                  {Routes.getRoutes()
                    .filter((route) => {
                      let res = false
                      if (route.entry === 'admin') {
                        res = true
                      }
                      return res
                    })
                    .map((route) => {
                      return (
                        <Route
                          key={route.path}
                          exact={route.exact}
                          path={route.path}
                          component={route.component}
                        />
                      )
                    })}
                </Switch> */}
                </Content>
              </Layout>
            </Layout>
          )}
        </Layout>
      </DocumentTitle>
    )
  }
  getAdminInfo() {
    rightService.getServerAdminInfo().then((res) => {
      if (res.stat === 'OK') {
        store.dispatch({
          type: 'SET_ADMIN_INFO',
          admin: {
            name: 'admin',
            info: res.info
          }
        })
        window.userInfo = res.info
        this.setState({
          hasReady: true
        })
      }
    })
  }
  componentDidMount() {
    if (!this.props.match.params.module) {
      this.props.history.push('/admin/dashboard')
    }
    Auth.checkAdminLogin().then((res: any) => {
      if (res.isLogin) {
        this.getAdminInfo()
        if (!this.props.match.params.module) {
          this.props.history.push('/admin/dashboard')
        }
      } else {
        this.props.history.push('/login')
      }
    })
  }
}
