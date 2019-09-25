import {
  message,
  Button,
  Col,
  Input,
  Layout,
  Popconfirm,
  Row,
  Select
} from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '@/common/event'
import productService from '@/services/product'
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
    field: 'proCode',
    title: '货号',
    formatter: (item: any) => {
      return <div>{item.proCode}</div>
    }
  },
  {
    field: 'name',
    title: '名称',
    formatter: (item: any) => {
      return <div>{item.name}</div>
    }
  },
  {
    field: 'thumbs',
    title: ' ',
    formatter: (item: any) => {
      return (
        <div style={{ width: '30px', height: '30px', overflow: 'hidden' }}>
          <img src={'/api/transfer/thumbs/' + item.thumbs + '?w=30&h=30'} />{' '}
        </div>
      )
    }
  },
  {
    field: 'priceshow',
    title: '价格',
    formatter: (item: any) => {
      return <div>{item.priceshow}</div>
    }
  },
  {
    field: 'view',
    title: '查看',
    formatter: (item: any) => {
      return <div>{item.view}</div>
    }
  },
  {
    field: 'sold',
    title: '销量',
    formatter: (item: any) => {
      return <div>{item.sold}</div>
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
    productService
      .getProductViews({ pageIndex: pageIndex, pageSize: pageSize })
      .then((res: any) => {
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
