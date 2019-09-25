import { Button, Col, Input, Layout, Popconfirm, Row, Select } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '@/common/event'
import UserService from '@/services/user'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import UserForm from './user.list.form'
import Moment from 'moment'

//antd组件
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'uid',
    checkbox: true,
    width: 40
  },
  {
    field: 'name',
    title: '用户名',
    width: 150,
    formatter: function(item: any) {
      return item.name
    }
  },
  {
    field: 'nickname',
    title: '昵称',
    formatter: function(item: any) {
      return item.nickname
    }
  },
  {
    field: 'exattr',
    title: '注册时间',
    formatter: function(item: any) {
      return Moment(item.exattr * 1).format('YYYY年MM月DD日')
    }
  },
  {
    field: 'recentTime',
    title: '最近登录',
    formatter: function(item: any) {
      return item.recentTime
        ? Moment(item.recentTime * 1).format('YYYY年MM月DD日')
        : '----'
    }
  },
  {
    field: 'designer',
    title: '是否设计师',
    formatter: function(item: any) {
      return item.designer ? '是' : '否'
    }
  },
  {
    field: 'designerInfo',
    title: '设计师申请状态',
    formatter: function(item: any) {
      return item.designerInfo
        ? item.designerInfo.type === 1
          ? '正在申请'
          : '通过'
        : '未申请'
    }
  },
  {
    field: 'status',
    title: '状态',
    width: 100,
    formatter: function(item: any) {
      return <div>{item.status ? '已激活' : '未激活'}</div>
    }
  },
  {
    field: 'pid-oper',
    title: '操作',
    width: 200,
    formatter: function(item: any) {
      return (
        <ButtonGroup size="small" key={item.pid + 'oper'}>
          <Button
            onClick={() => {
              ModalForm.open({
                key: item.pid + 'edit',
                title: item.name,
                type: 'edit',
                item: item,
                module: 'product',
                formCom: UserForm,
                service: UserService.updateUserByAdmin,
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
                if (item.name === 'admin') return
                let self = this
                UserService.delUser({ uids: [item.uid] }).then((res: any) => {
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
                            ModalForm.open({
                              key: 'add',
                              title: '添加用户',
                              type: 'add',
                              module: 'user',
                              formCom: UserForm,
                              service: UserService.adminaddUser,
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
            <Col className="modules-head-oper-item" xl={{ span: 8 }}>
              <div className="search-box">
                <Row gutter={10} type="flex" justify="end">
                  <Col style={{ flex: 'auto' }} className="oper-item">
                    <Search
                      placeholder="请输入关键字"
                      className="search-input"
                      onSearch={(value) => console.log(value)}
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
    UserService.listUser({ pageIndex: pageIndex, pageSize: pageSize }).then((res: any) => {
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
