import Common from '@/common/common'
import { ThemeItem } from '@/interfaces/mode'
import ProductServer from '@/services/product'
import store from '@/store/store'
import Grid from '@/util/grid/grid'
import ModalNobg from '@/util/modal/modal.nobg'
import { Card, Col, Row } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactDOM from 'react-dom'
import { RouteComponentProps } from 'react-router'
import Link from 'umi/link'
import './flower.list.less'

interface State {
  isLoading: boolean
  themes: ThemeItem[]
  item: any
  visible: boolean
}
const { Meta } = Card
const Columns = [
  {
    field: 'tid',
    grid: true,
    formatter: (item: any) => {
      return (
        <div className="flower-item-box">
          <Card
            hoverable
            style={{ width: '100%' }}
            cover={
              <img
                title={item.name}
                src={Common.getThumb(
                  item.pic,
                  (200 / 2) * 1.6,
                  (280 / 2) * 1.6
                )}
              />
            }
          >
            <Meta
              title={item.name}
              style={{ margin: '-20px -14px', fontSize: '14px' }}
            />
          </Card>
        </div>
      )
    }
  }
]

export default class extends React.Component<RouteComponentProps<any>> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      isLoading: true,
      themes: [],
      item: {}, //当前flower
      visible: false
    }
  }
  state: State
  render() {
    return (
      <div className="flower-list-main main">
        <Row type="flex" justify="space-between">
          <Col span={6}>
            <h2 style={{ marginTop: 10, color: '#096dd3' }}>MATERIAL</h2>
            <Row className="list-theme-link">
              <Col>
                <Link
                  to={`/flower/list/0`}
                  className={
                    this.props.match.params.tid === '0' ? 'active' : ''
                  }
                >
                  All Items
                </Link>
              </Col>
              {this.state.themes.length > 0 &&
                this.state.themes.map((theme) => {
                  return (
                    <Col key={`list-theme-link${theme.tid}`}>
                      <Link
                        className={
                          this.props.match.params.tid * 1 === theme.tid
                            ? 'active'
                            : ''
                        }
                        to={`/flower/list/${theme.tid}`}
                      >
                        {theme.name}
                      </Link>
                    </Col>
                  )
                })}
            </Row>
          </Col>
          <Col span={18}>
            <Row id="list-scroll" className="flower-list-box">
              <Grid
                columns={Columns}
                modules="product"
                getdata={this.getData.bind(this)}
                event={this.itemEvent.bind(this)}
                rowHeight={280}
                columnWidth={200}
                pagination={true}
                isLoading={this.state.isLoading}
              />
            </Row>
          </Col>
        </Row>
      </div>
    )
  }

  itemEvent(type: string, item: any) {
    // const Box = document.createElement('div')
    // let modal:any = React.createElement(ModalForm, {
    //   item: this.state.item
    // })
    // let d:any = document.body.append(Box)
    // ReactDOM.render(modal, d)
    let Dom = document.createElement('div')
    ReactDOM.render(
      <ModalNobg width={1000} dom={Dom}>
        <div className="flower-content">
          <div className="content-bottom">
            <div className="flower-title">
              <span>{item.name}</span>
            </div>
            <div className="flower-opt">
              <Row>
                <Col span={12}>
                  <img
                    title={item.name}
                    src={Common.getThumb(
                      item.pic,
                      (400 / 2) * 1.6,
                      (560 / 2) * 1.6
                    )}
                  />
                  <p>{item.name}</p>
                </Col>
                <Col span={12}>
                  <a
                    href={`#/product/list/7/${item.pic}`}
                    onClick={() => {
                      let clickDom: any = document.body.querySelector(
                        '.ant-modal-close'
                      )
                      clickDom.click()
                    }}
                  >
                    <img src={require('../../statics/img/go.png')} />
                  </a>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </ModalNobg>,
      Dom
    )
    // this.props.history.push(`/product/list/7/${item.pic}`)
  }
  componentDidUpdate(prevProp: RouteComponentProps<any>, prevState: State) {
    let OldParams = Object.assign({}, prevState, { isLoading: true })
    let NewParams = Object.assign({}, this.state, { isLoading: true })
    if (
      this.props.match.params.tid !== prevProp.match.params.tid ||
      JSON.stringify(OldParams) !== JSON.stringify(NewParams)
    ) {
      document.getElementById('list-scroll').scrollTop = 0
      this.getData(1, store.getState().list.pageSize)
    }
  }
  getData(
    pageIndex: number = 1,
    pageSize: number = 20,
    pagination: boolean = true
  ) {
    this.setState({
      isLoading: true
    })
    ProductServer.listStyle({
      tid: this.props.match.params.tid * 1 || null,
      pageIndex: pageIndex,
      pageSize: pageSize
    }).then((res: any) => {
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
    })
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        themes: store.getState().themes
      })
    })
    this.getData(1, store.getState().list.pageSize)
  }
  componentWillUnmount() {
    this.setState = () => {
      return false
    }
  }
}
