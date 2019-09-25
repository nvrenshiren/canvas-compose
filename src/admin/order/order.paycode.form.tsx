import { Form, Input, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
const Option = Select.Option
interface Props {
  form: WrappedFormUtils
  id: number
  type: string
  item?: Item
}

interface Item {
  couid?: number
  code: string
  discount: number
  type: number
  describe: string
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

class ItemForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  code: string = 'c' + new Date().getTime()
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem {...formItemLayout} label="couid" style={{ display: 'none' }}>
            {getFieldDecorator('couid', {
              rules: [{ required: false, message: 'couid' }],
              initialValue: this.props.item.couid
            })(<Input type="number" placeholder="couid" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="优惠券码">
          {getFieldDecorator('code', {
            rules: [{ required: true, message: '优惠券码' }],
            initialValue: (this.props.item && this.props.item.code) || this.code
          })(<Input type="text" placeholder="优惠券码" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="折扣">
          {getFieldDecorator('discount', {
            rules: [{ required: true, message: '折扣' }],
            initialValue: (this.props.item && this.props.item.discount) || ''
          })(<Input type="number" placeholder="折扣" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="折扣类型">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '描述' }],
            initialValue: (this.props.item && this.props.item.type) || 1
          })(
            <Select>
              <Option value={1}>打折</Option>
              <Option value={2}>减免</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {getFieldDecorator('describe', {
            rules: [{ required: true, message: '描述' }],
            initialValue: (this.props.item && this.props.item.describe) || ''
          })(<Input type="text" placeholder="描述" />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ItemForm)
