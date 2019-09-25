import * as React from 'react'
import { Form, Select, Icon, Input, Button, Row, Col, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import Common from '@/common/common'
import productService from '@/services/product'
import contentService from '@/services/content'
import ImageUp from '@/util/upload/normal.upload'
import Quill from '@/util/quill/quill'

const Option = Select.Option

interface Props {
  form: WrappedFormUtils
  id?: number
  type: string
  item?: Item
}

interface Item {
  type: string
  name: string
  openEmail: boolean
  emailTitle: string
  emailTemplet: string
}

interface State {
  listCatid: any[]
  listSpcid: any[]
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
const RadioGroup = Radio.Group

class ItemForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  state: State = {
    listCatid: [],
    listSpcid: []
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem
            {...formItemLayout}
            label="type"
            style={{ display: 'none' }}
          >
            {getFieldDecorator('type', {
              rules: [{ required: false, message: 'type' }],
              initialValue: this.props.item.type
            })(<Input type="text" placeholder="type" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="是否开启">
          {getFieldDecorator('openEmail', {
            rules: [{ required: true, message: '请选择' }],
            initialValue: (this.props.item && this.props.item.openEmail) || false
          })(<RadioGroup name="openEmail">
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="邮件标题"
          >
            {getFieldDecorator('emailTitle', {
              rules: [{ required: true, message: '邮件标题' }],
              initialValue: this.props.item.emailTitle
            })(<Input type="text" placeholder="邮件标题" />)}
          </FormItem>
        <FormItem {...formItemLayout} label="详情">
          {getFieldDecorator('emailTemplet', {
            rules: [{ required: true, message: '详情' }],
            initialValue: (this.props.item && this.props.item.emailTemplet) || ''
          })(
            <Quill
              return={(val:any)=>{
                this.props.form.setFieldsValue({
                  emailTemplet: val
                })
              }}
            />
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {
  }
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ItemForm)
