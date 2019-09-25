import { Menu } from 'antd'
import { ClickParam } from 'antd/lib/menu'
import { History } from 'history'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import store from '../../store/store'
import * as _ from 'underscore'

interface Props {
  module: string
  history: History
  route: {
    routes: any[]
    [key: string]: any
  }
}

export default class extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      admin: store.getState().admin
    }
  }
  state: any
  render() {
    const { info } = this.state.admin
    return (
      !!info && (
        <Menu theme="dark" mode="horizontal" selectedKeys={[this.props.module]} onClick={this.menuClick.bind(this)} style={{ lineHeight: '64px' }}>
          {this.props.route.routes
            .filter((route) => {
              if (!!route.name) {
                return route.right === 8
                  ? !info.issuper && info.modules.indexOf(route.right) !== -1
                  : info.modules.indexOf(route.right) !== -1 || info.issuper
              } else {
                return false
              }
            })
            .map((item) => {
              return (
                <Menu.Item key={item.module} link={item.link}>
                  {item.title}
                </Menu.Item>
              )
            })}
        </Menu>
      )
    )
  }
  menuClick(param: ClickParam) {
    let nowUrl = decodeURI(window.location.hash)
    if (!nowUrl.match(param.item.props.link)) {
      this.props.history.push(`${param.item.props.link}`)
    }
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        admin: store.getState().admin
      })
    })
  }
  componentWillUnmount() {
    //清空列表store
    this.setState = () => {
      return false
    }
  }
}
