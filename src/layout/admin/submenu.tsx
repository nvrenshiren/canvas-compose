import { Icon, Menu } from 'antd'
import { History } from 'history'
import * as React from 'react'
import _ from 'underscore'

interface RouteConfig {
  routes: any[]
  [key: string]: any
}

interface Props {
  module: string
  history: History
  route: RouteConfig
}

const { SubMenu } = Menu

export default class extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {}
  render() {
    const childRoute = this.props.route.routes.filter((route) => {
      return route.module === this.props.module
    })[0] as RouteConfig
    const groupRoute = _.groupBy(
      childRoute.routes.filter((route) => {
        return !!route.name && !route.ishidden
      }),
      'group'
    )

    return (
      <Menu className="index-menu-box" selectedKeys={[this.props.history.location.pathname]} defaultOpenKeys={['index-menu']} mode="inline">
        <SubMenu key="index-menu">
          {Object.keys(groupRoute).map((key) => {
            return (
              <Menu.ItemGroup key={key} title={groupRoute[key][0].gname}>
                {groupRoute[key].map((route) => {
                  return (
                    <Menu.Item key={route.link}>
                      <a className="index-menu-item" onClick={() => this.menuClick(route)}>
                        <Icon type={route.icon} />
                        {route.title}
                      </a>
                    </Menu.Item>
                  )
                })}
              </Menu.ItemGroup>
            )
          })}
        </SubMenu>
      </Menu>
    )
  }
  menuClick(route: any) {
    let nowUrl = decodeURI(window.location.hash)
    this.props.history[nowUrl.match(route.link) ? 'replace' : 'push'](`${route.link}`)
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
