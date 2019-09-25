import * as React from 'react'
import Common from '@/common/common'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Card, Col, Row, Avatar, Icon, Input, Carousel, Popconfirm } from 'antd'
import store from '@/store/store'
import Grid from '@/util/grid/grid'
import EventPlus from '@/common/event'
import FavoriteService from '@/services/favorite'

interface State {
  isLoading: boolean
}
const { Meta } = Card
const Columns = [
  {
    field: 'name',
    grid: true,
    formatter: (item: any) => {
      return (
        <Card
          bodyStyle={{ padding: 10, height: 66 }}
          hoverable
          style={{ width: 256 }}
          cover={
            <Carousel>
              {item.favorite.type === 1 ? (
                <img
                  key={`user-desgin-pic-1-${item.favorite.fid}-0`}
                  src={Common.getThumb(item.product.thumbs, 256, 256)}
                  width="256"
                />
              ) : (
                item.designerGoods.dstids.map((pic: string, index: number) => {
                  return (
                    <img
                      key={`user-desgin-pic-2-${item.favorite.fid}-${index}`}
                      src={Common.getThumb(pic, 256, 256)}
                      width="256"
                    />
                  )
                })
              )}
            </Carousel>
          }
          actions={[
            <Popconfirm
              title="Are you sure to delete this?"
              onConfirm={() => {
                FavoriteService.deleteFavorites([item.favorite.fid]).then(
                  () => {
                    EventPlus.emit('listRefresh')
                  }
                )
              }}
              okType="danger"
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" />
            </Popconfirm>,
            <Icon
              type="link"
              onClick={() => {
                window.location.href =
                  item.favorite.type === 1
                    ? `/product/info/${item.product.catids[0]}/${
                        item.product.pid
                      }`
                    : `/desgin/product/info/${item.designerGoods.did}/${
                        item.designerGoods.dgid
                      }`
              }}
            />
          ]}
        >
          <Meta
            title={
              <Row type="flex" justify="space-between">
                <Col>
                  {item.favorite.type === 1
                    ? item.product.name
                    : item.designerGoods.name}
                </Col>
              </Row>
            }
            description={item.notice}
          />
        </Card>
      )
    }
  }
]

export default class extends React.Component {
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
      isLoading: true
    }
  }
  render() {
    return (
      <div className="main">
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
      </div>
    )
  }
  itemEvent() {}
  checkData(data: any[]) {
    let uid = store.getState().user.uid
    let result = data
      .map((item) => {
        if (
          item.favorite.uid === uid &&
          ((item.favorite.type === 1 && item.product) ||
            (item.favorite.type === 2 && item.designerGoods))
        ) {
          return item
        }
      })
      .filter((item) => {
        return !!item
      })
    return result
  }
  getData(
    pageIndex: number = 1,
    pageSize: number = 20,
    pagination: boolean = true
  ) {
    this.setState({
      isLoading: true
    })
    FavoriteService.listFavorites({
      pageIndex: pageIndex,
      pageSize: pageSize,
      type: 0
    }).then((res) => {
      if (res.stat === 'OK') {
        store.dispatch({
          type: 'LIST_ADD',
          list: {
            items: this.checkData(res.rows),
            total: res.total,
            pageIndex: pageIndex,
            pageSize: pageSize,
            pagination: pagination
          }
        })
        this.setState({
          isLoading: false
        })
      }
    })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUnmount() {}
}
