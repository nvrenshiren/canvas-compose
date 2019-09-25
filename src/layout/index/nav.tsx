import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import store from '@/store/store'
import { CatItem, NavItem } from '@/interfaces/mode'
import { Col, Dropdown, Input, Menu, Row } from 'antd'
import Link from 'umi/link'

const Search = Input.Search
export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )

    let { navs, cats } = store.getState()
    this.state = {
      navs: navs,
      cats: cats
    }
  }
  state: {
    navs: NavItem[]
    cats: CatItem[]
  }
  render() {
    return (
      <div className="index-nav-warp main">
        <Row type="flex" justify="space-between" className="index-nav-logo">
          <Col className="logo" span={3}>
            <Link to="/index">
              <div style={{ width: '100%', height: '100%' }} />
            </Link>
          </Col>
          <Col span={6}>
            <Search
              placeholder="Search for products"
              onSearch={(value) => console.log(value)}
              size="large"
            />
          </Col>
        </Row>
        <Row className="index-nav-items" gutter={20} type="flex">
          <Col className="nav-item">
            <Dropdown
              overlay={
                <Menu>
                  {this.state.cats.map((cat) => {
                    return (
                      <Menu.Item key={cat.catid + '-cat'}>
                        <Link
                          className="index-nav-item"
                          to={`/product/list/${cat.catid}/0`}
                        >
                          {cat.name}
                        </Link>
                      </Menu.Item>
                    )
                  })}
                </Menu>
              }
            >
              <Link className="index-nav-item" to={`/product/list/7/0`}>
                Creat
              </Link>
            </Dropdown>
          </Col>
          {this.state.navs.map((nav) => {
            return (
              <Col className="nav-item" key={nav.nid + '-nav'}>
                <Link className="index-nav-item" to={nav.url}>
                  {nav.name}
                </Link>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
