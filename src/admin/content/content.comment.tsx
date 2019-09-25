import EventPlus from '@/common/event'
import CommentService from '@/services/comment'
import store from '@/store/store'
import List from '@/util/list/list'
import { Button, Col, Input, Layout, Popconfirm, Row, Select } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
//antd组件
const Option = Select.Option
const Search = Input.Search
const { Content } = Layout
const ButtonGroup = Button.Group
//表格列
const Columns = [
  {
    field: 'comid',
    checkbox: true,
    width: 40
  },
  {
    field: 'content',
    title: '内容',
    formatter: (item: any) => {
      return <div dangerouslySetInnerHTML={{ __html: item.content }} />
    }
  },
  {
    field: 'type',
    title: '类型',
    width: 150,
    formatter: (item: any) => {
      let str: string = ''
      if (item.type === 1) {
        str = '正在申请'
      } else if (item.type === 2) {
        str = '已通过'
      } else {
        str = '申请驳回'
      }
      return <div>{str}</div>
    }
  },
  {
    field: 'tid-oper',
    title: '-',
    width: 200,
    formatter: (item: any) => {
      return (
        <ButtonGroup size="small" key={item.auid + 'oper'}>
          {item.type === 1 && (
            <Button>
              <Popconfirm
                title={'通过?'}
                onConfirm={() => {
                  CommentService.operateComment({ comids: [item.comid], type: 2 }).then((res: any) => {
                    if (res.stat === 'OK') {
                      EventPlus.emit('listRefresh')
                    }
                  })
                }}
              >
                <div>通过</div>
              </Popconfirm>
            </Button>
          )}
          {item.type === 1 && (
            <Button>
              <Popconfirm
                title={'驳回?'}
                onConfirm={() => {
                  CommentService.operateComment({ comids: [item.comid], type: 3 }).then((res: any) => {
                    if (res.stat === 'OK') {
                      EventPlus.emit('listRefresh')
                    }
                  })
                }}
              >
                <div>驳回</div>
              </Popconfirm>
            </Button>
          )}
          {item.type === 1 && (
            <Button>
              <Popconfirm
                title={'确认删除?'}
                onConfirm={() => {
                  CommentService.deleteCommentByAdmin({ comids: [item.comid] }).then((res: any) => {
                    if (res.stat === 'OK') {
                      EventPlus.emit('listRefresh')
                    }
                  })
                }}
              >
                <div>删除</div>
              </Popconfirm>
            </Button>
          )}
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
    CommentService.searchComment({ pageIndex: pageIndex, pageSize: pageSize }).then((res: any) => {
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
