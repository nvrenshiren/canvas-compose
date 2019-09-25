import { Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

interface Props {
  form: WrappedFormUtils
  type: string
  item?: Item
}

interface Item {
  oldpwd: string
  newpwd: string
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 20 }
  }
}

const FormItem = Form.Item

class UserForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        <FormItem {...formItemLayout} label="Old password">
          {getFieldDecorator('oldpwd', {
            rules: [{ required: true, message: 'Old password' }],
            initialValue: (this.props.item && this.props.item.oldpwd) || ''
          })(
            <Input
              type="password"
              placeholder="Plese input your old password"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="New password">
          {getFieldDecorator('newpwd', {
            rules: [
              {
                required: true,
                message: 'Plese input your new password'
              },
              {
                min: 8,
                message:
                  'The length of the new password can not be less than 8 bits.'
              }
            ],
            initialValue: (this.props.item && this.props.item.newpwd) || ''
          })(
            <Input
              type="password"
              placeholder="Plese input your new password"
            />
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(UserForm)
