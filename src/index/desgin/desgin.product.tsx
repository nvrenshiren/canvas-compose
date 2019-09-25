import * as React from 'react'
import Common from '@/common/common'
import DesginServer from '@/services/desgin'
import FavoriteService from '@/services/favorite'
import Grid from '@/util/grid/grid'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import router from 'umi/router'
import store from '@/store/store'
import { Avatar, Card, Carousel, Col, Icon, Input, message, Row } from 'antd'
import { DesginInfo, UserInfo } from '@/interfaces/mode'
import { RouteComponentProps } from 'react-router'
import './desgin.product.less'

interface State {
  isLoading: boolean
  userinfo?: UserInfo
  keyword?: string
}
const { Meta } = Card
const Search = Input.Search

const Columns = [
  {
    field: 'name',
    grid: true,
    formatter: (item: DesginInfo) => {
      return (
        <Card
          bodyStyle={{ padding: 10, height: 66 }}
          hoverable
          style={{ width: 256 }}
          cover={
            <Carousel>
              {item.dstids.map((pic, index) => {
                return (
                  <img
                    key={`user-desgin-pic-${item.dgid}-${index}`}
                    src={Common.getThumb(pic, 256, 256)}
                    width="256"
                  />
                )
              })}
            </Carousel>
          }
          actions={[
            <Icon
              type="link"
              onClick={() => {
                router.push(`/desgin/product/info/${item.did}/${item.dgid}`)
              }}
            />,
            <Icon
              type="heart-o"
              onClick={(e) => {
                e.stopPropagation()
                if (Common.isLogin()) {
                  FavoriteService.addFavorite(item.pid, item.dgid).then(
                    (res: any) => {
                      if (res.stat === 'OK') {
                        message.success('add Favorite Success!')
                      } else {
                        message.warning('add Favorite faile!')
                      }
                    }
                  )
                } else {
                  message.warning('Please Login and use again!')
                }
              }}
            />
          ]}
        >
          <Meta
            title={
              <Row type="flex" justify="space-between">
                <Col>{item.name}</Col>
              </Row>
            }
            description={item.notice}
          />
        </Card>
      )
    }
  }
]

export default class extends React.Component<RouteComponentProps<any>> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      isLoading: true,
      keyword: ''
    }
  }
  state: State
  render() {
    return (
      <div className="desgin-product-box">
        <div className="head-bg" />
        <div className="desgin-product-main main">
          {this.state.userinfo && (
            <Row className="desgin-user" type="flex" gutter={20}>
              <Col>
                <Avatar
                  src={Common.getThumb(this.state.userinfo.pic, 100, 100)}
                  size={100}
                  icon="user"
                />
              </Col>
              <Col>
                <h1>
                  {this.state.userinfo.nickname || this.state.userinfo.name}
                </h1>
                <a>About Him or Her</a>
              </Col>
            </Row>
          )}
          <Row
            type="flex"
            justify="space-between"
            className="oh"
            gutter={20}
            style={{ marginTop: 20 }}
          >
            <Col span={6} className="desgin-user-about">
              {this.state.userinfo && (
                <Card
                  title="About"
                  hoverable
                  style={{ width: '100%' }}
                  actions={[
                    <Icon type="phone" />,
                    <Icon type="mail" />,
                    <Icon type="info-circle-o" />
                  ]}
                  cover={
                    this.state.userinfo.designerInfo.pic ? (
                      <img
                        src={Common.getThumb(
                          this.state.userinfo.designerInfo.pic,
                          300,
                          300
                        )}
                        width="100%"
                      />
                    ) : (
                      <div className="full">
                        <Row
                          type="flex"
                          justify="center"
                          align="middle"
                          className="full"
                          style={{ background: '#ccc' }}
                        >
                          <Col>
                            <Icon
                              type="picture"
                              style={{ fontSize: 100, color: '#f8f8f8' }}
                            />
                          </Col>
                        </Row>
                      </div>
                    )
                  }
                >
                  <Meta description={this.state.userinfo.digest || '.....'} />
                </Card>
              )}
            </Col>
            <Col span={18}>
              <Row className="desgin-product-search">
                <Col>
                  <Search
                    size="large"
                    addonBefore="Artworks"
                    placeholder="Input Search Name"
                    onSearch={(value) => {
                      this.setState({
                        keyword: value
                      })
                    }}
                    enterButton
                  />
                </Col>
              </Row>
              <div
                className="desgin-product-list-box auto-height"
                id="list-scroll"
                style={{ marginTop: 20 }}
              >
                <Grid
                  columns={Columns}
                  modules="user"
                  getdata={this.getData.bind(this)}
                  event={this.itemEvent.bind(this)}
                  rowHeight={540}
                  columnWidth={298}
                  pagination={true}
                  isLoading={this.state.isLoading}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  itemEvent() {}
  componentDidUpdate(prevProp: RouteComponentProps<any>, prevState: State) {
    if (
      this.props.match.params.did !== prevProp.match.params.did ||
      prevState.keyword !== this.state.keyword
    ) {
      document.getElementById('list-scroll').scrollTop = 0
      this.getData()
    }
  }

  getData(
    pageIndex: number = 1,
    pageSize: number = 20,
    pagination: boolean = true
  ) {
    this.setState({
      isLoading: true
    })
    DesginServer.listGoods({
      did: this.props.match.params.did * 1,
      type: 2,
      name: this.state.keyword,
      pageIndex: pageIndex,
      pageSize: pageSize
    }).then((res: any) => {
      store.dispatch({
        type: 'LIST_ADD',
        list: {
          items: res.rows,
          total: res.total,
          pageIndex: pageIndex,
          pageSize: pageSize,
          pagination: pagination
        }
      })
      this.setState({
        isLoading: false
      })
    })
  }
  componentDidMount() {
    DesginServer.getDesigner(this.props.match.params.did * 1).then(
      (res: any) => {
        this.setState({
          userinfo: res.user
        })
        this.getData()
      }
    )
  }
  componentWillUnmount() {}
}
