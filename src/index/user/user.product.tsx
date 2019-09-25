import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import store from '@/store/store'
import Grid from '@/util/grid/grid'
import Common from '@/common/common'
import { Card, Icon, Carousel, Row, Col, Tag, Popconfirm, message } from 'antd'
import DesginService from '@/services/desgin'
import { DesginInfo } from '@/interfaces/mode'
import EventPlus from '@/common/event'
import ModalForm from '@/util/modal/modal.form'
import DesginForm from './user.product.form'

interface State {
  isLoading: boolean
}

const { Meta } = Card

const Columns = [
  {
    field: 'name',
    grid: true,
    formatter: (item: DesginInfo) => {
      return (
        <Card
          bodyStyle={{ padding: 10, height: 66 }}
          hoverable
          style={{ width: 258 }}
          cover={
            <Carousel>
              {item.dstids.map((pic, index) => {
                return (
                  <img
                    key={`user-desgin-pic-${item.dgid}-${index}`}
                    src={Common.getThumb(pic, 258, 258)}
                    width="258"
                  />
                )
              })}
            </Carousel>
          }
          actions={[
            <Popconfirm
              title="Are you sure to delete this?"
              onConfirm={() => {
                DesginService.deleteGoodsByUser([item.dgid]).then(() => {
                  EventPlus.emit('listRefresh')
                })
              }}
              okType="danger"
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" />
            </Popconfirm>,
            <Icon
              type="edit"
              onClick={() => {
                ModalForm.open({
                  key: 'desgin-edit',
                  title: 'Edit My Product',
                  type: 'edit',
                  item: item,
                  width: 400,
                  module: 'desgin',
                  formCom: DesginForm,
                  service: DesginService.updateGoodsByUser,
                  callback: () => {
                    EventPlus.emit('listRefresh')
                  }
                })
              }}
            />,
            <Icon
              type="link"
              onClick={() => {
                window.location.href = `/desgin/product/info/${item.did}/${
                  item.dgid
                }`
              }}
            />
          ]}
        >
          <Meta
            title={
              <Row type="flex" justify="space-between">
                <Col>{item.name}</Col>
                <Col>
                  {item.type === 1 ? (
                    <Tag color="#87d068">Audit</Tag>
                  ) : (
                    <Tag color="#108ee9">Adopt</Tag>
                  )}
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
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      isLoading: true
    }
  }
  state: State
  getData(
    pageIndex: number = 1,
    pageSize: number = 20,
    pagination: boolean = true
  ) {
    this.setState({
      isLoading: true
    })
    DesginService.listGoods({
      did: store.getState().user.designerInfo.did,
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
  itemEvent() {}
  render() {
    return (
      <div className="user-product-main main">
        <div className="user-product-list-items auto-height" id="list-scroll">
          <Grid
            columns={Columns}
            modules="user"
            getdata={this.getData.bind(this)}
            event={this.itemEvent.bind(this)}
            rowHeight={540}
            columnWidth={300}
            pagination={true}
            isLoading={this.state.isLoading}
          />
        </div>
      </div>
    )
  }
  componentDidMount() {
    if (store.getState().user.designerInfo) {
      this.getData()
    } else {
      message.error('You are not a designer.')
      window.location.href = '/user/info'
    }
  }
  componentWillUnmount() {}
}
