import { Card, Row, Avatar, Icon, Col, Badge } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Link from 'umi/link'
import Common from '../../common/common'
import DesginServer from '../../services/desgin'
import store from '../../store/store'
import Grid from '../../util/grid/grid'
import './desgin.list.less'

interface State {
  isLoading: boolean
}
const { Meta } = Card
const Columns = [
  {
    field: 'tid',
    grid: true,
    formatter: (item: any) => {
      return (
        <div className="desgin-item-box">
          <Link
            key={'item-' + item.uid}
            to={`/desgin/product/${item.designerInfo.did}`}
          >
            <Card
              hoverable
              style={{ width: 300 }}
              bodyStyle={{ textAlign: 'left' }}
              cover={
                item.designerInfo.pic ? (
                  <img
                    src={Common.getThumb(item.designerInfo.pic, 300, 180)}
                    width="100%"
                  />
                ) : (
                  <Row
                    type="flex"
                    justify="center"
                    align="middle"
                    className="full"
                    style={{ background: '#ccc' }}
                  >
                    <Col>
                      <Icon
                        type="picture"
                        style={{ fontSize: 100, color: '#f8f8f8' }}
                      />
                    </Col>
                  </Row>
                )
              }
              actions={[
                <Icon type="link" />,
                <Icon type="ellipsis" />,
                <Badge
                  count={item.designerInfo.count}
                  showZero
                  style={{ backgroundColor: '#52c41a' }}
                >
                  <Icon type="skin" />
                </Badge>
              ]}
            >
              <Meta
                avatar={
                  <Avatar src={Common.getThumb(item.pic, 40, 40)} icon="user" />
                }
                title={item.nickname}
                description={item.designerInfo.digest || '.......'}
              />
            </Card>
          </Link>
        </div>
      )
    }
  }
]

export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      isLoading: true
    }
  }
  state: State
  render() {
    return (
      <div className="desgin-list-main main">
        <Row id="list-scroll" className="auto-height">
          <Grid
            columns={Columns}
            modules="product"
            getdata={this.getData.bind(this)}
            event={this.itemEvent.bind(this)}
            rowHeight={365}
            columnWidth={340}
            pagination={true}
            isLoading={this.state.isLoading}
          />
        </Row>
      </div>
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
    DesginServer.listDesigner({
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
    this.getData()
  }
  componentWillUnmount() {}
}
