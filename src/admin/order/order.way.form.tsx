import { Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

interface Props {
  form: WrappedFormUtils
  pid: number
  type: string
  item?: Item
}

interface Item {
  did?: number
  name: number
  price: string
  detail: string
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

class ProductThemeForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem {...formItemLayout} label="did" style={{ display: 'none' }}>
            {getFieldDecorator('did', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.did
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '名称' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="价格">
          {getFieldDecorator('price', {
            rules: [{ required: true, message: '价格' }],
            initialValue: (this.props.item && this.props.item.price) || ''
          })(<Input type="number" placeholder="价格" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="描述">
          {getFieldDecorator('detail', {
            rules: [{ required: true, message: '描述' }],
            initialValue: (this.props.item && this.props.item.detail) || ''
          })(<Input type="text" placeholder="描述" />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ProductThemeForm)
