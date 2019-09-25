import Common from '@/common/common'
import EventPlus from '@/common/event'
import OrderService from '@/services/order'
import supplier from '@/services/supplier'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import { Button, Col, DatePicker, Input, Layout, Popconfirm, Row, Select } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import OrderListForm from './order.list.form'
import OrderSelForm from './order.list.sel.form'

//antd组件
const Option = Select.Option
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
const { RangePicker } = DatePicker

interface Form {
  type: number
  oid: number
  uid: number
  startTime: number
  endTime: number
  reciept: string
  fullname: string
  pageSize?: number
  pageNumber?: number
}

interface State {
  isLoading: boolean
  searchKey: string
  form: Form
}

export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.state = {
      isLoading: true,
      searchKey: 'reciept',
      form: {
        type: 0,
        oid: null,
        uid: null,
        startTime: null,
        reciept: null,
        endTime: null,
        fullname: ''
      }
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  Columns = [
    {
      field: 'oid',
      checkbox: true,
      width: 40
    },
    {
      field: 'reciept',
      title: '订单编号',
      width: 150,
      formatter: function(item: any) {
        return <div>{item.order.reciept}</div>
      }
    },
    {
      field: 'status',
      title: '状态',
      width: 100,
      formatter: function(item: any) {
        let str = ''
        switch (item.order.status) {
          case 0:
            str = '未完成'
            break
          case 2:
            str = '完成'
            break
          case 8:
            str = '作废'
            break
        }
        return <div>{str}</div>
      }
    },
    {
      field: 'value',
      title: '商品	',
      formatter: function(item: any) {
        if (item.orderItems.length > 0 && item.orderItems[0].pic) {
          let src = '/api/transfer/thumbs/' + item.orderItems[0].pic + '?w=30&h=30'
          return (
            <div style={{ width: '30px', height: '30px', overflow: 'hidden' }}>
              <img src={src} />
            </div>
          )
        } else {
          return <div />
        }
      }
    },
    {
      field: 'total',
      title: '收货人',
      width: 100,
      formatter: function(item: any) {
        return <div>{item.order.total}</div>
      }
    },
    {
      field: 'price',
      title: '金额',
      width: 100,
      formatter: function(item: any) {
        return <div>{item.order.total}</div>
      }
    },
    {
      field: 'ctime',
      title: '下单时间',
      width: 100,
      formatter: function(item: any) {
        return <div>{Common.dateTime(item.order.ctime)}</div>
      }
    },
    {
      field: 'exattr1',
      title: '运单号',
      width: 100,
      formatter: function(item: any) {
        return item.order.exattr1 ? item.order.exattr1 : '-'
      }
    },
    {
      field: 'pid-oper',
      title: '操作',
      width: 200,
      formatter: (item: any) => {
        return (
          <ButtonGroup size="small" key={item.order.oid + 'oper'}>
            <Button
              onClick={() => {
                let service = OrderService.updateDelivery
                ModalForm.open({
                  key: item.oid + 'edit',
                  title: item.name,
                  type: 'edit',
                  item: item,
                  module: 'order',
                  formCom: OrderListForm,
                  service: service,
                  footer: false,
                  callback: () => {
                    EventPlus.emit('listRefresh')
                  }
                })
              }}
            >
              <div title="查看订单">查</div>
            </Button>
            {Common.getOption(!!1, item.order).done && (
              <Button>
                <Popconfirm
                  title={'确认完成?'}
                  onConfirm={() => {
                    OrderService.finishOrderByAdmin({
                      oids: [item.order.oid]
                    }).then((res: any) => {
                      if (res.stat === 'OK') {
                        EventPlus.emit('listRefresh')
                      }
                    })
                  }}
                >
                  <div title="完成">完</div>
                </Popconfirm>
              </Button>
            )}
            {Common.getOption(!!1, item.order).break && (
              <Button>
                <Popconfirm
                  title={'确认作废?'}
                  onConfirm={() => {
                    OrderService.rejectOrder({ oids: [item.order.oid] }).then((res: any) => {
                      if (res.stat === 'OK') {
                        EventPlus.emit('listRefresh')
                      }
                    })
                  }}
                >
                  <div title="废">废</div>
                </Popconfirm>
              </Button>
            )}
            {Common.getOption(!!1, item.order).dispatch && (
              <Button
                onClick={() => {
                  ModalForm.open({
                    key: 'sel-edit',
                    title: '添加订单到供应商',
                    type: 'add',
                    item: item.order,
                    module: 'order',
                    formCom: OrderSelForm,
                    service: supplier.addSupplier,
                    callback: () => {
                      EventPlus.emit('listRefresh')
                    }
                  })
                }}
              >
                <div title="供">供</div>
              </Button>
            )}
          </ButtonGroup>
        )
      }
    }
  ]
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
                        <Select
                          defaultValue={0}
                          onChange={(val: number) => {
                            this.state.form.type = val
                            EventPlus.emit('listRefresh')
                          }}
                        >
                          <Option value={0}>全部</Option>
                          <Option value={1}>未支付</Option>
                          <Option value={2}>待发货</Option>
                          <Option value={3}>已发货</Option>
                          <Option value={4}>已完成</Option>
                          <Option value={5}>已作废</Option>
                        </Select>
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
            <Col className="modules-head-oper-item" xl={{ span: 12 }}>
              <div className="search-box">
                <Row gutter={10} type="flex" justify="end">
                  <Col className="oper-item">
                    <RangePicker
                      onChange={(moment, dataArr) => {
                        this.state.form.startTime = new Date(dataArr[0]).getTime()
                        this.state.form.endTime = new Date(dataArr[1]).getTime()
                      }}
                    />
                  </Col>
                  <Col className="oper-item">
                    <Select
                      defaultValue="reciept"
                      onChange={(val: string) => {
                        this.state.searchKey = val
                      }}
                    >
                      <Option value="reciept">订单</Option>
                      <Option value="uid">会员</Option>
                      <Option value="fullname">收货人</Option>
                    </Select>
                  </Col>
                  <Col style={{ flex: 'auto' }} className="oper-item">
                    <Search
                      placeholder="请输入关键字"
                      className="search-input"
                      onSearch={(value) => {
                        let val: any = value
                        if (this.state.searchKey === 'reciept') {
                          val = parseInt(value)
                        }
                        ;['reciept', 'uid', 'fullname'].forEach((v, i) => {
                          this.state.form[this.state.searchKey] = val
                          if (v !== this.state.searchKey) {
                            this.state.form[v] = null
                          }
                        })
                        EventPlus.emit('listRefresh')
                      }}
                    />
                  </Col>
                  <Col>
                    <Row gutter={10} type="flex">
                      <Col className="oper-item" />
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <Content className="modules-content">
          <List
            ref="list"
            modules="product"
            columns={this.Columns}
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
  typeChange(val: number) {}
  getData(pageIndex: number = 1, pageSize: number = 20, pagination: boolean = true) {
    this.setState({
      isLoading: true
    })
    let service = OrderService.updateDelivery
    OrderService.listOrderByAdmin(Object.assign({ pageIndex: pageIndex, pageSize: pageSize }, this.state.form)).then((res: any) => {
      if (res.stat === 'OK') {
        store.dispatch({
          type: 'LIST_ADD',
          list: {
            items: res.rows,
            total: res.total,
            pageIndex: pageIndex,
            pageSize: pageSize,
            pagination: true
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
