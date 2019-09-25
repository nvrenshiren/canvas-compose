// import Login from '@/admin/login/login'
import { Layout } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { RouteComponentProps } from 'react-router'
import DocumentTitle from 'react-document-title'
// import { Route } from 'react-router-dom'
import './login.less'

const { Content } = Layout

export default class extends React.Component<RouteComponentProps<any>> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  render() {
    return (
      <DocumentTitle title="后台登录">
        <div className="login-box">
          <Layout className="login-layout">
            <Content className="login-content-layout">
              {this.props.children}
              {/* <Route path="/login" exact component={Login} /> */}
            </Content>
          </Layout>
        </div>
      </DocumentTitle>
    )
  }
}
