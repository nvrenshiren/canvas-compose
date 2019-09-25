import * as React from 'react'
import Common from '@/common/common'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import ProductService from '@/services/product'
import { Row, Select, Col, Input, InputNumber } from 'antd'

interface Props {
  pid?: number
  type: string
  items?: {
    sold?: number
    amount?: number
    stat?: number
    size?: number
    sizeName?: string
    price?: number
    itemCode?: string
    pid?: number
    ptid?: number
  }[]
  form: WrappedFormUtils
}

interface Item {
  name?: string //和上面规格的sizeName对应
  pic?: string
  sid?: number //父规格ID
  sort?: number
  stid?: number //和上面规格的size对应
  price?: number
  amount?: number
  code?: string
}

interface State {
  name: string
  items: Item[]
}

const Option = Select.Option
export default class extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.state = {
      name: '',
      items: []
    }
  }
  state: State
  render() {
    return (
      <div className="product-info-spec">
        <Row style={{ marginBottom: 15 }}>
          <Select placeholder="请选择商品规格" defaultValue={1} disabled>
            <Option value={1}>{this.state.name}</Option>
          </Select>
        </Row>
        <Row className="spec-items">
          {this.state.items.length > 0 &&
            this.state.items.map((item, index) => {
              return (
                <Row
                  className="spec-item"
                  type="flex"
                  justify="space-between"
                  key={`spec-item-${index}`}
                  style={{ marginBottom: 15 }}
                  gutter={20}
                >
                  <Col span={6} style={{ textAlign: 'center' }}>
                    <Input
                      type="text"
                      disabled
                      defaultValue={item.name}
                      addonBefore="尺码"
                    />
                  </Col>
                  <Col span={6} style={{ textAlign: 'center' }}>
                    <Input
                      type="number"
                      onChange={(e) => {
                        this.onChange(index, 'price', e.target.value)
                      }}
                      value={this.state.items[index].price}
                      addonBefore="价格"
                    />
                  </Col>
                  <Col span={6} style={{ textAlign: 'center' }}>
                    <Input
                      type="number"
                      onChange={(e) => {
                        this.onChange(index, 'amount', e.target.value)
                      }}
                      value={this.state.items[index].amount}
                      addonBefore="库存"
                    />
                  </Col>
                  <Col span={6} style={{ textAlign: 'center' }}>
                    <Input
                      type="text"
                      onChange={(e) => {
                        this.onChange(index, 'code', e.target.value)
                      }}
                      value={this.state.items[index].code}
                      addonBefore="编码"
                    />
                  </Col>
                </Row>
              )
            })}
        </Row>
      </div>
    )
  }
  onChange(index: number, filed: string, value: any) {
    let itemss = this.state.items.concat([])
    let temp = Object.assign({}, itemss[index])
    temp[filed] = value
    itemss[index] = temp
    this.setState({
      items: itemss.concat([])
    })
  }
  componentDidUpdate(preProps: Props, preState: State) {
    if (JSON.stringify(preState.items) !== JSON.stringify(this.state.items)) {
      let items: any[] = []
      this.state.items.map((item) => {
        let { sort, pic, name, sid, ...newItem } = item
        items.push(newItem)
      })
      this.props.form.setFieldsValue({ productItems: items })
    }
  }
  componentDidMount() {
    ProductService.listSpecifications().then((res: any) => {
      if (res.stat === 'OK') {
        let items = res.rows[0].items as Item[]
        items.map((item, index) => {
          let hasitem = this.props.items.filter((has) => {
            return has.size === item.stid
          })
          if (hasitem.length > 0) {
            items[index].code = hasitem[0].itemCode
            items[index].price = hasitem[0].price
            items[index].amount = hasitem[0].amount
          } else {
            items[index].code = `NP-${Common.getRan(8)}`
            items[index].price = 99
            items[index].amount = 99
          }
        })
        this.setState({
          name: res.rows[0].name,
          items: items
        })
      }
    })
  }
  componentWillUnmount() {}
}
