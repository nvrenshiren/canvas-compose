import { Button, Col, Input, Layout, Popconfirm, Row, Select } from 'antd'
import * as React from 'react'
import * as _ from 'underscore'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '@/common/event'
import ProductService from '@/services/product'
import store from '@/store/store'
import List from '@/util/list/list'
import ModalForm from '@/util/modal/modal.form'
import ProductSpecForm from './product.spec.form'
import common from '@/common/common'



//antd组件
const Option = Select.Option
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'sid',
    checkbox: true,
    width: 40
  },
  {
    field: 'name',
    title: '名称',
    width: 150,
    formatter: (item: any) => {
      return (<div>{item.name}</div>)
    }
  },
  {
    field: 'remark',
    title: '备注',
    formatter: (item: any) => {
      return (<div>{item.remark}</div>)
    }
  },
  {
    field: 'items',
    title: '规格值',
    formatter: (item: any) => {
      return (<div>{(_.pluck(item.items, 'name').join(','))}</div>)
    }
  },
  {
    field: 'tid-oper',
    title: '操作',
    width: 200,
    formatter: (item: any) => {
      /*
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
                formCom: ProductSpecForm,
                service: ProductService.updateTheme,
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
                ProductService.deleteSpecification({sids: [item.sid]}).then((res: any) => {
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
    */
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
                      {/*  (
                        <Button
                          type="primary"
                          onClick={() => {
                            ModalForm.open({
                              key: 'add',
                              title: '添加',
                              type: 'add',
                              module: 'product',
                              formCom: ProductSpecForm,
                              service: ProductService.insertTheme,
                              callback: () => {
                                EventPlus.emit('listRefresh')
                              }
                            })
                          }}
                        >
                          添加
                        </Button>
                      )*/}
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
    ProductService.listSpecifications({ pageIndex: pageIndex, pageSize: pageSize }).then(
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
