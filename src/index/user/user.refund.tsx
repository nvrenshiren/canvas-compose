import { Button, Popover, Select, Table } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AftersoldService from '@/services/aftersold'

const Option = Select.Option

const columns = [
  {
    field: 'reciept',
    key: 'reciept',
    title: 'reciept',
    render: function(item: any) {
      return <div>{item.reciept}</div>
    }
  },
  {
    field: 'name',
    key: 'name',
    title: 'name',
    render: function(item: any) {
      return <div>{item.name}</div>
    }
  },
  {
    field: 'value',
    key: 'value',
    title: 'product',
    render: function(item: any) {
      if (item.order.orderItems.length > 0 && item.order.orderItems[0].pic) {
        let src =
          '/api/transfer/thumbs/' + item.order.orderItems[0].pic + '?w=30&h=30'
        return (
          <Popover
            content={
              <img
                src={
                  '/api/transfer/thumbs/' +
                  item.order.orderItems[0].pic +
                  '?w=300&h=300'
                }
              />
            }
          >
            <div style={{ width: '30px', height: '30px', overflow: 'hidden' }}>
              <img src={src} />
            </div>
          </Popover>
        )
      } else {
        return <div />
      }
    }
  },
  {
    field: 'isfinish',
    key: 'isfinish',
    title: 'status',
    render: function(item: any) {
      return <div>{item.isfinish === true ? 'completed' : 'processing'}</div>
    }
  }
]
export default class extends React.Component {
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
      listRows: [],
      loading: true
    }
  }
  form: any = {
    isfinish: null,
    startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 30,
    endTime: new Date().getTime()
  }
  render() {
    return (
      <div className="main">
        <div className="toolbar">
          <Select
            defaultValue={1}
            style={{ width: 120 }}
            onChange={(val: number) => {
              if (val === 1) {
                this.form.startTime =
                  new Date().getTime() - 1000 * 60 * 60 * 24 * 30
                this.form.endTime = new Date().getTime()
              } else {
                this.form.startTime = 0
                this.form.endTime = 0
              }
              this.getData()
            }}
          >
            <Option value={1}>Orders for the month</Option>
            <Option value={2}>Earlier order</Option>
          </Select>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Select
            defaultValue={0}
            style={{ width: 120 }}
            onChange={(val: number) => {
              if (val === 0) {
                this.form.isfinish = null
              } else if (val === 1) {
                this.form.isfinish = true
              } else {
                this.form.isfinish = false
              }
              this.getData()
            }}
          >
            <Option value={0}>All</Option>
            <Option value={1}>Finish</Option>
            <Option value={2}>No Finish</Option>
          </Select>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => {
              this.getData()
            }}
          >
            Refresh
          </Button>
        </div>
        <br />
        <Table
          rowKey={(record) => JSON.stringify(record)}
          columns={columns}
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
    if (this.form.startTime > 0) {
      data.startTime = this.form.startTime
      data.endTime = this.form.endTime
    }
    data.isfinish = this.form.isfinish
    AftersoldService.listByUser(data).then((res) => {
      this.setState({
        listRows: res.rows,
        loading: false
      })
    })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUnmount() {}
}
