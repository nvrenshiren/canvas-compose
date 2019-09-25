import {
  Alert,
  Button,
  Card,
  Col,
  Icon,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Steps,
  Collapse,
  Tag
} from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Common from '@/common/common'
import CouponService from '@/services/coupon'
import OrderService from '@/services/order'
import ShopService from '@/services/shopping'
import UserService from '@/services/user'
import store from '@/store/store'
import StepForm from './steps.form'
import './steps.shop.less'

interface State {
  index: number
  steps: any[]
  delivery: number
  address: any
  coupon: any
  order: number
  loading: boolean
  payurl: string
  data: {
    address: any[]
    carts: any[]
    deliverys: any[]
  }

  orderdata: {
    cid?: number
    address?: string
    age?: number
    delivery?: number
    detail?: string
    fullname?: string
    phone?: string
    postcode?: number
    postage?: number
    sex?: number
    total?: number
    coupon?: string
    country?: string
    province?: string
  }
}

const RadioGroup = Radio.Group
const Step = Steps.Step
const { TextArea } = Input
const Panel = Collapse.Panel
export default class StepCart extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      loading: false,
      payurl: '',
      index: 0,
      order: 0,
      orderdata: {},
      address: {},
      steps: [
        {
          title: 'Address',
          icon: 'compass',
          status: 'wait'
        },
        {
          title: 'Shipping',
          icon: 'shop',
          status: 'wait'
        },
        {
          title: 'Payment',
          icon: 'pay-circle-o',
          status: 'wait'
        },
        {
          title: 'Review Order',
          icon: 'coffee',
          status: 'wait'
        }
      ],
      delivery: 0,
      coupon: {},
      data: {
        address: [],
        carts: [],
        deliverys: []
      }
    }
  }
  AddressForm: WrappedFormUtils
  state: State
  async init() {
    let listAddress = await UserService.listAddress()
    let listDelivery = await OrderService.listDelivery()
    let getCart = await ShopService.getCart({
      type: 1,
      id: store.getState().user.uid,
      hasDetail: true
    })

    if (getCart.items.length > 0) {
      this.setState({
        delivery: listDelivery.rows[0].did,
        address: listAddress.rows[0],
        data: {
          address: listAddress.rows,
          carts: getCart.items,
          deliverys: listDelivery.rows
        }
      })
    } else {
      Modal.error({
        title: 'Your Cart is empty!',
        content:
          'Your shopping cart is empty. Please add relevant products and continue.',
        onOk: () => {
          window.location.href = '/product'
        }
      })
    }
  }
  getRef(ref: WrappedFormUtils) {
    this.AddressForm = ref
  }
  get renderItem() {
    switch (this.state.index) {
      case 0:
        return (
          <Row type="flex" justify="space-between" className="steps-one">
            <Col
              span={14}
              style={{ borderRight: '1px solid #e5e5e5', marginTop: 20 }}
            >
              <Row>
                <h2>Enter shipping address</h2>
                <small>
                  Shipping to multiple addresses? Don't worry. You can specify
                  additional addresses later.
                </small>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <StepForm
                  item={this.state.address}
                  ref={this.getRef.bind(this)}
                />
                <Row>
                  <Col span={20} offset={4}>
                    <Button icon="search" size="small">
                      Change
                    </Button>
                  </Col>
                  <Col span={20} offset={4}>
                    <Button
                      type="primary"
                      size="large"
                      style={{ margin: '20px 0' }}
                      onClick={this.checkAddress.bind(this)}
                    >
                      Continue
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Col>
            <Col span={8} style={{ marginTop: 20 }}>
              <Row className="carts-head">
                <h2>Order Summary</h2>
                <Row className="cart-items">
                  <Collapse bordered={false}>
                    {this.state.data.carts.map((cat) => {
                      return (
                        <Panel
                          className="cart-item"
                          header={
                            <Row type="flex" justify="space-between">
                              <Col>
                                {cat.goods.name}
                                <Tag color="#108ee9">{cat.goods.sizeName}</Tag>
                              </Col>
                              <Col>
                                US$
                                {(cat.goods.price * cat.cartItem.count).toFixed(
                                  2
                                )}
                              </Col>
                            </Row>
                          }
                          key={'cart-item-' + cat.cartItem.gid}
                        >
                          <Row gutter={10} type="flex">
                            {cat.goods.pics.map(
                              (pic: string, index: number) => {
                                return (
                                  <Col
                                    span={6}
                                    key={`cart-item-${
                                      cat.cartItem.gid
                                    }-pic-${index}`}
                                  >
                                    <img
                                      src={Common.getThumb(pic, 150, 150)}
                                      width="100%"
                                    />
                                  </Col>
                                )
                              }
                            )}
                          </Row>
                        </Panel>
                      )
                    })}
                  </Collapse>

                  <Row type="flex" justify="end" className="carts-total-price">
                    Reward: US$
                    {this.cartsTotal}
                  </Row>
                </Row>
              </Row>
            </Col>
          </Row>
        )
      case 1:
        return (
          <Row className="steps-two">
            <h2 className="steps-title">Choose shipping options</h2>
            <Row className="steps-info">
              <h2 className="steps-info">Ship to:</h2>
              <h3>
                Name:
                {this.state.orderdata.fullname} Phone:
                {this.state.orderdata.phone}
              </h3>
              <h4>
                {this.state.orderdata.country} {this.state.orderdata.province}
              </h4>
              <h4>
                {this.state.orderdata.address} {this.state.orderdata.postcode}
              </h4>
            </Row>
            <Row className="steps-main">
              <h2 className="steps-main-title">Sold by RIGHR</h2>
              <Row type="flex" justify="space-between" gutter={20}>
                <Col span={12} style={{ marginBottom: 10 }}>
                  {this.state.data.carts.map((cat) => {
                    let pics = cat.goods.pics
                    return (
                      <Row
                        type="flex"
                        gutter={20}
                        key={'steps-main-item-' + cat.goods.gid}
                        style={{ marginBottom: 10 }}
                      >
                        <Col span={8} hidden={!pics[0] && !pics[2]}>
                          <img src={Common.getThumb(pics[0] || pics[2], 180)} />
                        </Col>
                        <Col span={8} hidden={!pics[1] && !pics[3]}>
                          <img src={Common.getThumb(pics[1] || pics[3], 180)} />
                        </Col>
                        <Col span={8}>
                          <Row
                            type="flex"
                            justify="space-around"
                            style={{ height: '100% ', flexDirection: 'column' }}
                          >
                            <Col>{cat.goods.name}</Col>
                            <Col>
                              Size:
                              <Tag>{cat.goods.sizeName}</Tag>
                            </Col>
                            <Col>
                              Piece Price:
                              <Tag>US$ {cat.goods.price}</Tag>
                            </Col>
                            <Col>
                              Quantity:
                              <Tag>{cat.cartItem.count}</Tag>
                            </Col>
                            <Col>
                              Total:
                              <Tag color="#2db7f5">
                                US$
                                {Number(
                                  (
                                    cat.cartItem.count * cat.goods.price
                                  ).toFixed(2)
                                )}
                              </Tag>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )
                  })}
                </Col>
                <Col span={12} style={{ marginBottom: 20 }}>
                  <Card title="Choose Your Shipping Option">
                    <RadioGroup
                      onChange={(e) => {
                        let data = Object.assign({}, this.state.orderdata)
                        data.delivery = e.target.value
                        data.postage = this.state.data.deliverys.filter(
                          (delivery) => {
                            return delivery.did === e.target.value
                          }
                        )[0].price
                        this.setState({
                          delivery: e.target.value,
                          orderdata: data
                        })
                      }}
                      defaultValue={this.state.delivery}
                    >
                      {this.state.data.deliverys.map((delivery) => {
                        return (
                          <Radio
                            value={delivery.did}
                            key={'steps-delivery-item-' + delivery.did}
                          >
                            <h3 style={{ display: 'inline-block' }}>
                              {delivery.name} (US$
                              {delivery.price})
                            </h3>
                            <p
                              style={{ whiteSpace: 'normal', marginBottom: 0 }}
                            >
                              {delivery.detail}
                            </p>
                          </Radio>
                        )
                      })}
                    </RadioGroup>
                  </Card>
                </Col>
              </Row>
            </Row>
            <Row className="postscript" style={{ marginTop: 20 }}>
              <h3>Order postscript</h3>
              <TextArea
                style={{ marginTop: 15 }}
                className="postscript-TextArea"
                autosize={{ minRows: 4, maxRows: 8 }}
                onChange={(e) => {
                  this.setState({
                    orderdata: Object.assign({}, this.state.orderdata, {
                      detail: e.target.value
                    })
                  })
                }}
              />
            </Row>
            <Row
              className="coupon"
              type="flex"
              align="middle"
              style={{ marginTop: 20 }}
              gutter={20}
            >
              <Col>
                <h3>Coupon code</h3>
              </Col>
              <Col>
                <Input
                  value={this.state.coupon.code}
                  ref="coupon"
                  type="txet"
                  onChange={(e) => {
                    this.setState({
                      coupon: Object.assign({}, this.state.coupon, {
                        code: e.target.value
                      })
                    })
                  }}
                  style={{ width: 250 }}
                  prefix={<Icon type="red-envelope" />}
                />
              </Col>
              <Col>
                {this.state.orderdata.coupon === '' && (
                  <Button
                    type="primary"
                    onClick={() => {
                      CouponService.checkCoupon(this.state.coupon.code).then(
                        (res) => {
                          if (res.stat === 'OK') {
                            if (!res.coupon.isused) {
                              this.setState({
                                coupon: res.coupon,
                                orderdata: Object.assign(
                                  {},
                                  this.state.orderdata,
                                  {
                                    coupon: this.state.coupon.code,
                                    total: this.getAllTotal
                                  }
                                )
                              })
                            } else {
                              message.error('This Coupon have been used!')
                            }
                          } else {
                            message.error(
                              'Please confirm that the coupons are filled correctly!'
                            )
                          }
                        }
                      )
                    }}
                  >
                    Verify
                  </Button>
                )}
                {this.state.orderdata.coupon && (
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState({
                        coupon: {},
                        orderdata: Object.assign({}, this.state.orderdata, {
                          coupon: '',
                          total: this.getAllTotal
                        })
                      })
                    }}
                  >
                    Clear
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="price-total" type="flex" justify="end">
              <Col style={{ textAlign: 'right' }}>
                <h3>
                  The total goods amount：US$
                  {this.cartsTotal}
                </h3>
                <h3>
                  Shipping cost：US$
                  {this.state.orderdata.postage}
                </h3>
                <h3>
                  The total amount：
                  <span style={{ fontSize: 20, color: 'red' }}>
                    US$
                    {this.getAllTotal}
                  </span>
                </h3>
              </Col>
            </Row>
            <Row type="flex" justify="end">
              <Button
                type="primary"
                size="large"
                style={{ margin: '20px 0' }}
                onClick={this.createOrder.bind(this)}
              >
                Continue
              </Button>
            </Row>
          </Row>
        )
      case 2:
        return (
          <Row
            className="steps-success"
            type="flex"
            justify="center"
            align="middle"
          >
            <Alert
              style={{ marginTop: 30 }}
              message="Success"
              type="success"
              showIcon
              description={
                <Row type="flex" align="middle">
                  <p>
                    Thank you for buying from us! your order {this.state.order}
                    has been successfully submitted, you can checkout securely
                    now.
                  </p>
                  <p>
                    {/* <Button
                      type="primary"
                      loading={this.state.loading}
                      onClick={() => {
                        let steps = this.state.steps.concat([])
                        if (this.state.payurl === '') {
                          steps[this.state.index].status = 'wait'
                          this.setState({
                            loading: true,
                            steps: steps
                          })
                          OrderService.orderPay(this.state.order).then(
                            (res: any) => {
                              steps[this.state.index].status = 'finish'
                              this.setState({
                                payurl: res.url,
                                loading: false,
                                steps: steps
                              })
                            }
                          )
                        } else {
                          window.open(this.state.payurl, '_blank')
                        }
                      }}
                    >
                      {this.state.payurl === '' ? 'Get PayLink' : 'Go PayPage'}
                    </Button> */}

                    <Button
                      type="primary"
                      onClick={() => {
                        window.location.href = `/user/paylink/${
                          this.state.order
                        }`
                      }}
                    >
                      Get PayLink
                    </Button>
                  </p>
                </Row>
              }
            />
          </Row>
        )
      case 3:
        return <Row />
    }
  }
  createOrder() {
    OrderService.createOrder(this.state.orderdata).then((res) => {
      let steps = this.state.steps.concat([])
      if (res.stat === 'OK') {
        steps[this.state.index].status = 'finish'
        this.setState({
          order: res.item.order.oid,
          index: 2,
          steps: steps
        })
        ShopService.getCart({
          type: 1,
          id: store.getState().user.uid,
          hasDetail: false
        })
      } else {
        steps[this.state.index].status = 'error'
        message.error(res.errtxt)
        this.setState({
          steps: steps
        })
      }
    })
  }
  get getAllTotal() {
    let catTal = this.cartsTotal
    if (this.state.coupon.type === 1) {
      return Number(
        (
          catTal * this.state.coupon.discount +
          this.state.orderdata.postage
        ).toFixed(2)
      )
    } else if (this.state.coupon.type === 2) {
      return catTal - this.state.coupon.discount + this.state.orderdata.postage
    } else {
      return catTal + this.state.orderdata.postage
    }
  }
  get cartsTotal() {
    let total = 0
    this.state.data.carts.map((cart) => {
      total += Number((cart.cartItem.count * cart.goods.price).toFixed(2))
    })
    return total
  }
  checkAddress() {
    this.AddressForm.validateFields((err: any, values: any) => {
      let steps = this.state.steps.concat([])
      if (err) {
        steps[this.state.index].status = 'error'
        this.setState({
          steps: steps
        })
      } else {
        steps[this.state.index].status = 'finish'
        let orderdata = {
          cid: store.getState().carts.cid,
          address: values.addr,
          age: values.age,
          delivery: this.state.delivery,
          detail: '',
          fullname: values.name,
          phone: values.phone,
          postcode: values.postcode,
          postage: this.state.data.deliverys[0].price,
          sex: values.sex,
          total: this.cartsTotal,
          coupon: '',
          country: values.country,
          province: values.province
        }
        this.setState({
          steps: steps,
          orderdata: orderdata,
          index: 1
        })
      }
    })
  }
  render() {
    return (
      <div id="carts-steps" className="main">
        <Row
          type="flex"
          justify="space-between"
          align="middle"
          className="carts-steps-head"
        >
          <Col>
            <h1 style={{ margin: 0 }}>Checkout</h1>
          </Col>
          <Col span={10}>
            <Steps
              current={this.state.index}
              size="small"
              status={this.state.steps[this.state.index].status}
            >
              {this.state.steps.map((step: any) => {
                return (
                  <Step
                    key={'cart-step-' + step.title}
                    status={step.status}
                    title={step.title}
                    icon={<Icon type={step.icon} />}
                  />
                )
              })}
            </Steps>
          </Col>
        </Row>
        <Row className="steps-cart-main">{this.renderItem}</Row>
      </div>
    )
  }
  componentDidMount() {
    if (store.getState().user.uid) {
      this.init()
    } else {
      Modal.warning({
        title: 'The shopping cart is empty',
        content:
          'Please add relevant products to the shopping cart and pay again.',
        onOk: () => {
          window.location.href = '/'
        }
      })
    }
  }
  componentWillUnmount() {}
}
