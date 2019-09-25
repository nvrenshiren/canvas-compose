import { Button, Col, Input, Layout, Popconfirm, Row, Select } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '@/common/event'
import ProductService from '@/services/product'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import ProductForm from './product.form'
//antd组件
const Option = Select.Option
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列

const Columns = [
  {
    field: 'pid',
    checkbox: true,
    width: 40
  },
  {
    field: 'proCode',
    title: '货号',
    width: 150,
    formatter: (item: any) => {
      return item.proCode
    }
  },
  {
    field: 'name',
    title: '商品',
    formatter: (item: any) => {
      return item.name
    }
  },
  {
    field: 'priceshow',
    title: '价格',
    width: 100,
    formatter: (item: any) => {
      return item.priceshow
    }
  },
  {
    field: 'amount',
    title: '库存',
    width: 100,
    formatter: (item: any) => {
      return item.amount
    }
  },
  {
    field: 'pid-oper',
    title: '操作',
    width: 200,
    formatter: (item: any) => {
      return (
        <ButtonGroup size="small" key={item.pid + 'oper'}>
          <Button href={`#/product/info/${item.pid}/0`} target="_blank">
            查看
          </Button>
          <Button
            onClick={() => {
              ModalForm.open({
                key: item.pid + 'edit',
                title: '编辑商品---' + item.name,
                type: 'edit',
                pid: item.pid,
                module: 'product',
                formCom: ProductForm,
                service: ProductService.updateProduct,
                callback: () => {
                  EventPlus.emit('listRefresh')
                }
              })
            }}
          >
            编辑
          </Button>
          <Button>
            <Popconfirm
              title={'确认删除该商品?'}
              onConfirm={() => {
                ProductService.deleteProduct([item.pid]).then((res: any) => {
                  if (res.stat === 'OK') {
                    let newList = store
                      .getState()
                      .list.items.filter((temp: any) => {
                        return temp.pid !== item.pid
                      })
                    store.dispatch({
                      type: 'LIST_ADD',
                      list: {
                        items: newList,
                        total: newList.length
                      }
                    })
                  }
                })
              }}
            >
              删除
            </Popconfirm>
          </Button>
        </ButtonGroup>
      )
    }
  }
]

interface State {
  isLoading: boolean
  status: number
  selected: number
}

export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.state = {
      isLoading: true,
      status: 0,
      selected: 0
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  state: State
  render() {
    return (
      <Layout className="full modules">
        <div className="modules-head">
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
                        <Select
                          value={this.state.status}
                          onChange={this.ChangeStatus.bind(this)}
                        >
                          <Option value={0}>出售中</Option>
                          <Option value={1}>仓库中</Option>
                          <Option value={2}>零库存</Option>
                        </Select>
                      </Col>
                      <Col className="oper-item">
                        <Button
                          type="primary"
                          onClick={() => {
                            ModalForm.open({
                              key: 'productadd',
                              module: 'product',
                              formCom: ProductForm,
                              service: ProductService.addProduct,
                              title: '新增商品',
                              type: 'add',
                              static: true,
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
                      <Col
                        className="oper-item"
                        hidden={this.state.status !== 0}
                      >
                        <Button
                          type="primary"
                          disabled={this.state.selected < 1}
                          onClick={() => {
                            let selected = store
                              .getState()
                              .list.items.filter((item: any) => {
                                return item.selected
                              })
                              .map((temp: any) => {
                                return temp.pid
                              })
                            ProductService.undercarriageProduct(selected).then(
                              (res: any) => {
                                if (res.stat === 'OK') {
                                  EventPlus.emit('listRefresh')
                                }
                              }
                            )
                          }}
                        >
                          下架
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col className="modules-head-oper-item" xl={{ span: 8 }}>
              <div className="search-box" style={{ display: 'none' }}>
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
    ProductService.listProductsByStatus({
      pageIndex: pageIndex,
      pageSize: pagination ? pageSize : 9999999,
      status: this.state.status
    }).then((res: any) => {
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
  ChangeStatus(status: number) {
    this.setState({
      status: status
    })
  }
  componentDidUpdate(prevProps: any, prevState: State) {
    if (prevState.status !== this.state.status) {
      document.getElementById('list-scroll').scrollTop = 0
      this.getData(1, store.getState().list.pageSize)
    }
  }
  componentDidMount() {
    store.subscribe(() => {
      let length = store.getState().list.items.filter((item: any) => {
        return item.selected
      }).length
      if (
        (length < 2 && this.state.selected !== length) ||
        this.state.selected === 0
      ) {
        this.setState({
          selected: length
        })
      }
    })

    this.getData(1, store.getState().list.pageSize)
  }
  componentWillUnmount() {
    this.setState = () => {
      return false
    }
  }
}
