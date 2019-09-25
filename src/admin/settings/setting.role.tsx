import EventPlus from '@/common/event'
import RightService from '@/services/right'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import { Button, Col, Input, Layout, Popconfirm, Row } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ItemForm from './setting.role.item'

//antd组件
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'roleid',
    checkbox: true,
    width: 40
  },
  {
    field: 'title',
    title: '角色名称',
    width: 150,
    formatter: function(item: any) {
      return item.title
    }
  },
  {
    field: 'content',
    title: '角色描述',
    formatter: function(item: any) {
      return item.content
    }
  },
  {
    field: 'right',
    title: '权限',
    formatter: function(item: any) {
      let obj = {
        '1': '商品',
        '2': '会员',
        '3': '订单',
        '4': '内容',
        '5': '统计',
        '6': '设置',
        '7': '工具',
        '8': '供应商'
      }
      let str: any = item.right.map((v: any, i: number) => {
        return obj[v] + '、'
      })
      return <div>{str}</div>
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
                key: item.roleid + 'edit',
                title: item.title,
                type: 'edit',
                item: item,
                module: 'setting',
                formCom: ItemForm,
                service: RightService.updateRole,
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
                RightService.deleteRole([item.roleid]).then((res: any) => {
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
                              module: 'user',
                              formCom: ItemForm,
                              service: RightService.addRole,
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
    RightService.listRoles({ pageIndex: 1, pageSize: 10000 }).then((res: any) => {
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
