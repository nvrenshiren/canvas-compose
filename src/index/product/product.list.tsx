import * as React from 'react'
import Common from '@/common/common'
import Grid from '@/util/grid/grid'
import Link from 'umi/link'
import ProductService from '@/services/product'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import store from '@/store/store'
import { Card, Col, Divider, Radio, Rate, Row } from 'antd'
import { CatItem } from '@/interfaces/mode'
import { RadioChangeEvent } from 'antd/lib/radio'
import { RouteComponentProps } from 'react-router'
import './product.list.less'

interface State {
  isLoading: boolean
  priceMin: number
  priceMax: number
  fabid: number
  cats: CatItem[]
  flower: string
}

const { Meta } = Card
const RadioGroup = Radio.Group
const RadioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px'
}
const Columns = [
  {
    field: 'product',
    grid: true,
    formatter: (item: any) => {
      return (
        <Card
          hoverable
          style={{ width: 280 }}
          cover={
            <img src={Common.getThumb(item.thumbs, 280, 280)} width="280" />
          }
          actions={[
            <span className="item-title">
              US$
              {item.priceshow}
            </span>,
            // <Icon
            //   type="heart-o"
            //   onClick={(e) => {
            //     e.stopPropagation()
            //     if (Common.isLogin()) {
            //       FavoriteService.addFavorite(item.pid).then((res: any) => {
            //         if (res.stat === 'OK') {
            //           message.success('add Favorite Success!')
            //         } else {
            //           message.warning('add Favorite faile!')
            //         }
            //       })
            //     } else {
            //       message.warning('Please Login and use again!')
            //     }
            //   }}
            // />,
            <Rate disabled defaultValue={5} value={item.average * 1} />
          ]}
        >
          <Meta title={item.name} description={item.name} />
        </Card>
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
    this.state = {
      isLoading: true,
      priceMin: 0,
      priceMax: 99999,
      fabid: 0,
      cats: [],
      flower: '0'
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  state: State
  render() {
    return (
      <div className="product-list-main main" ref="product-list-main">
        <Row className="product-list-des" type="flex" justify="center">
          <Col span={10}>
            <Divider>CREAT YOUR OWN </Divider>
            <div>MAKE AN IMPRESSION</div>
            <div>UNIQUELY INDIVIDUAL AND 100% YOU !</div>
          </Col>
        </Row>
        <Row className="product-list-warp" type="flex" justify="space-between">
          <Col className="product-list-filter" span={6}>
            <div className="price filter-option">
              <h3>PRICE</h3>
              <RadioGroup
                onChange={(e: RadioChangeEvent) => {
                  this.listFilter('price', e.target.value)
                }}
                value={`${this.state.priceMin},${this.state.priceMax}`}
              >
                <Radio style={RadioStyle} value="0,99999">
                  All Price
                </Radio>
                <Radio style={RadioStyle} value="5,15">
                  US$5 to US$15
                </Radio>
                <Radio style={RadioStyle} value="15,25">
                  US$15 to US$25
                </Radio>
                <Radio style={RadioStyle} value="25,50">
                  US$25 to US$50
                </Radio>
                <Radio style={RadioStyle} value="50,75">
                  US$50 to US$75
                </Radio>
                <Radio style={RadioStyle} value="75,100">
                  US$75 to US$100
                </Radio>
                <Radio style={RadioStyle} value="100,99999">
                  US$100 to More
                </Radio>
              </RadioGroup>
            </div>
            <div className="fabric filter-option">
              <h3>MATERIAL</h3>
              <RadioGroup
                onChange={(e) => {
                  this.listFilter('fabid', e.target.value)
                }}
                value={this.state.fabid}
              >
                <Radio key={'fabric-0'} style={RadioStyle} value={0}>
                  所有
                </Radio>
                {window.fabric.map((fab) => {
                  return (
                    <Radio
                      key={'fabric-' + fab.value}
                      style={RadioStyle}
                      value={fab.value}
                    >
                      {fab.name}
                    </Radio>
                  )
                })}
              </RadioGroup>
            </div>
          </Col>
          <Col className="product-list-box" span={18}>
            <div className="product-cats">
              {this.state.cats.map((cat: CatItem) => {
                return (
                  <Link
                    key={'procat-' + cat.catid}
                    to={`/product/list/${cat.catid}/${this.state.flower}`}
                    className={
                      this.props.match.params.catid == cat.catid ? 'active' : ''
                    }
                  >
                    {cat.name}
                  </Link>
                )
              })}
            </div>
            <div className="product-list-items" id="list-scroll">
              <Grid
                columns={Columns}
                modules="product"
                getdata={this.getData.bind(this)}
                event={this.itemEvent.bind(this)}
                rowHeight={442}
                columnWidth={300}
                pagination={true}
                isLoading={this.state.isLoading}
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
  itemEvent(e: MouseEvent, item: any) {
    this.props.history.push(`/product/info/${item.pid}/${this.state.flower}`)
  }
  getData(
    pageIndex: number = 1,
    pageSize: number = 20,
    pagination: boolean = true
  ) {
    this.setState({
      isLoading: true
    })
    ProductService.searchProducts({
      catid: this.props.match.params.catid * 1,
      priceMin: this.state.priceMin,
      priceMax: this.state.priceMax,
      fabid: this.state.fabid,
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
  listFilter(key: string, value: any) {
    switch (key) {
      case 'fabid':
        this.setState({ fabid: value })
        break
      case 'price':
        let [priceMin, priceMax] = value.split(',')
        this.setState({ priceMin: priceMin * 1, priceMax: priceMax * 1 })
        break
    }
  }
  componentDidUpdate(prevProp: RouteComponentProps<any>, prevState: State) {
    let OldParams = Object.assign({}, prevState, { isLoading: true })
    let NewParams = Object.assign({}, this.state, { isLoading: true })
    if (
      this.props.match.params.catid !== prevProp.match.params.catid ||
      JSON.stringify(OldParams) !== JSON.stringify(NewParams)
    ) {
      document.getElementById('list-scroll').scrollTop = 0
      this.getData(1, store.getState().list.pageSize)
    }
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        cats: store.getState().cats,
        flower: this.props.match.params.flower
      })
    })
    this.getData(1, store.getState().list.pageSize)
  }
  componentWillUnmount() {
    //清空列表store
    this.setState = () => {
      return false
    }
  }
}
