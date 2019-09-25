import { Form, Input, Select, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

interface Props {
  form: WrappedFormUtils
  type: string
  item?: Item
}

interface Item {
  uid?: number
  name: number
  pwd: number
  nickname: string
  email: string
  phone: string
  status: boolean
  designer: boolean
  remark: string
  type: number
  account: number
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
const Option = Select.Option
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

class UserForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      listTheme: []
    }
  }
  state: {
    listTheme: any[]
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form" autoComplete="no">
        {this.props.item && (
          <FormItem {...formItemLayout} label="uid" style={{ display: 'none' }}>
            {getFieldDecorator('uid', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.uid
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '用户名' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="用户名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="昵称">
          {getFieldDecorator('nickName', {
            initialValue: (this.props.item && this.props.item.nickname) || ''
          })(<Input type="text" placeholder="昵称" autoComplete="no"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('pwd', {
            initialValue: ''
          })(<Input type="password" placeholder="密码" autoComplete="no"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机">
          {getFieldDecorator('phone', {
            initialValue: (this.props.item && this.props.item.phone) || ''
          })(<Input type="text" placeholder="手机" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'email' }],
            initialValue: (this.props.item && this.props.item.email) || ''
          })(<Input type="text" placeholder="email" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator('status', {
            rules: [{ required: true, message: '状态' }],
            initialValue: (this.props.item && this.props.item.status) || false
          })(
            <RadioGroup>
              <Radio value={true}>正常</Radio>
              <Radio value={false}>待激活</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="角色">
          {getFieldDecorator('designer', {
            rules: [{ required: true, message: '角色' }],
            initialValue: (this.props.item && this.props.item.designer) || false
          })(
            <RadioGroup>
              <Radio value={false}>会员</Radio>
              <Radio value={true}>设计师</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="支付方式">
          {getFieldDecorator('type', {
            initialValue: (this.props.item && this.props.item.type) || 1
          })(
            <Select style={{ width: 120 }}>
              <Option value={1}>paypal</Option>
              <Option value={2}>alipay</Option>
              <Option value={3}>wechat</Option>
              <Option value={4}>mastercard</Option>
              <Option value={5}>payoneer</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="收款账号">
          {getFieldDecorator('account', {
            initialValue: (this.props.item && this.props.item.account) || ''
          })(<Input type="text" placeholder="account" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('remark', {
            initialValue: (this.props.item && this.props.item.email) || ''
          })(<TextArea rows={4} />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(UserForm)
