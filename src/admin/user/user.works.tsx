import { Button, Col, Input, Layout, Popconfirm, Popover, Row } from 'antd'
import Moment from 'moment'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import * as _ from 'underscore'
import EventPlus from '@/common/event'
import DesginService from '@/services/desgin'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import ItemForm from './user.works.form'

//antd组件
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'dgid',
    checkbox: true,
    width: 40
  },
  {
    field: 'name',
    title: '作品名称',
    formatter: function(item: any) {
      return item.name
    }
  },
  {
    field: 'dstids',
    title: '作品',
    width: 180,
    formatter: function(item: any) {
      let content = item.dstids.map((v: any, i: number) => {
        return (
          <div
            key={v}
            style={{
              float: 'left',
              marginLeft: '5px',
              overflow: 'hidden',
              width: '30px',
              height: '30px'
            }}
          >
            <Popover
              content={
                <img src={'/api/transfer/thumbs/' + v + '?w=300&h=300'} />
              }
            >
              <img src={'/api/transfer/thumbs/' + v + '?w=30&h=30'} />
            </Popover>
          </div>
        )
      })
      return content
    }
  },
  {
    field: 'nickname',
    title: '设计师',
    formatter: function(item: any) {
      return '-'
    }
  },
  {
    field: 'ctime',
    title: '发布时间',
    formatter: function(item: any) {
      return Moment(item.ctime * 1).format('YYYY年MM月DD日')
    }
  },
  {
    field: 'type',
    title: '状态',
    formatter: function(item: any) {
      return item.type === 2 ? '审核通过' : '正在审核'
    }
  },
  {
    field: 'pid-oper',
    title: '操作',
    width: 200,
    formatter: (item: any) => {
      return (
        <ButtonGroup size="small" key={item.dgid + 'oper'}>
          <Button
            onClick={() => {
              ModalForm.open({
                key: item.dgid + 'edit',
                title: item.name,
                type: 'edit',
                item: item,
                module: 'product',
                formCom: ItemForm,
                service: DesginService.updateGoodsByAdmin,
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
                DesginService.deleteGoodsByAdmin({ dgids: [item.dgid] }).then(
                  (res: any) => {
                    if (res.stat === 'OK') {
                      EventPlus.emit('listRefresh')
                    }
                  }
                )
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
    DesginService.listGoods({ pageIndex: pageIndex, pageSize: pageSize }).then(
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
