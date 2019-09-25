import { Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import Item from '@/util/form/item'

interface Props {
  form: WrappedFormUtils
  pid: number
  type: string
  item?: ThemeItem
}

interface ThemeItem {
  tid: number
  name: string
  sort: string
  pic: string
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

class ProductSpecForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem {...formItemLayout} label="sid" style={{ display: 'none' }}>
            {getFieldDecorator('sid', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.tid
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '名称' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '备注' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="备注" />)}
        </FormItem>
        <Item />
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ProductSpecForm)
