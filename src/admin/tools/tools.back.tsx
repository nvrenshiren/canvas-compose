import { Button, Col, Input, Layout, Popconfirm, Row, Select, message } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '@/common/event'
import SysmsgService from '@/services/sysmsg'
import Common from '@/common/common'
import store from '@/store/store'
import List from '@/util/list/list'
import Moment from 'moment'

//antd组件
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'dbid',
    checkbox: true,
    width: 40
  },
  {
    field: 'name',
    title: '名称',
    formatter: function(item: any) {
      return item.name
    }
  },
  {
    field: 'ctime',
    title: '创建时间',
    formatter: function(item: any) {
      return Common.dateTime(item.ctime)
    }
  },
  {
    field: 'path',
    title: '路径',
    formatter: function(item: any) {
      return item.path
    }
  },
  {
    field: 'size',
    title: '大小',
    formatter: function(item: any) {
      return item.size + 'B'
    }
  },
  {
    field: 'pic-oper',
    title: '操作',
    width: 200,
    formatter: function(item: any) {
      return (
        <ButtonGroup size="small" key={item.pic + 'oper'}>
        <Button>
          <Popconfirm
            title={'确认还原?'}
            onConfirm={() => {
              SysmsgService.recoverDatabaseBackup(item.dbid).then((res: any) => {
                if (res.stat === 'OK') {
                  EventPlus.emit('listRefresh')
                }
              })
            }}
          >
            <div>还原</div>
          </Popconfirm>
        </Button>
          <Button>
            <Popconfirm
              title={'确认删除?'}
              onConfirm={() => {
                SysmsgService.deleteDatabaseBackup([item.dbid]).then((res: any) => {
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
                            SysmsgService.createDatabaseBackup({}).then((res:any) => {
                              if (res.stat === 'OK') {
                                message.success('备份成功')
                                EventPlus.emit('listRefresh')
                              } else {
                                message.success('备份失败')
                              }
                            })
                          }}
                        >
                          生成备份
                        </Button>
                      </Col>
                    </Row>
                  </Col>
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
            modules="tools"
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
    SysmsgService.listDatabaseBackup({ pageIndex: 1, pageSize: 10000 }).then((res: any) => {
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
