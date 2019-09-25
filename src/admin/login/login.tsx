import Common from '@/common/common'
import Auth from '@/services/auth'
import rightService from '@/services/right'
import store from '@/store/store'
import { message } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { RouteComponentProps } from 'react-router'
import './login.less'
import LoginForm from './loginform'
interface State {
  loading: boolean
}

export default class extends React.Component<RouteComponentProps<any>> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: State
  initComponent() {
    this.state = {
      loading: false
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  render() {
    return (
      <div className="login-content">
        <div className="login-content-main">
          <div className="login-type-title">RIGHR 管理后台</div>
          <LoginForm
            loading={this.state.loading}
            submit={this.submit.bind(this)}
          />
        </div>
      </div>
    )
  }

  submit(data: any) {
    this.setState({ loading: true })
    Auth.adminLogin(data).then((res: any) => {
      this.setState({
        loading: false
      })
      if (res.stat === 'OK') {
        this.getAdminInfo()
        this.goHome(res.token)
      } else {
        message.config({
          top: 100
        })
        message.error(res.errText)
      }
    })
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
      }
    })
  }
  goHome(token: string) {
    Common.setCooike('server_admin', token)
    this.props.history.push('/admin/dashboard')
  }
  componentDidMount() {
    Auth.checkAdminLogin().then((res: any) => {
      if (res.isLogin) {
        if (!this.props.match.params.module) {
          this.props.history.push('/admin/dashboard')
          this.getAdminInfo
        }
      }
    })
  }
  componentWillMount() {}
}
