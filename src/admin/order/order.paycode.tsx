import EventPlus from '@/common/event'
import CouponService from '@/services/coupon'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import { Button, Col, Layout, Popconfirm, Row } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ItemForm from './order.paycode.form'
//antd组件
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'couid',
    checkbox: true,
    width: 40
  },
  {
    field: 'code',
    title: '优惠券码',
    formatter: (item: any) => {
      return <div>{item.code}</div>
    }
  },
  {
    field: 'discount',
    title: '折扣',
    width: 150,
    formatter: (item: any) => {
      return <div>{item.discount}</div>
    }
  },
  {
    field: 'type',
    title: '折扣类型',
    width: 150,
    formatter: (item: any) => {
      return <div>{item.type === 1 ? '打折' : '减免'}</div>
    }
  },
  {
    field: 'isused',
    title: '是否被使用',
    width: 100,
    formatter: (item: any) => {
      return <div>{item.isused ? '已使用' : '未使用'}</div>
    }
  },
  {
    field: 'tid-oper',
    title: '操作',
    width: 200,
    formatter: (item: any) => {
      return (
        <ButtonGroup size="small" key={item.pid + 'oper'}>
          <Button
            onClick={() => {
              ModalForm.open({
                key: item.pid + 'edit',
                title: '编辑优惠券',
                type: 'edit',
                item: item,
                module: 'order',
                formCom: ItemForm,
                service: CouponService.updateCoupon,
                callback: () => {
                  EventPlus.emit('listRefresh')
                }
              })
            }}
          >
            <div>编辑</div>
          </Button>
          <Button>
            <Popconfirm
              title={'确认删除?'}
              onConfirm={() => {
                CouponService.deleteCoupons({ couids: [item.couid] }).then((res: any) => {
                  if (res.stat === 'OK') {
                    EventPlus.emit('listRefresh')
                  }
                })
              }}
            >
              <div>删除</div>
            </Popconfirm>
          </Button>
        </ButtonGroup>
      )
    }
  }
]

interface State {
  isLoading: boolean
}

export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.state = {
      isLoading: true
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  state: State
  render() {
    return (
      <Layout className="full modules">
        <div className="fs-modules-head modules-head">
          <Row type="flex" justify="space-between" className="modules-head-oper">
            <Col className="modules-head-oper-item">
              <div className="toolbar-box">
                <Row gutter={10} type="flex">
                  <Col className="toolbar-box-select">
                    <Row gutter={10} type="flex">
                      <Col className="oper-item">
                        <Button
                          type="primary"
                          onClick={() => {
                            ModalForm.open({
                              key: 'add',
                              title: '添加',
                              type: 'add',
                              module: 'product',
                              formCom: ItemForm,
                              service: CouponService.addCoupon,
                              callback: () => {
                                EventPlus.emit('listRefresh')
                              }
                            })
                          }}
                        >
                          添加
                        </Button>
                      </Col>
                      <Col className="oper-item">
                        <Button
                          type="primary"
                          onClick={() => {
                            EventPlus.emit('listRefresh')
                          }}
                        >
                          刷新
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col className="modules-head-oper-item" xl={{ span: 8 }} />
          </Row>
        </div>
        <Content className="modules-content">
          <List
            ref="list"
            modules="product"
            columns={Columns}
            isLoading={this.state.isLoading}
            pagination={!!1}
            getdata={this.getData.bind(this)}
            event={this.itemEvent.bind(this)}
          />
        </Content>
      </Layout>
    )
  }
  itemEvent() {}
  getData(pageIndex: number = 1, pageSize: number = 20, pagination: boolean = true) {
    this.setState({
      isLoading: true
    })
    CouponService.listCoupons({ pageIndex: pageIndex, pageSize: pageSize }).then((res: any) => {
      if (res.stat === 'OK') {
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
      }
    })
  }
  componentDidUpdate(prevProps: any, prevState: State) {}
  componentDidMount() {
    this.getData(1, store.getState().list.pageSize)
  }
  componentWillUnmount() {
    this.setState = () => {
      return false
    }
  }
}
