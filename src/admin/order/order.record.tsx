import { Button, Col, Input, Layout, Row } from 'antd';
import Moment from 'moment';
import * as React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import EventPlus from '@/common/event';
import UseraccountService from '@/services/useraccount';
import store from '@/store/store';
import List from '@/util/list/list';
import ModalForm from '@/util/modal/modal.form';
import ItemForm from './order.record.form';
//antd组件
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'wcid',
    checkbox: true,
    width: 40
  },
  {
    field: 'fullname',
    title: '设计师',
    formatter: (item: any) => {
      return (<div>{item.fullname} （{item.account}）</div>)
    }
  },
  {
    field: 'ctime',
    title: '时间',
    width: 150,
    formatter: (item: any) => {
      return Moment(item.ctime * 1).format('YYYY年MM月DD日')
    }
  },
  {
    field: 'money',
    title: '提现金额',
    width: 100,
    formatter: (item: any) => {
      return (<div>{item.money}</div>)
    }
  },
  {
    field: 'detail',
    title: '备注',
    width: 100,
    formatter: (item: any) => {
      return (<div>{item.detail}</div>)
    }
  },
  {
    field: 'type',
    title: '状态',
    width: 100,
    formatter: (item: any) => {
      let str = '申请'
      if (item.type === 1) {
        str = '已支付'
      } else if (item.type === 2) {
        str = '未支付'
      }
      return (<div>{str}</div>)
    }
  },
  {
    field: 'tid-oper',
    title: '操作',
    width: 200,
    formatter: (item: any) => {
      return (
        <ButtonGroup size="small" key={item.wcid + 'oper'}>
          <Button
            onClick={() => {
              ModalForm.open({
                key: item.pid + 'edit',
                title: item.name,
                type: 'edit',
                item: item,
                module: 'order',
                formCom: ItemForm,
                service: UseraccountService.updateWithdrawCardsByAdmin,
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
    UseraccountService.getWithdrawCardsByAdmin({ pageIndex: pageIndex, pageSize: pageSize }).then(
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
