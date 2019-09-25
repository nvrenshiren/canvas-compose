import EventPlus from '@/common/event'
import AftersoldService from '@/services/aftersold'
import OrderService from '@/services/order'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import { Button, Col, Input, Layout, Popconfirm, Popover, Row, Select } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AftersaleForm from './order.aftersale.form'

// antd组件
const Option = Select.Option
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
// 表格列
const Columns = [
  {
    field: 'did',
    checkbox: true,
    width: 40
  },
  {
    field: 'reciept',
    title: '订单号',
    formatter: (item: any) => {
      let str = '未完成'
      if (item.isfinish === true) {
        str = '完成'
      }
      return (
        <div>
          {item.reciept}（{str}）
        </div>
      )
    }
  },
  {
    field: 'name',
    title: '商品',
    formatter: (item: any) => {
      return (
        <Row type="flex" justify="space-around">
          <Popover content={<img src={'/api/transfer/thumbs/' + item.order.orderItems[0].pic + '?w=300&h=300'} />}>
            <div style={{ float: 'left', width: '30px', height: '30px', overflow: 'hidden' }}>
              <img height={30} src={'/api/transfer/thumbs/' + item.order.orderItems[0].pic + '?w=30&h=30'} />
            </div>
            {item.name}
          </Popover>
          &nbsp;
        </Row>
      )
    }
  },
  {
    field: 'type',
    title: '期望',
    width: 100,
    formatter: (item: any) => {
      let str = ''
      if (item.type === 1) {
        str = '换货'
      }
      if (item.type === 2) {
        str = '退货'
      }
      return <div>{str}</div>
    }
  },
  {
    field: 'question',
    title: '问题',
    width: 100,
    formatter: (item: any) => {
      return <div title={item.content}>{item.content}</div>
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
                key: item.oid + 'edit',
                title: item.name,
                type: 'edit',
                item: item,
                module: 'order',
                formCom: AftersaleForm,
                service: OrderService.updateDelivery,
                footer: false,
                callback: () => {
                  EventPlus.emit('listRefresh')
                }
              })
            }}
          >
            <div>查看</div>
          </Button>
          {!item.isfinish && (
            <Button>
              <Popconfirm
                title={'确认完成?'}
                onConfirm={() => {
                  AftersoldService.setFinish([item.asid]).then((res: any) => {
                    if (res.stat === 'OK') {
                      EventPlus.emit('listRefresh')
                    }
                  })
                }}
              >
                <div>完成</div>
              </Popconfirm>
            </Button>
          )}
          <Button>
            <Popconfirm
              title={'确认删除?'}
              onConfirm={() => {
                AftersoldService.deleteByAdmin([item.asid]).then((res: any) => {
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
  form: any = {
    isfinish: false,
    startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 30,
    endTime: new Date().getTime()
  }
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
                            EventPlus.emit('listRefresh')
                          }}
                        >
                          刷新
                        </Button>
                      </Col>
                      <Col className="oper-item">
                        <Select
                          defaultValue={1}
                          style={{ width: 120 }}
                          onChange={(val: number) => {
                            if (val === 1) {
                              this.form.startTime = new Date().getTime() - 1000 * 60 * 60 * 24 * 30
                              this.form.endTime = new Date().getTime()
                            } else {
                              this.form.startTime = 0
                              this.form.endTime = 0
                            }
                            this.getData()
                          }}
                        >
                          <Option value={1}>一个月内</Option>
                          <Option value={2}>更早</Option>
                        </Select>
                      </Col>
                      <Col className="oper-item">
                        <Select
                          defaultValue={0}
                          style={{ width: 120 }}
                          onChange={(val: number) => {
                            if (val === 0) {
                              this.form.isfinish = false
                            } else {
                              this.form.isfinish = true
                            }
                            this.getData()
                          }}
                        >
                          <Option value={0}>未完成</Option>
                          <Option value={1}>完成</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col className="modules-head-oper-item" xl={{ span: 8 }}>
              <div className="search-box">
                <Row gutter={10} type="flex" justify="end">
                  <Col style={{ flex: 'auto' }} className="oper-item">
                    <Search placeholder="请输入关键字" className="search-input" onSearch={(value) => console.log(value)} />
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
    let par = Object.assign({ pageIndex: pageIndex, pageSize: pageSize }, this.form)
    AftersoldService.listByAdmin(par).then((res: any) => {
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
