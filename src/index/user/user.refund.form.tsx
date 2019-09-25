import * as React from 'react'
import { Form, Icon, Input, Button, Row, Col, Select, InputNumber } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import Common from '@/common/common'
import product from '@/services/product'
import ImageUp from '@/util/upload/normal.upload'
import AftersoldService from '@/services/aftersold'
import ProductService from '@/services/product'

const Option = Select.Option
const Search = Input.Search
const ButtonGroup = Button.Group
interface Props {
  form: WrappedFormUtils
  id: number
  type: string
  item?: Item
}

interface Item {
  otid: number
  count?: number
  amount: number
  type: number
  content: string
  fullname: string
  phone: string
  postcode: number
  address: string
  country: string
  province: string
  size: number
  total?: number
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}

const FormItem = Form.Item

/**
 *"amount": number //数量
  "otid": number //订单子项id
  "content": string //详情
  "type":number //类型（1：退换，2退货）
  "size"?: number //规格id（退换才有）
  "phone"?: string //电话（退换才有）
  "postcode"?: number //邮编（退换才有）
  "province"?: string //省份（退换才有）
  "fullname"?: string //收件人名字（退换才有）
  "country": string //国家（退换才有）
  "address"?: string //地址（退换才有）
 */

class ItemForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      type: 1,
      listSpecifications: []
    }
  }
  state: any
  render() {
    console.log(this.props.item)
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem
            {...formItemLayout}
            label="otid"
            style={{ display: 'none' }}
          >
            {getFieldDecorator('otid', {
              rules: [{ required: false, message: 'otid' }],
              initialValue: this.props.item.otid
            })(<Input type="number" placeholder="otid" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="amount">
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: 'amount' }],
            initialValue:
              (this.props.item && this.props.item.count) || 0
          })(<InputNumber min={1} max={this.props.item.count} placeholder="amount" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="type">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: 'type' }],
            initialValue: (this.props.item && this.props.item.type) || 1
          })(
            <Select
              onChange={(val: number) =>
                this.setState({
                  type: val
                })
              }
            >
              <Option value={1}>Exchange goods</Option>
              <Option value={2}>Return of goods</Option>
            </Select>
          )}
        </FormItem>
        {this.state.type === 1 && (
          <>
            <FormItem {...formItemLayout} label="fullname">
              {getFieldDecorator('fullname', {
                rules: [{ required: true, message: 'fullname' }],
                initialValue:
                  (this.props.item && this.props.item.fullname) || ''
              })(<Input type="text" placeholder="fullname" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="phone">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'phone' }],
                initialValue: (this.props.item && this.props.item.phone) || ''
              })(<Input type="text" placeholder="phone" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="size">
              {getFieldDecorator('size', {
                rules: [{ required: true, message: 'size' }],
                initialValue: (this.props.item && this.props.item.size) || ''
              })(
              <Select>
                {
                  this.state.listSpecifications.map((v:any, i:number) => {
                    return (<Option key={v.stid} value={v.stid}>{v.name}</Option>)
                  })
                }
              </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="postcode">
              {getFieldDecorator('postcode', {
                rules: [{ required: true, message: 'postcode' }],
                initialValue:
                  (this.props.item && this.props.item.postcode) || ''
              })(<InputNumber min={0} placeholder="postcode" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="country">
              {getFieldDecorator('country', {
                rules: [{ required: true, message: 'country' }],
                initialValue: (this.props.item && this.props.item.country) || ''
              })(<Input type="text" placeholder="country" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="province">
              {getFieldDecorator('province', {
                rules: [{ required: true, message: 'province' }],
                initialValue:
                  (this.props.item && this.props.item.province) || ''
              })(<Input type="text" placeholder="province" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="address">
              {getFieldDecorator('address', {
                rules: [{ required: true, message: 'address' }],
                initialValue: (this.props.item && this.props.item.address) || ''
              })(<Input type="text" placeholder="address" />)}
            </FormItem>
          </>
        )}
        <FormItem {...formItemLayout} label="content">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'content' }],
            initialValue: (this.props.item && this.props.item.content) || ' '
          })(<Input type="number" placeholder="content" />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {
    ProductService.listSpecifications().then(res => {
      if(res.stat === 'OK') {
        this.setState({
          listSpecifications: res.rows[0].items
        })
      }
    })
  }
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ItemForm)
