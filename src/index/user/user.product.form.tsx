import { Form, Input, InputNumber, Radio, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import { DesginInfo } from '@/interfaces/mode'

interface Props {
  form: WrappedFormUtils
  type: string
  item: DesginInfo
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

class ProductForm extends React.Component<Props> {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.type === 'edit' &&
          getFieldDecorator('dgid', {
            initialValue: this.props.item.dgid
          })(<Input hidden={true} />)}
        <FormItem {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input product name.' }],
            initialValue: this.props.item ? this.props.item.name : ''
          })(<Input type="text" placeholder="Please input product name." />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Notice">
          {getFieldDecorator('notice', {
            initialValue: this.props.item ? this.props.item.notice : ''
          })(<Input type="text" placeholder="Please input product notice." />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
}
export default Form.create<Props>({})(ProductForm)
