import { Col, Form, Popover, Row, Table, Tabs } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import * as _ from 'underscore'
import Common from '@/common/common'
import AftersoldService from '@/services/aftersold'
import ModalForm from '@/util/modal/modal.form'
import ApplyForm from './user.refund.form'

const TabPane = Tabs.TabPane

interface Props {
  form: WrappedFormUtils
  pid: number
  type: string
  item?: any
}

const itemColumns = [
  {
    title: '商品',
    dataIndex: 'bgcolor',
    key: 'bgcolor',
    render: (text: any, record: any, index: any) => {
      let items = record.items
      return (
        <div>
          {items.map((v: any, i: number) => {
            return (
              <Row
                type="flex"
                justify="space-around"
                key={v + i}
                style={{ marginTop: '5px' }}
              >
                {record.name}
                &nbsp;
                <Popover
                  content={<img src={'/api/transfer/download/' + v.pic} />}
                >
                  <img src={'/api/transfer/thumbs/' + v.pic + '?w=100&h=100'} />
                </Popover>
                &nbsp;=
              </Row>
            )
          })}
        </div>
      )
    }
  },
  {
    title: '数值',
    dataIndex: 'shadow',
    key: 'shadow',
    render: (text: any, record: any, index: any) => {
      let items = record.items
      return (
        <div>
          {items.map((v: any, i: number) => {
            return (
              <Row
                type="flex"
                justify="space-around"
                key={v + i}
                style={{ marginTop: '5px' }}
              >
                <Col span={10}>
                  <Popover
                    content={<img src={'/api/transfer/download/' + v.main} />}
                  >
                    <img
                      src={'/api/transfer/thumbs/' + v.main + '?w=100&h=100'}
                    />
                  </Popover>
                  &nbsp;color: {v.bgcolor}
                  &nbsp;&nbsp;
                </Col>
                <Col span={10}>
                  <Row type="flex" justify="space-around">
                    {v.masks.map((k: any, j: any) => {
                      return (
                        <Col span={4} key={k + 'x' + j}>
                          <p>scale: {k.scale}</p>
                          <p>
                            {' '}
                            x: {k.position.x} | y: {k.position.y}
                          </p>
                          {k.flower && (
                            <Popover
                              content={
                                <img
                                  src={
                                    '/api/transfer/thumbs/' +
                                    k.flower +
                                    '?w=500&h=500'
                                  }
                                />
                              }
                            >
                              <img
                                width="35"
                                src={
                                  '/api/transfer/thumbs/' +
                                  k.flower +
                                  '?w=35&h=35'
                                }
                              />
                            </Popover>
                          )}
                        </Col>
                      )
                    })}
                  </Row>
                </Col>
              </Row>
            )
          })}
        </div>
      )
    }
  }
]

class OrderListForm extends React.Component<Props> {
  columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any, index: any) => {
        return (
          <div>
            <Popover
              content={<img src={'/api/transfer/download/' + record.pic} />}
            >
              <img
                src={'/api/transfer/thumbs/' + record.pic + '?w=100&h=100'}
              />
              &nbsp;
              {text}
            </Popover>
          </div>
        )
      }
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: '数量',
      dataIndex: 'count',
      key: 'count'
    },
    {
      title: '金额',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: 'Action',
      key: 'action',
      render: (item: any) => {
        if (this.props.item.order.status === 2) {
          return (
            <a
              href="javascript:;"
              onClick={() => {
                ModalForm.open({
                  key: item.oid + 'edit',
                  title: item.name,
                  type: 'edit',
                  item: item,
                  module: 'order',
                  formCom: ApplyForm,
                  service: AftersoldService.add,
                  callback: () => {
                    //EventPlus.emit('listRefresh')
                  }
                })
              }}
            >
              apply
            </a>
          )
        } else {
          return <div />
        }
      }
    }
  ]
  constructor(props: any) {
    super(props)
    this.state.processData = []
  }
  state: any = {}
  get orderStatus() {
    let str = ''
    switch (this.props.item.order.status) {
      case 0:
        str = '创建'
        break
      case 2:
        str = '完成'
        break
      case 8:
        str = '作废'
        break
    }
    return str
  }
  render() {
    let item = this.props.item
    let processData = this.state.processData
    return (
      <Tabs type="card">
        <TabPane tab="订单" key="1">
          <Row>
            <div>
              订单状态：
              {this.orderStatus}
            </div>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Row>
                <Col span={6}>订单编号：</Col>
                <Col span={12}>{item.order.reciept}</Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={6}>最终结算：</Col>
                <Col span={12}>$ {item.order.total}</Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Row>
                <Col span={6}>生成时间：</Col>
                <Col span={12}>{Common.dateTime(item.order.ctime)}</Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={6}>结束时间：</Col>
                <Col span={12}>08月31日 21:58</Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Row>
                <Col span={6}>商品总价：</Col>
                <Col span={12}>$ {item.order.goodsTotal}</Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={6}>配送费用：</Col>
                <Col span={12}>{item.order.postage}</Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Table
            rowKey={(record) => JSON.stringify(record)}
            dataSource={this.props.item.orderItems}
            columns={this.columns}
            pagination={false}
          />
        </TabPane>
        <TabPane tab="物流/支付" key="2">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={6}>支付方式：</Col>
                <Col span={12}>Paypal</Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={6}>支付时间：</Col>
                <Col span={12}>{Common.dateTime(item.order.ptime)}</Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Row>
                <Col span={6}>收货人：</Col>
                <Col span={12}>{item.order.fullname}</Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={6}>地址：</Col>
                <Col span={12}>
                  {item.order.country}、{item.order.province}、
                  {item.order.address}
                </Col>
              </Row>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="会员" key="3">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={6}>会员：</Col>
                <Col span={12}>{item.order.fullname}</Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={6}>会员编号：</Col>
                <Col span={12}>{item.order.uid}</Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <Row>
                <Col span={6}>手机：</Col>
                <Col span={12}>{item.order.phone}</Col>
              </Row>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="衣服加工数值" key="4">
          <br />
          <Table
            rowKey="key"
            dataSource={processData}
            columns={itemColumns}
            pagination={false}
          />
        </TabPane>
      </Tabs>
    )
  }
  componentWillMount() {}
  componentDidMount() {
    let item = this.props.item
    let processData: any[] = []
    item.orderItems.forEach((v: any, i: any) => {
      if (v.processData) {
        let tmp = _.values(v.processData)
        if (tmp.length > 0) {
          tmp['key'] = i
          v.dstids.forEach((k: any, j: any) => {
            tmp[j]['pic'] = k
          })
          let tmps = {
            items: tmp,
            key: i,
            name: v.name
          }
          processData.push(tmps)
        }
      }
    })
    this.setState({
      processData: processData
    })
  }
  componentWillUpdate() {}
}
export default Form.create<Props>({})(OrderListForm)
