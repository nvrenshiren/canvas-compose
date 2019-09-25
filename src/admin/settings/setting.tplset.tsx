import { Button, Col, Input, Layout, Popconfirm, Row, Select } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '@/common/event'
import sysmsgService from '@/services/sysmsg'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import ItemForm from './setting.tplset.form'
import common from '@/common/common'
// antd组件
const Option = Select.Option
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
// 表格列
const Columns = [
  {
    field: 'id',
    checkbox: true,
    width: 40
  },
  {
    field: 'type',
    title: '名称',
    formatter: (item: any) => {
      let str = ''
      switch (item.type) {
        case 'sysmsgordercreate':
          str = '订单创建'
          break
        case 'sysmsgorderpay':
          str = '订单支付'
          break
        case 'sysmsgorderdelivery':
          str = '订单发货'
          break
        case 'sysmsgorderclose':
          str = '订单关闭'
          break
        case 'sysmsgbecomedesigner':
          str = '成为设计师'
          break
        case 'sysmsguserforgetpwd':
          str = '忘记密码'
          break
        default:
          //sysmsguserregister
          str = '用户注册'
      }
      return <div>{str}</div>
    }
  },
  {
    field: 'openEmail',
    title: '是否开启',
    width: 150,
    formatter: (item: any) => {
      let str = '否'
      if (item.openEmail === true) {
        str = '是'
      }
      return <div>{str}</div>
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
                key: item.type + 'edit',
                title: '编辑',
                type: 'edit',
                item: item,
                module: 'statistics',
                formCom: ItemForm,
                service: sysmsgService.updateMessageTemplet,
                callback: () => {
                  EventPlus.emit('listRefresh')
                }
              })
            }}
          >
            <div>编辑</div>
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
    sysmsgService
      .getMessageTemplet({ pageIndex: pageIndex, pageSize: pageSize })
      .then((res: any) => {
        if (res.stat === 'OK') {
          store.dispatch({
            type: 'LIST_ADD',
            list: {
              items: res.info,
              total: 5,
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
