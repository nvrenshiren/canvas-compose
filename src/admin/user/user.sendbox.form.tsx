import * as React from 'react'
import { Form, Icon, Input, Button, Row, Col, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import Common from '@/common/common'
import product from '@/services/product'
import * as _ from 'underscore'
import TransferService from '@/services/transfer'
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
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let self = this
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem
            {...formItemLayout}
            label="id"
            style={{ display: 'none' }}
          >
            {getFieldDecorator('id', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.auid
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '名称' }],
            initialValue: (this.props.item && this.props.item.title) || ''
          })(<Input type="text" placeholder="名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="详情">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '详情' }],
            initialValue: (this.props.item && this.props.item.content) || ''
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
            initialValue: (this.props.item && this.props.item.hasmember) || false
          })(
            <RadioGroup>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </RadioGroup>)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否订阅用户发送">
          {getFieldDecorator('hassubscribe', {
            rules: [{ required: true, message: '是否订阅用户发送' }],
            initialValue: (this.props.item && this.props.item.hassubscribe) || false
          })(
            <RadioGroup>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </RadioGroup>)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ContetAboutForm)
