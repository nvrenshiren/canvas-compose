import OrderService from '@/services/order'
import ProductService from '@/services/product'
import UserService from '@/services/user'
import { Card, Col, Layout, Row } from 'antd'
import * as React from 'react'
import Link from 'umi/link'
import store from '@/store/store'
export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: any
  initComponent() {
    this.state = {
      notPayCount: 0, //待付款订单
      userCount: 0, //今日新增会员
      readDeliveryCount: 0, //已付款待发货订单
      todayCount: 0, //今日订单量
      yesterdayCount: 0, //昨日订单量
      applyDesigners: 0, // 设计师数量
      saleCount: 0, // 库存数量
      inventoryCount: 0, // 销售数量
      version: 0, // 版本,
      emptyProduct: 0 //零库存的出售商品
    }
  }
  render() {
    return (
      <Layout>
        <Card className="full">
          <div style={{ margin: 'auto', width: '60%' }}>
            <Card type="inner" title="待处理事务">
              <Row type="flex" gutter={30}>
                <Col>零库存的出售商品</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.emptyProduct}个
                  </Link>
                </Col>
              </Row>
              <Row type="flex" gutter={30}>
                <Col>正在申请成为设计师</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.applyDesigners}个
                  </Link>
                </Col>
              </Row>
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="业务量">
              <Row type="flex" gutter={30}>
                <Col>今日订单量</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.todayCount}个
                  </Link>
                </Col>
              </Row>
              <Row type="flex" gutter={30}>
                <Col>待付款订单</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.notPayCount}个
                  </Link>
                </Col>
              </Row>
              <Row type="flex" gutter={30}>
                <Col>已付款待发货订单</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.readDeliveryCount}个
                  </Link>
                </Col>
              </Row>
              <Row type="flex" gutter={30}>
                <Col>今日新增会员</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.userCount}个
                  </Link>
                </Col>
              </Row>
              <Row type="flex" gutter={30}>
                <Col>昨日订单量</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.yesterdayCount}个
                  </Link>
                </Col>
              </Row>
            </Card>
            <Card style={{ marginTop: 16 }} type="inner" title="商店信息">
              <Row type="flex" gutter={30}>
                <Col>出售中的商品</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.saleCount}个
                  </Link>
                </Col>
              </Row>
              <Row type="flex" gutter={30}>
                <Col>仓库中的商品</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.inventoryCount}个
                  </Link>
                </Col>
              </Row>
              <Row type="flex" gutter={30}>
                <Col>当前版本</Col>
                <Col>
                  <Link
                    to={
                      store.getState().admin.info.issuper
                        ? '/admin/product/list'
                        : '/admin/supplier/list'
                    }
                  >
                    {this.state.version}个
                  </Link>
                </Col>
              </Row>
            </Card>
          </div>
        </Card>
      </Layout>
    )
  }
  componentDidMount() {
    OrderService.getOrderReport().then((res) => {
      this.setState({
        notPayCount: res.notPayCount,
        userCount: res.userCount,
        readDeliveryCount: res.readDeliveryCount,
        todayCount: res.todayCount,
        yesterdayCount: res.yesterdayCount
      })
    })
    UserService.getApplyDesignersCount().then((res) => {
      this.setState({
        applyDesigners: res.total
      })
    })
    ProductService.getMallInfo().then((res) => {
      this.setState({
        saleCount: res.saleCount,
        inventoryCount: res.inventoryCount,
        version: res.version
      })
    })
    ProductService.getEmptyProduct({ pageIndex: 1, pageSize: 10000 }).then(
      (res) => {
        this.setState({
          emptyProduct: res.total
        })
      }
    )
  }
  componentWillUnmount() {}
}
