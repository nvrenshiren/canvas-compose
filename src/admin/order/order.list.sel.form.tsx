import { Button, Form, Input, InputNumber, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import supplier from '@/services/supplier'
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
  oid: number
  said: string
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
              initialValue: this.props.item.oid
            })(<InputNumber placeholder="oid" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="供应商">
          {getFieldDecorator('said', {
            rules: [{ required: true, message: '供应商' }],
            initialValue: (this.props.item && this.props.item.said) || null
          })(
            <Select>
              {this.state.listRows.map((v: any, i: number) => {
                return (
                  <Option key={v.said} value={v.said}>
                    {v.name}
                  </Option>
                )
              })}
            </Select>
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {
    supplier.listSupplier().then((res) => {
      if (res.stat === 'OK') {
        this.setState({
          listRows: res.rows
        })
      }
    })
  }
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ItemForm)
