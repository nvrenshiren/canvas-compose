import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  message,
  Modal,
  Progress,
  Row,
  Select,
  Rate
} from 'antd'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import _ from 'underscore'
import Common from '@/common/common'
import { ProInfo, UserInfo } from '@/interfaces/mode'
import DesignerService from '@/services/desgin'
import FavoriteService from '@/services/favorite'
import ProductService from '@/services/product'
import ShoppingService from '@/services/shopping'
import ScoreService from '@/services/score'
import UpService from '@/services/transfer'
import store from '@/store/store'
import ComposeOption from '@/util/compose/control'
import ComposeLocal from '@/util/compose/local'
import Three from '@/util/compose/three'
import SharePlus from '@/util/share/share'
import cartCommon from '../shopping/cart.common'
import Comment from '../product/comment'
import '../product/product.info.less'
interface State {
  ready: boolean
  product?: ProInfo
  size?: number
  quantity?: number
  indexKey?: string //当前所在面
  progress?: boolean
  percent?: number
  desgin?: UserInfo
  name?: string
  stars?: number
}
const Option = Select.Option
export default class extends React.Component<RouteComponentProps<any>> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.state = {
      ready: false,
      indexKey: 'front',
      progress: false,
      percent: 0
    }
  }
  state: State
  Keys: string[]
  render() {
    return (
      <div className="main">
        {this.state.ready && (
          <Row
            className="produc-info-warp"
            id="product-info"
            type="flex"
            justify="space-between"
          >
            <Col span={15}>
              <Row className="product-info-path" style={{ height: 40 }}>
                <Breadcrumb separator=">">
                  <Breadcrumb.Item href="#/desgin">
                    DESIGNER STORES
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    href={`#/desgin/product/${this.props.match.params.did}`}
                  >
                    {this.state.desgin.nickname || this.state.desgin.name}
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{this.state.name}</Breadcrumb.Item>
                </Breadcrumb>
              </Row>
              <Row
                className="product-convert-main"
                id="product-convert"
                style={{ height: 975 }}
                type="flex"
                justify="space-between"
              >
                <Col className="convert-thumbs" style={{ width: 80 }}>
                  {this.state.ready &&
                    (this.state.product.iscombinepic ? (
                      this.state.product.dimension === 1 ? (
                        this.Keys.map((key) => {
                          return (
                            <div
                              key={`thumbs-item-key-${key}`}
                              className={
                                this.state.indexKey === key
                                  ? 'thumbs-item active'
                                  : 'thumbs-item'
                              }
                              onClick={() => {
                                if (this.state.indexKey !== key) {
                                  this.setState({
                                    indexKey: key
                                  })
                                }
                              }}
                            >
                              <ComposeLocal
                                place={key}
                                width={80}
                                height={120}
                                type={0}
                                pid={this.state.product.pid}
                              />
                            </div>
                          )
                        })
                      ) : (
                        this.Keys.map((key) => {
                          return (
                            <div
                              key={`thumbs-item-key-${key}`}
                              className={
                                this.state.indexKey === key
                                  ? 'thumbs-item active'
                                  : 'thumbs-item'
                              }
                              onClick={() => {
                                if (this.state.indexKey !== key) {
                                  this.setState({
                                    indexKey: key
                                  })
                                }
                              }}
                            >
                              <Three
                                place={key}
                                width={80}
                                height={120}
                                type={0}
                                objfile={this.state.product.books}
                                pid={this.state.product.pid}
                              />
                            </div>
                          )
                        })
                      )
                    ) : (
                      <div
                        key={`thumbs-item-key-three`}
                        className="thumbs-item active"
                      >
                        <img
                          src={Common.getThumb(
                            this.state.product.thumbs,
                            80,
                            120
                          )}
                          width="80"
                          height="120"
                        />
                      </div>
                    ))}
                </Col>
                <Col
                  className="convert-main"
                  id="convert-main-image"
                  style={{
                    width: 650,
                    height: 975
                  }}
                >
                  {this.state.ready &&
                    (this.state.product.iscombinepic ? (
                      this.state.product.dimension === 1 ? (
                        this.Keys.map((key) => {
                          return (
                            <div
                              className="convert-main-item"
                              hidden={this.state.indexKey !== key}
                              key={`main-item` + key}
                            >
                              <ComposeLocal
                                place={key}
                                width={650}
                                height={975}
                                type={1}
                                finished={(pic: any) => {
                                  this.Finished[key] = pic
                                }}
                                pid={this.state.product.pid}
                              />
                            </div>
                          )
                        })
                      ) : (
                        this.Keys.map((key) => {
                          return (
                            <div
                              className="convert-main-item"
                              hidden={this.state.indexKey !== key}
                              key={`main-item` + key}
                            >
                              <Three
                                place={key}
                                width={650}
                                height={975}
                                type={1}
                                objfile={this.state.product.books}
                                finished={(pic: any) => {
                                  this.Finished[key] = pic
                                }}
                                pid={this.state.product.pid}
                              />
                            </div>
                          )
                        })
                      )
                    ) : (
                      <img
                        src={Common.getThumb(
                          this.state.product.thumbs,
                          650,
                          975
                        )}
                        width="650"
                        height="975"
                      />
                    ))}
                </Col>
              </Row>
              <Row
                className="product-info-des"
                style={{
                  minHeight: 220,
                  margin: '20px 0'
                }}
              >
                <Card
                  loading={!this.state.ready}
                  title="About This Product"
                  hoverable
                >
                  {this.state.ready && (
                    <Row type="flex" justify="space-between">
                      <Col className="product-info" span={12}>
                        <h2>Style: {this.state.product.name}</h2>
                        <p>{this.state.product.describe}</p>
                        <p>{this.state.product.detail}</p>
                      </Col>
                      <Col
                        className="product-thumbs"
                        span={5}
                        style={{
                          height: '150px',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={Common.getThumb(
                            this.state.product.thumbs,
                            150,
                            150
                          )}
                          width={150}
                        />
                      </Col>
                    </Row>
                  )}
                </Card>
              </Row>
            </Col>
            <Col span={8}>
              <Row className="product-tip" style={{ height: 40 }}>
                Sold by RIGHR 100% Satisfaction Made to Order
              </Row>
              <Row
                className="product-info-title"
                type="flex"
                justify="space-between"
              >
                <Col span={24}>
                  <h2>{this.state.name}</h2>
                </Col>
                <Col style={{ lineHeight: '30px' }}>
                  US$
                  {this.state.product.priceshow} <small> per shirt</small>{' '}
                </Col>
                {this.state.ready && (
                  <Col>
                    <Rate disabled defaultValue={5} value={this.state.stars} />
                  </Col>
                )}
              </Row>
              {this.state.ready && (
                <Row className="product-size">
                  <Divider orientation="left" style={{ marginBottom: 5 }}>
                    Size
                  </Divider>
                  {this.state.product.items.length > 0 && (
                    <Select
                      defaultValue={this.state.product.items[0].sizeName}
                      value={this.state.size}
                      style={{ width: '50%' }}
                      onChange={(value) => {
                        this.setState({
                          size: value
                        })
                      }}
                    >
                      {this.state.product.items.map((item: any) => {
                        return (
                          <Option value={item.size} key={`spec-${item.size}`}>
                            {item.sizeName}
                          </Option>
                        )
                      })}
                    </Select>
                  )}
                </Row>
              )}
              <Row className="product-quantity">
                <Divider orientation="left" style={{ marginBottom: 5 }}>
                  Quantity
                </Divider>
                <InputNumber
                  min={1}
                  defaultValue={1}
                  value={this.state.quantity}
                  step={1}
                  precision={0}
                  style={{ width: '50%' }}
                  onChange={(value) => {
                    this.setState({
                      quantity: value
                    })
                  }}
                />
              </Row>
              <Row className="product-compose-operate" id="product-compose" />
              <Row className="product-action">
                {this.state.ready &&
                  (this.state.product.iscombinepic &&
                    this.Keys.map((key) => {
                      if (this.state.indexKey === key) {
                        return (
                          <div
                            className="convert-main-item"
                            hidden={this.state.indexKey !== key}
                            key={`main-item` + key}
                          >
                            <ComposeOption
                              place={key}
                              dimension={this.state.product.dimension}
                              pid={this.state.product.pid}
                            />
                          </div>
                        )
                      }
                    }))}
              </Row>
              <Row
                className="product"
                type="flex"
                justify="space-between"
                style={{ marginTop: 20 }}
              >
                <Col span={10} style={{ marginTop: 20 }}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    icon="heart"
                    onClick={this.addFavorite.bind(this)}
                  >
                    Like
                  </Button>
                </Col>
                <Col span={10} style={{ marginTop: 20 }}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    icon="shopping-cart"
                    onClick={this.addCart.bind(this)}
                  >
                    Add to Cart
                  </Button>
                </Col>
              </Row>
              <Row className="share-plus-box" style={{ marginTop: 20 }}>
                <SharePlus />
              </Row>
            </Col>
          </Row>
        )}

        <Modal
          width={140}
          style={{
            height: 140,
            borderRadius: '100%',
            overflow: 'hidden'
          }}
          centered
          bodyStyle={{
            padding: 10
          }}
          closable={false}
          footer={null}
          keyboard={false}
          maskClosable={false}
          visible={this.state.progress}
        >
          <Progress type="circle" percent={this.state.percent} />
        </Modal>
        {this.state.product && (
          <Comment
            pid={this.state.product.pid}
            dgid={this.props.match.params.dgid}
          />
        )}
      </div>
    )
  }
  addFavorite() {
    if (Common.isLogin()) {
      FavoriteService.addFavorite(
        this.state.product.pid,
        this.props.match.params.dgid * 1
      ).then((res: any) => {
        if (res.stat === 'OK') {
          message.success('add Favorite Success!')
        } else {
          message.warning('add Favorite faile!')
        }
      })
    } else {
      message.warning('Please Login and use again!')
    }
  }
  Finished: { [key: string]: any } = {}
  getFinished() {
    return new Promise(async (resolve, reject) => {
      let result = {
        pics: [] as string[],
        index: 0
      }
      let Tasks = this.Keys.map(() => {
        return this.tansUploadBase.bind(this)
      })
      for (let Task of Tasks) {
        result = await Task(this.Finished[this.Keys[result.index]], result)
      }
      resolve(result.pics)
    })
  }
  tansUploadBase(base64: string, result: any): Promise<any> {
    return new Promise((resolve, reject) => {
      //防止同时上传导致个别上传失败
      UpService.tansUploadBase(base64).then((res) => {
        this.setState({
          percent: Math.ceil(((result.index + 1) / this.Keys.length) * 100)
        })
        result.pics.push(res.uploadId)
        result.index++
        resolve(result)
      })
    })
  }
  async addCart() {
    this.setState({
      progress: true,
      percent: 0
    })
    let picids = this.state.product.iscombinepic
      ? await this.getFinished()
      : _.values(this.Finished)
    this.setState({
      percent: 100
    })
    ShoppingService.addGoods({
      cid: store.getState().carts.cid,
      pid: this.state.product.pid,
      size: this.state.size,
      count: this.state.quantity,
      picids: picids,
      dgid: this.props.match.params.dgid * 1,
      processData: {
        compose: store.getState().product.compose,
        product: this.state.product,
        did: this.props.match.params.did * 1
      }
    }).then((res: any) => {
      if (res.stat === 'OK') {
        message.success('Add shopping cart Success!')
      }
      cartCommon.getCart()
      this.setState({
        progress: false
      })
    })
  }
  addScore(value: number) {
    ScoreService.addScore(
      this.state.product.pid,
      value,
      this.props.match.params.dgid * 1
    ).then((res) => {
      if (res.stat === 'OK') {
        message.success('Score success!')
        ScoreService.getScore(
          this.state.product.pid,
          this.props.match.params.dgid * 1
        ).then((res) => {
          this.setState({
            stars: Number(res.average)
          })
        })
      } else {
        message.error('Please do not repeat the score.!')
      }
    })
  }
  getProductInfo() {
    this.setState({
      ready: false
    })
    DesignerService.getDesignerGoodsInfo(this.props.match.params.dgid * 1).then(
      (res) => {
        let { stat, info } = res
        if (stat === 'OK') {
          //获取面
          this.Keys = Object.keys(info.product.binditems).filter((key) => {
            return info.product.binditems[key].main !== ''
          })
          this.Keys = _.intersection(window.Place, this.Keys)
          Promise.all([
            ProductService.getProductInfo(info.pid),
            DesignerService.getDesigner(this.props.match.params.did * 1),
            ScoreService.getScore(info.pid, this.props.match.params.dgid * 1)
          ]).then(([product, designer, score]) => {
            this.setState({
              product: product.product,
              ready: true,
              indexKey: this.Keys[0],
              size: product.product.items[0].size,
              quantity: 1,
              desgin: designer.user,
              name: info.name,
              stars: score.count ? Number(score.average) : 5
            })
          })
          store.dispatch({
            type: 'SET_COMPOSE_INIT',
            product: {
              compose: { ...info.processData.compose },
              global: info.product.dimension !== 1,
              place: this.Keys[0]
            }
          })
        }
      }
    )
  }
  componentDidUpdate(PreProps: RouteComponentProps<any>, PreState: State) {
    if (
      PreProps.match.params.dgid !== this.props.match.params.dgid ||
      PreProps.match.params.did !== this.props.match.params.did
    ) {
      this.getProductInfo()
    }
  }
  componentDidMount() {
    this.getProductInfo()
  }
  componentWillUnmount() {}
}
