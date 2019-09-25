import { Button, Form, InputNumber, message, Radio, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AftersoldService from '@/services/aftersold'
import Quill from '@/util/quill/quill'

const RadioGroup = Radio.Group

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
interface State {}
const Option = Select.Option
const FormItem = Form.Item
class UserInfo extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: any
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      exchangeTime: 0,
      returnTime: 0,
      canReturn: true,
      canExchange: true,
      content: ''
    }
  }
  handleSubmit = (e: Event) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      AftersoldService.setInfo(values).then((res) => {
        if (res.stat === 'OK') {
          this.getData()
          message.success('保存成功')
        }
      })
    })
  }
  render() {
    let userinfo = this.state.user
    const { getFieldDecorator } = this.props.form
    return (
      <div className="main" style={{ background: '#fff', width: '100%', padding: '50px 150px 50px 50px', minHeight: '700px' }}>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem {...formItemLayout} label="允许退货">
            {getFieldDecorator('canReturn', {
              rules: [{ required: true, message: 'Please input your nickName!' }],
              initialValue: this.state.canReturn
            })(
              <RadioGroup>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="允许换货">
            {getFieldDecorator('canExchange', {
              rules: [{ required: true, message: 'Please input your nickName!' }],
              initialValue: this.state.canExchange
            })(
              <RadioGroup>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="允许退货时间">
            {getFieldDecorator('returnTime', {
              rules: [{ required: true, message: '允许退货时间' }],
              initialValue: this.state.returnTime
            })(<InputNumber placeholder="" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="允许换货时间">
            {getFieldDecorator('exchangeTime', {
              rules: [{ required: true, message: '允许换货时间' }],
              initialValue: this.state.exchangeTime
            })(<InputNumber placeholder="" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="友情提示">
            {getFieldDecorator('content', {
              rules: [{ required: true, message: 'content' }],
              initialValue: this.state.content
            })(
              <Quill
                return={(val: any) => {
                  this.setState({
                    content: val
                  })
                }}
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
  getData() {
    AftersoldService.getInfo().then((res) => {
      if (res.stat == 'OK') {
        let info = res.info
        this.setState({
          exchangeTime: info.exchangeTime,
          returnTime: info.returnTime,
          canReturn: info.canReturn,
          canExchange: info.canExchange,
          content: info.content
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
