import { Button, Col, Input, Layout, Popconfirm, Row, Select } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '@/common/event'
import RightService from '@/services/right'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import ItemForm from './setting.admin.item'
import Moment from 'moment'
import * as _ from 'underscore'

//antd组件
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'said',
    checkbox: true,
    width: 40
  },
  {
    field: 'name',
    title: '账号',
    width: 150,
    formatter: function(item: any) {
      return item.name
    }
  },
  {
    field: '昵称',
    title: 'nickname',
    formatter: function(item: any) {
      return item.nickname
    }
  },
  {
    field: 'dept',
    title: '部门',
    formatter: function(item: any) {
      return item.dept
    }
  },
  {
    field: 'isspuer',
    title: '是否超管',
    formatter: function(item: any) {
      let str = '否'
      if(item.issuper === true) {
        str = '是'
      }
      return str
    }
  },
  {
    field: 'right',
    title: '角色',
    formatter: function(item: any) {
      let str = _.pluck(item.right, 'title').join('、')
      return (<div>{str}</div>)
    }
  },
  {
    field: 'email',
    title: 'email',
    formatter: function(item: any) {
      return item.email
    }
  },
  {
    field: 'remark',
    title: '备注',
    formatter: function(item: any) {
      return item.remark
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
                key: item.said + 'edit',
                title: item.name,
                type: 'edit',
                item: item,
                module: 'setting',
                formCom: ItemForm,
                service: RightService.updateServerAdmin,
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
                RightService.deleteAdmins([item.said]).then((res: any) => {
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
                              title: '添加',
                              type: 'add',
                              module: 'setting',
                              formCom: ItemForm,
                              service: RightService.addServerAdmin,
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
              
            </Col>
          </Row>
        </div>
        <Content className="modules-content">
          <List
            ref="list"
            modules="setting"
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
    RightService.listServerAdmin({ pageIndex: 1, pageSize: 10000 }).then((res: any) => {
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
