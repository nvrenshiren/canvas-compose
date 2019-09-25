import { Form, Input, Rate, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

interface Props {
  form: WrappedFormUtils
  type: string
  item?: Item
}

interface Item {
  otid?: number
  content: string
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
const { TextArea } = Input
const FormItem = Form.Item
const RadioGroup = Radio.Group

class ContetAboutForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.item &&
          getFieldDecorator('item', {
            initialValue: this.props.item
          })(<></>)}
        <FormItem {...formItemLayout} label="Rate">
          {getFieldDecorator('rate', {
            initialValue: 5
          })(<Rate allowClear={false} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Content">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input content!' }],
            initialValue: '面料讲究,做工细致,款式新颖,服务认真!'
          })(<TextArea rows={4} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Share Pic">
          {getFieldDecorator('share', {
            initialValue: true
          })(
            <RadioGroup>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ContetAboutForm)
