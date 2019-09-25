import * as React from 'react'
import { Form, Icon, Input, Button, Row, Col, Radio, message, Modal } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Common from '@/common/common'
import product from '@/services/product'
import * as _ from 'underscore'
import SubscribeService from '@/services/subscribe'
import Quill from '@/util/quill/quill'

const RadioGroup = Radio.Group

interface Props {
  form: WrappedFormUtils
  pid: number
  type: string
  item?: Item
}

interface Item {
  auid?: number
  title: number
  content: string
  hasmember: boolean
  hassubscribe: boolean
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
    this.initComponent()
  }
  state: any
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      title: '',
      content: '',
      hasmember: false,
      hassubscribe: false
    }
  }
  handleSubmit = (e: Event) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if(values.hasmember === false && values.hassubscribe === false) {
        Modal.error({
          title: '提示',
          content: '会员和订阅至少二选一',
        });
      }
      SubscribeService.massMail(values).then((res) => {
        if (res.stat === 'OK') {
          message.success('保存成功')
          this.setState({
            title: '',
            content: '',
            hasmember: false,
            hassubscribe: false
          })
        }
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let self = this
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
      <Form  onSubmit={this.handleSubmit.bind(this)} className="module-form">
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '名称' }],
            initialValue: (this.state.title) || ''
          })(<Input type="text" placeholder="名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="详情">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '详情' }],
            initialValue: (this.state.content) || ''
          })(
            <Quill
              return={(val:any)=>{
                this.props.form.setFieldsValue({
                  content: val
                })
              }}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否会员发送">
          {getFieldDecorator('hasmember', {
            rules: [{ required: true, message: '是否会员发送' }],
            initialValue: (this.state.hasmember) || false
          })(
            <RadioGroup>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </RadioGroup>)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否订阅用户发送">
          {getFieldDecorator('hassubscribe', {
            rules: [{ required: true, message: '是否订阅用户发送' }],
            initialValue: (this.state.hassubscribe) || false
          })(
            <RadioGroup>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </RadioGroup>)}
        </FormItem>
        <FormItem>
            <Button type="primary" htmlType="submit" style={{float: 'right'}}>
              保存
            </Button>
        </FormItem>
      </Form>
      </div>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ContetAboutForm)
