import { Form, InputNumber, Rate } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

interface Props {
  form: WrappedFormUtils
  type: string
  item?: Item
}

interface Item {
  pid?: number
  dgid?: number
  point?: number
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

class ContetAboutForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let self = this
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem {...formItemLayout} label="pid" style={{ display: 'none' }}>
            {getFieldDecorator('pid', {
              rules: [{ required: false, message: 'pid' }],
              initialValue: this.props.item.pid
            })(<InputNumber placeholder="pid" />)}
          </FormItem>
        )}
        {this.props.item && (
          <FormItem
            {...formItemLayout}
            label="dgid"
            style={{ display: 'none' }}
          >
            {getFieldDecorator('dgid', {
              rules: [{ required: false, message: 'dgid' }],
              initialValue: this.props.item.dgid
            })(<InputNumber placeholder="dgid" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="评分">
          {getFieldDecorator('point', {
            rules: [{ required: true, message: '评分' }],
            initialValue: (this.props.item && this.props.item.point) || ''
          })(<Rate allowHalf />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ContetAboutForm)
