import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

interface Props {
  form: WrappedFormUtils
  loading: boolean
  submit: Function
}

class LoginForm extends React.Component<Props> {
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.props.submit(values)
      }
    })
  }
  render() {
    const FormItem = Form.Item
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户名!' }]
          })(<Input prefix={<Icon type="user" />} type="text" placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('pwd', {
            rules: [{ required: true, message: '请输入密码!' }]
          })(<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.loading} size="large" style={{ width: '100%' }}>
            {this.props.loading ? '登录中....' : '登录'}
          </Button>
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
}
export default Form.create<Props>()(LoginForm)
