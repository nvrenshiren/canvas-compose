import { Card, Popover, Select, Table } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Common from '@/common/common'
import EventPlus from '@/common/event'
import AftersoldService from '@/services/aftersold'
import ModalForm from '@/util/modal/modal.form'
import ItemForm from './user.refund.form'

const Option = Select.Option

export default class extends React.Component {
  columns = [
    {
      field: 'name',
      key: 'name',
      title: 'name',
      render: function(item: any) {
        return <div>{item.name}</div>
      }
    },
    {
      field: 'size',
      key: 'size',
      title: 'size',
      render: function(item: any) {
        return <div>{item.sizeName}</div>
      }
    },
    {
      field: 'value',
      key: 'value',
      title: 'product',
      render: function(item: any) {
        return item.dstids.map((v: any, i: number) => {
          return (
            <Popover
              key={v + i}
              content={
                <img src={'/api/transfer/thumbs/' + v + '?w=300&h=300'} />
              }
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  overflow: 'hidden',
                  float: 'left',
                  marginLeft: '5px'
                }}
              >
                <img src={'/api/transfer/thumbs/' + v + '?w=50&h=50'} />
              </div>
            </Popover>
          )
        })
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (item: any) => {
        let self = this
        return (
          <a
            href="javascript:;"
            onClick={() => {
              ModalForm.open({
                key: item.oid + 'edit',
                title: 'apply',
                type: 'edit',
                item: Object.assign(self.state.order.order, {
                  otid: item.otid
                }),
                module: 'order',
                formCom: ItemForm,
                service: AftersoldService.add,
                callback: () => {
                  EventPlus.emit('listRefresh')
                }
              })
            }}
          >
            apply for
          </a>
        )
      }
    }
  ]
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: any
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      order: {},
      listRows: [],
      loading: true
    }
  }
  form: any = {
    isfinish: false,
    startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 30,
    endTime: new Date().getTime()
  }
  render() {
    let order = this.state.order
    console.log(order)
    let str = null
    if (order.order) {
      str = (
        <>
          <Card title="Order detail">
            Name: {order.name}
            <br />
            Order Number: {order.order.reciept}
            <br />
            Order Status: {order.order.status == 2 ? 'complete' : '-'}
          </Card>
          <br />
          <Card title="Receiving information">
            contact number：
            {order.order.phone}
            <br />
            direction：
            {order.order.country} - {order.order.province} -{' '}
            {order.order.address}
            <br />
          </Card>
          <br />
          <Card title="Orderdetail">
            Order create time：
            {Common.dateTime(order.order.ctime)}
            <br />
            isdelivery: {order.order.isdelivery === true ? 'sended' : 'no send'}
          </Card>
        </>
      )
    }
    return (
      <div className="main">
        {str}
        <br />
        <Table
          rowKey={(record) => JSON.stringify(record)}
          columns={this.columns}
          dataSource={this.state.listRows}
        />
      </div>
    )
  }
  getData() {
    let data: any = {
      pageIndex: 1,
      pageSize: 10000
    }
    data.isfinish = this.form.isfinish
    AftersoldService.listByUser(data).then((res) => {
      let rows = res.rows[0].order.orderItems
      let order = Object.assign(res.rows[0].order.order, {
        amount: res.rows[0].amount
      })
      this.setState({
        order: res.rows[0].order,
        listRows: rows,
        loading: false
      })
    })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUnmount() {}
}
