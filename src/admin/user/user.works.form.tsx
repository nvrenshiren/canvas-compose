import { Form, Input, Select, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

interface Props {
  form: WrappedFormUtils
  type: string
  item?: Item
}

interface Item {
  dgid?: number
  name: string
  notice: string
  type: number
  isshow: boolean
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

class ItemForm extends React.Component<Props> {
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
          <FormItem
            {...formItemLayout}
            label="dgid"
            style={{ display: 'none' }}
          >
            {getFieldDecorator('dgid', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.dgid
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="作品名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '作品名称' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="作品名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('notice', {
            initialValue: (this.props.item && this.props.item.notice) || ''
          })(<TextArea rows={4} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '状态' }],
            initialValue: (this.props.item && this.props.item.type) || false
          })(
            <RadioGroup>
              <Radio value={1}>正在审核</Radio>
              <Radio value={2}>审核通过</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="首页显示">
          {getFieldDecorator('isshow', {
            rules: [{ required: true, message: '首页显示' }],
            initialValue: (this.props.item && this.props.item.isshow) || false
          })(
            <RadioGroup>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
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
export default Form.create<Props>({})(ItemForm)
