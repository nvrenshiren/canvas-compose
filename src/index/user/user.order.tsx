import { Button, message, Popconfirm, Select, Table } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Common from '@/common/common'
import CommentService from '@/services/comment'
import OrderService from '@/services/order'
import ModalForm from '@/util/modal/modal.form'
import CommentForm from './user.order.comment.form'
import ScoreService from '@/services/score'

const Option = Select.Option
const ButtonGroup = Button.Group

export default class extends React.Component {
  columns = [
    {
      field: 'reciept',
      key: 'reciept',
      title: 'reciept',
      render: function(item: any) {
        return <div>{item.order.reciept}</div>
      }
    },
    {
      field: 'ctime',
      key: 'ctime',
      title: 'create time',
      render: function(item: any) {
        return <div>{Common.dateTime(item.orderItems[0].ctime)}</div>
      }
    },
    {
      field: 'goodsTotal',
      key: 'goodsTotal',
      title: 'Total',
      render: function(item: any) {
        return <div>{`$ ${item.order.goodsTotal}`}</div>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (item: any) => {
        return (
          <ButtonGroup size="small" key={item.pid + 'oper'}>
            {Common.getOption(false, item.order).pay && (
              <Button href={`#/user/paylink/${item.order.oid}`} target="_blank">
                payment
              </Button>
            )}
            {Common.getOption(false, item.order).cancel && (
              <Button>
                <Popconfirm
                  title="Confirm cancellation of order?"
                  onConfirm={() => {
                    OrderService.rejectOrder({ oids: [item.order.oid] }).then(
                      (res: any) => {
                        if (res.stat === 'OK') {
                          this.getData()
                        }
                      }
                    )
                  }}
                >
                  <div>cancel</div>
                </Popconfirm>
              </Button>
            )}
            {Common.getOption(false, item.order).get && (
              <Button>
                <Popconfirm
                  title="Confirm receipt of goods?"
                  onConfirm={() => {
                    OrderService.finishOrder({ oids: [item.order.oid] }).then(
                      (res: any) => {
                        if (res.stat === 'OK') {
                          this.getData()
                        }
                      }
                    )
                  }}
                >
                  <div>Confirm</div>
                </Popconfirm>
              </Button>
            )}
          </ButtonGroup>
        )
      }
    }
  ]
  expandedRowRender(row: any) {
    const column = [
      {
        field: 'name',
        key: 'name',
        title: 'name',
        render: function(item: any) {
          return <div>{item.name}</div>
        }
      },
      {
        field: 'sizeName',
        key: 'sizeName',
        title: 'sizeName',
        render: function(item: any) {
          return <div>{item.sizeName}</div>
        }
      },
      {
        field: 'dstids',
        key: 'dstids',
        title: 'product',
        render: function(item: any) {
          let str = item.dstids.map((v: any, i: number) => {
            return (
              <div
                key={v + 'cx'}
                style={{
                  width: '30px',
                  height: '30px',
                  overflow: 'hidden',
                  float: 'left'
                }}
              >
                <img src={'/api/transfer/thumbs/' + v + '?w=30&h=30'} />
              </div>
            )
          })
          return str
        }
      },
      {
        field: 'Action',
        title: 'Action',
        key: 'operation',
        render: (item: any) => {
          return (
            <div>
              {Common.getOption(false, row.order).comment && (
                <ButtonGroup size="small" key={item.pid + 'oper'}>
                  <Button
                    onClick={() => {
                      ModalForm.open({
                        key: 'co-edit',
                        title: 'Comment',
                        type: 'add',
                        item: item,
                        width: 800,
                        module: 'user',
                        formCom: CommentForm,
                        service: this.addComment,
                        callback: () => {
                          message.success('评论成功')
                          this.getData()
                        }
                      })
                    }}
                  >
                    <div>Comment</div>
                  </Button>
                </ButtonGroup>
              )}
            </div>
          )
        }
      }
    ]
    return (
      <Table
        rowKey={(record: any) => `order-${record.oid}-${record.otid}`}
        columns={column}
        dataSource={row.orderItems}
        pagination={false}
      />
    )
  }
  addComment(values: any) {
    return new Promise(async (resolve, reject) => {
      const comment = await CommentService.addComment({
        otid: values.item.otid,
        content: values.content,
        pics: values.share ? values.item.dstids : []
      })
      const rate = await ScoreService.addScore(
        values.item.pid,
        values.rate,
        values.item.goods.dgid
      )
      resolve({
        stat: 'OK'
      })
      if (comment.stat === 'OK' && rate.stat === 'OK') {
      }
    })
  }
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
    isfinish: false,
    startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 30,
    endTime: new Date().getTime(),
    type: 0
  }
  render() {
    return (
      <div className="main">
        <div className="toolbar">
          <Select
            defaultValue={1}
            style={{ width: 180 }}
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
            style={{ width: 180 }}
            onChange={(val: number) => {
              this.form.type = val
              this.getData()
            }}
          >
            <Option value={0}>All</Option>
            <Option value={1}>Wait to Pay</Option>
            <Option value={2}>Wait for Delivery</Option>
            <Option value={3}>Shipped</Option>
            {/* <Option value={4}>Complete</Option> */}
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
          rowKey={(record: any) => `order-${record.order.oid}`}
          columns={this.columns}
          expandedRowRender={(record) => this.expandedRowRender(record)}
          loading={this.state.loading}
          dataSource={this.state.listRows}
        />
      </div>
    )
  }
  getData() {
    this.setState({
      loading: true
    })
    let data: any = {
      pageIndex: 1,
      pageSize: 10000
    }
    if (this.form.startTime > 0) {
      data.startTime = this.form.startTime
      data.endTime = this.form.endTime
    }
    data.type = this.form.type
    OrderService.listOrderByUser(data).then((res) => {
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
