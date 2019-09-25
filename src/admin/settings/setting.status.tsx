import { Button, Form, Input, message, Radio, Select, Tabs } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SysmsgService from '@/services/sysmsg'

const { TextArea } = Input
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
interface State {
  business: boolean
  notice: string
}
const Option = Select.Option
const FormItem = Form.Item
const TabPane = Tabs.TabPane

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
      business: true,
      notice: ''
    }
  }
  handleSubmit = (e: Event) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      SysmsgService.setBusinessInfo(values).then((res) => {
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
          <FormItem {...formItemLayout} label="状态设置">
            {getFieldDecorator('business', {
              rules: [{ required: true, message: '状态设置' }],
              initialValue: this.state.business
            })(
              <RadioGroup name="radiogroup">
                <Radio value={true}>开启商城</Radio>
                <Radio value={false}>暂停营业</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="信息">
            {getFieldDecorator('notice', {
              rules: [{ required: true, message: '信息' }],
              initialValue: this.state.notice
            })(<TextArea rows={10} />)}
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
    SysmsgService.getBusinessInfo().then((res) => {
      if (res.stat === 'OK') {
        let info = res.info
        this.setState({
          business: info.business,
          notice: info.notice
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
