import Common from '@/common/common'
import ProductService from '@/services/product'
import ImageUp from '@/util/upload/normal.upload'
import { Form, Input, Radio, Select, Tabs } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Bing2D from './2d.form'
import SpecForm from './spec.from'

interface Props {
  form: WrappedFormUtils
  pid: number
  type: string
}

interface SpecItem {
  sold?: number
  amount?: number
  stat?: number
  size?: number
  sizeName?: string
  price?: number
  itemCode?: string
  pid?: number
  ptid?: number
}

interface BindItem {
  [key: string]: {
    main: string
    shadow: string
    mask: string[]
  }
}

interface ProductItem {
  productItems?: SpecItem[]
  items?: SpecItem[]
  name: string
  iscombinepic: boolean
  priceshow: string
  amount: number
  status: number
  fabid: number
  dimension: number
  catids: number[]
  books: string
  thumbs: string
  binditems: BindItem
  pid: number
  proCode: string
  sold: number
  describe: string
  detail: string
}

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TabPane = Tabs.TabPane
const TextArea = Input.TextArea

const ItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}
interface State {
  product: ProductItem
  ready: boolean
  cats: any[]
}

class ProductForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      product: {
        items: [],
        name: '',
        iscombinepic: true,
        priceshow: '',
        amount: 99,
        status: 0,
        fabid: 0,
        dimension: 1,
        catids: [],
        books: '',
        thumbs: '',
        binditems: {},
        pid: 0,
        proCode: '',
        sold: 0,
        detail: '',
        describe: ''
      },
      ready: false,
      cats: []
    }
    //随机商品编号
    this.proCode = 'PR-' + Common.getRan(7)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        <Tabs type="card" defaultActiveKey="base" tabBarGutter={20}>
          <TabPane tab="基本信息" key="base" forceRender={true}>
            {this.props.type === 'edit' &&
              getFieldDecorator('pid', {
                initialValue: this.props.pid
              })(<Input type="text" placeholder="商品ID" hidden />)}
            <FormItem {...ItemLayout} label="商品名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入商品名称!' }],
                initialValue: this.state.product.name
              })(<Input type="text" placeholder="商品名称" />)}
            </FormItem>
            <FormItem {...ItemLayout} label="商品编号">
              {getFieldDecorator('proCode', {
                rules: [{ required: true, message: '请输入商品编号!' }],
                initialValue:
                  this.props.type === 'edit'
                    ? this.state.product.proCode
                    : this.proCode
              })(<Input type="text" placeholder="商品编号" />)}
            </FormItem>
            <FormItem {...ItemLayout} label="商品价格">
              {getFieldDecorator('priceshow', {
                rules: [{ required: true, message: '请输入商品价格!' }],
                initialValue: this.state.product.priceshow
              })(<Input type="number" placeholder="商品价格" />)}
            </FormItem>
            <FormItem {...ItemLayout} label="商品库存">
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: '请输入商品库存!' }],
                initialValue: this.state.product.amount
              })(<Input type="number" placeholder="商品库存" />)}
            </FormItem>
            <FormItem {...ItemLayout} label="商品状态">
              {getFieldDecorator('status', {
                initialValue: this.state.product.status
              })(
                <RadioGroup>
                  <Radio value={0}>出售中</Radio>
                  <Radio value={1}>放入仓库</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...ItemLayout} label="商品分类">
              {getFieldDecorator('catids', {
                rules: [
                  { required: true, type: 'array', message: '请选择商品分类!' }
                ],
                initialValue: this.state.product.catids
              })(
                <Select mode="multiple" placeholder="请选择商品分类">
                  {this.state.cats.map((cat) => {
                    return (
                      <Option value={cat.catid} key={cat.catid}>
                        {cat.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem {...ItemLayout} label="商品面料">
              {getFieldDecorator('fabid', {
                rules: [{ required: true }],
                initialValue: this.state.product.fabid || '请选择商品面料'
              })(
                <Select placeholder="请选择商品面料">
                  {window.fabric.map((fab) => {
                    return (
                      <Option key={fab.value + 'fabid'} value={fab.value}>
                        {fab.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </FormItem>
            {this.state.ready && (
              <FormItem {...ItemLayout} label="商品相册">
                {getFieldDecorator('thumbs', {
                  rules: [{ required: true, message: '请上传商品图片' }],

                  initialValue: this.state.product.thumbs
                })(
                  <ImageUp
                    subname="商品相册"
                    default={[this.state.product.thumbs]}
                    return={(file: string[]) => {
                      this.props.form.setFieldsValue({ thumbs: file[0] })
                    }}
                    number={1}
                  />
                )}
              </FormItem>
            )}
          </TabPane>
          <TabPane tab="定制合成" key="diy" forceRender={true}>
            <FormItem {...ItemLayout} label="是否合成">
              {getFieldDecorator('iscombinepic', {
                initialValue: this.state.product.iscombinepic
              })(
                <RadioGroup>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>

            <FormItem {...ItemLayout} label="合成模式">
              {getFieldDecorator('dimension', {
                initialValue: this.state.product.dimension
              })(
                <RadioGroup>
                  <Radio value={1}>2D</Radio>
                  <Radio value={2}>3D</Radio>
                </RadioGroup>
              )}
            </FormItem>
            {this.state.ready && (
              <FormItem {...ItemLayout} label="2D版型">
                {getFieldDecorator('binditems', {
                  initialValue: this.state.product.binditems
                })(
                  <Bing2D
                    binditems={this.state.product.binditems}
                    form={this.props.form}
                  />
                )}
              </FormItem>
            )}
            {this.state.ready && (
              <FormItem {...ItemLayout} label="3D模型">
                {getFieldDecorator('books', {
                  rules: [{ required: false, message: '请上传3D模型' }],
                  initialValue: this.state.product.books
                })(
                  <ImageUp
                    subname="3D模型"
                    accept="obj/*"
                    default={[this.state.product.books]}
                    return={(file: string[]) => {
                      this.props.form.setFieldsValue({ books: file[0] })
                    }}
                    number={1}
                  />
                )}
              </FormItem>
            )}
          </TabPane>
          <TabPane tab="商品介绍" key="info" forceRender={true}>
            <FormItem {...ItemLayout} label="商品内容">
              {getFieldDecorator('detail', {
                initialValue: this.state.product.detail
              })(<TextArea autosize={{ minRows: 5, maxRows: 10 }} />)}
            </FormItem>
            <FormItem {...ItemLayout} label="商品描述">
              {getFieldDecorator('describe', {
                initialValue: this.state.product.describe
              })(<TextArea autosize={{ minRows: 5, maxRows: 10 }} />)}
            </FormItem>
          </TabPane>
          <TabPane tab="商品规格" key="productItems" forceRender={true}>
            {this.state.ready && (
              <FormItem {...ItemLayout} label="商品规格">
                {getFieldDecorator('productItems', {
                  rules: [{ required: true, message: '请商品规格' }],
                  initialValue: this.state.product.items
                })(
                  <SpecForm
                    pid={this.props.pid}
                    type={this.props.type}
                    items={this.state.product.items}
                    form={this.props.form}
                  />
                )}
              </FormItem>
            )}
          </TabPane>
        </Tabs>
      </Form>
    )
  }
  proCode: string
  state: State
  componentWillMount() {}
  componentDidMount() {
    if (this.props.type === 'edit') {
      Promise.all([
        ProductService.getProductInfo(this.props.pid),
        ProductService.listCatagorys()
      ]).then((result: any) => {
        this.setState({
          product: result[0].product,
          cats: result[1].rows,
          ready: true
        })
      })
    } else {
      ProductService.listCatagorys().then((res: any) => {
        if (res.stat === 'OK') {
          this.setState({
            cats: res.rows,
            ready: true
          })
        }
      })
    }
  }
}
export default Form.create<Props>()(ProductForm)
