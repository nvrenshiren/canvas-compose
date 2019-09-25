import { Button, Form, Input, message, Select, Tabs } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SysmsgService from '@/services/sysmsg'

const Search = Input.Search
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

interface Props {
  form: WrappedFormUtils
}
interface State {
  userName: string
  password: string
  mailServerHost: string
  mailServerPort: number
}

const FormItem = Form.Item

class UserInfo extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: State
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      userName: '',
      password: '',
      mailServerHost: '',
      mailServerPort: 0
    }
  }
  handleSubmit = (e: Event) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      SysmsgService.setEmailInfo(values).then((res) => {
        if (res.stat === 'OK') {
          this.getData()
          message.success('保存成功')
        }
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div
        className="main"
        style={{
          background: '#fff',
          width: '100%',
          padding: '50px 150px 50px 50px',
          minHeight: '700px'
        }}
      >
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem {...formItemLayout} label="服务器">
            {getFieldDecorator('mailServerHost', {
              rules: [{ required: true, message: '服务器' }],
              initialValue: this.state.mailServerHost || 'smtp.qq.com'
            })(<Input type="text" placeholder="服务器" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="端口">
            {getFieldDecorator('mailServerPort', {
              rules: [{ required: true, message: '端口' }],
              initialValue: this.state.mailServerPort || 110
            })(<Input type="number" placeholder="端口" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="发件邮箱">
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '发件邮箱' }],
              initialValue: this.state.userName || ''
            })(<Input type="text" placeholder="发件邮箱" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="发件密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '发件密码' }],
              initialValue: this.state.password || ''
            })(<Input type="text" placeholder="发件密码" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="测试邮箱">
            <Search
              placeholder="测试邮箱"
              onSearch={(value) => {
                SysmsgService.testMail(value).then((res) => {
                  
                })
              }}
              enterButton="测试"
            />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
  getData() {
    SysmsgService.getEmailInfo().then((res) => {
      if (res.stat === 'OK') {
        this.setState({
          userName: res.info.userName,
          password: res.info.password,
          mailServerHost: res.info.mailServerHost,
          mailServerPort: res.info.mailServerPort
        })
      }
    })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUnmount() {}
}

export default Form.create<Props>({})(UserInfo)
