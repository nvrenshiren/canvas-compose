import {message, Button, Col, Input, Layout, Popconfirm, Row, Select } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '@/common/event'
import RecycleService from '@/services/recycle'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import common from '@/common/common'
//antd组件
const Option = Select.Option
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'nid',
    checkbox: true,
    width: 40
  },
  {
    field: 'title',
    title: '标题',
    formatter: (item: any) => {
      return (<div>{item.title}</div>)
    }
  },
  {
    field: 'type',
    title: '类型',
    formatter: (item: any) => {
      let str = ''
      switch (item.type) {
        case 1:
        str = '商品';break;
        case 2:
        str = '管理员';break;
        case 3:
        str = '分类';break;
        case 4:
        str = '主题';break;
        case 5:
        str = '样式';break;
        case 6:
        str = '用户';break;
        case 7:
        str = '设计师作品';break;
        case 8:
        str = '订单';break;
        case 9:
        str = '配送方式';break;
        case 10:
        str = '优惠券';break;
        case 11:
        str = '售后订单';break;
        case 12:
        str = '导航';break;
        case 13:
        str = '广告';break;
        case 14:
        str = '关于我们';break;
        case 15:
        str = '单页分类';break;
        case 16:
        str = '单页';break;
        case 17:
        str = '角色';break;
        case 18:
        str = '评论';break;
        case 19:
        str = '地区';break;
        case 20:
        str = '图片';break;
        default:
        str = '-';break;
      }
      return (<div>{str}</div>)
    }
  },
  {
    field: 'ctime',
    title: '删除时间',
    formatter: (item: any) => {
      return (<div>{common.dateTime(item.ctime)}</div>)
    }
  },
  {
    field: 'tid-oper',
    title: '操作',
    width: 200,
    formatter: (item: any) => {
      return (
        <ButtonGroup size="small" key={item.rid + 'oper'}>
          <Button>
            <Popconfirm
              title={'确认还原?'}
              onConfirm={() => {
                RecycleService.recover([item.rid]).then((res: any) => {
                  if (res.stat === 'OK') {
                    message.success('还原成功')
                    EventPlus.emit('listRefresh')
                  }
                })
              }}
            >
              <div>还原</div>
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
            <Col className="modules-head-oper-item" xl={{ span: 8 }}>
                
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
    RecycleService.listRecycles({ pageIndex: pageIndex, pageSize: pageSize }).then(
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
