import { Button, Col, Input, Layout, Popconfirm, Row, Select } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '@/common/event'
import SubscribeService from '@/services/subscribe'
import Common from '@/common/common'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import ItemForm from './user.sendbox.form'
import Moment from 'moment'

//antd组件
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'mmid',
    checkbox: true,
    width: 40
  },
  {
    field: 'title',
    title: 'title',
    formatter: function(item: any) {
      return item.title
    }
  },
  {
    field: 'hasmember',
    title: '是否会员发送',
    formatter: function(item: any) {
      let str = '否'
      if (item.hasmember === true) {
        str= '是'
      }
      return str
    }
  },
  {
    field: 'hassubscribe',
    title: '是否订阅用户发送',
    formatter: function(item: any) {
      let str = '否'
      if (item.hassubscribe === true) {
        str= '是'
      }
      return str
    }
  },
  {
    field: 'issend',
    title: '是否已经发送',
    formatter: function(item: any) {
      let str = '否'
      if (item.hasmember === true) {
        str= '是'
      }
      return str
    }
  },
  {
    field: 'sendName',
    title: '管理员名称',
    formatter: function(item: any) {
      return item.sendName
    }
  },
  {
    field: 'ctime',
    title: '时间',
    formatter: function(item: any) {
      return Common.dateTime(item.ctime)
    }
  },
  {
    field: 'pid-oper',
    title: '操作',
    width: 200,
    formatter: function(item: any) {
      return (
        <ButtonGroup size="small" key={item.pid + 'oper'}>
          <Button>
            <Popconfirm
              title={'确认删除?'}
              onConfirm={() => {
                SubscribeService.deleteMassMails([item.mmid]).then((res: any) => {
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
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  state: State
  render() {
    return (
      <Layout className="full modules">
        <div className="fs-modules-head modules-head">
          <Row
            type="flex"
            justify="space-between"
            className="modules-head-oper"
          >
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
  getData(
    pageIndex: number = 1,
    pageSize: number = 20,
    pagination: boolean = true
  ) {
    this.setState({
      isLoading: true
    })
    SubscribeService.getMassMails({ pageIndex: pageIndex, pageSize: pageSize }).then(
      (res: any) => {
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
      }
    )
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
