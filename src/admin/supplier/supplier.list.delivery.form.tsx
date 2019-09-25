import * as React from 'react'
import { Form, Icon, Input, Button, Row, Col,Select, InputNumber } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import Common from '@/common/common'
import supplier from '@/services/supplier'
import ImageUp from '@/util/upload/normal.upload'
const Option = Select.Option
const Search = Input.Search
const ButtonGroup = Button.Group
interface Props {
  form: WrappedFormUtils
  id: number
  type: string
  item?: Item
}

interface Item {
  order: any
  oid: number
  exattr1: string
  exattr2?: string
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

class ItemForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      listRows: []
    }
  }
  state: any
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem {...formItemLayout} label="oid" style={{ display: 'none' }}>
            {getFieldDecorator('oid', {
              rules: [{ required: false, message: 'oid' }],
              initialValue: this.props.item.order.oid || null
            })(<InputNumber placeholder="oid" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="国内快递单号">
          {getFieldDecorator('exattr1', {
            rules: [{ required: true, message: '国内快递单号' }],
            initialValue: (this.props.item && this.props.item.exattr1) || null
          })(<Input type="text"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="快递公司名称">
          {getFieldDecorator('exattr2', {
            rules: [{ required: true, message: '快递公司名称' }],
            initialValue: (this.props.item && this.props.item.exattr2) || null
          })(<Input type="text"/>)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ItemForm)
