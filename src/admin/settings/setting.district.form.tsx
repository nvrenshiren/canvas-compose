import * as React from 'react'
import { Form, Icon, Input, Button, Row, Col, InputNumber,Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AreaService from '@/services/area'
import Common from '@/common/common'

interface Props {
  form: WrappedFormUtils
  type: string
  item: ClassItem
}

interface ClassItem {
  coid?: number
  arid?: number
  name: string
  sort: number
  postcode: string
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

interface State {
  listRows:any
}

const FormItem = Form.Item

class ProductForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      listRows: []
    }
  }
  state: State
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        <FormItem {...formItemLayout} label="coid" style={{ display: 'none' }}>
          {getFieldDecorator('coid', {
            rules: [{ required: false, message: 'text' }],
            initialValue: this.props.item ? this.props.item.coid : 0
          })(<InputNumber placeholder="text" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="arid" style={{ display: 'none' }}>
          {getFieldDecorator('arid', {
            rules: [{ required: false, message: 'arid' }],
            initialValue: this.props.item ? this.props.item.arid : null
          })(<InputNumber placeholder="arid" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '名称' }],
            initialValue: this.props.item ? this.props.item.name : ''
          })(<Input type="text" placeholder="名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="父节点选择">
          {getFieldDecorator('coid', {
            rules: [{ required: false, message: '父节点选择' }],
            initialValue: (this.props.item && this.props.item.coid) || 0
          })(
            <Select placeholder="父节点选择">
              {this.state.listRows.map((item: any) => (
                <Select.Option key={item.arid} value={item.arid}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="排序">
          {getFieldDecorator('sort', {
            rules: [{ required: false, message: '排序' }],
            initialValue: this.props.item ? this.props.item.sort : 0
          })(<InputNumber min={0} placeholder="排序" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="邮编">
          {getFieldDecorator('postcode', {
            rules: [{ required: false, message: '邮编' }],
            initialValue: this.props.item ? this.props.item.postcode : 0
          })(<InputNumber min={0} placeholder="邮编" />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {
    AreaService.listArea({ pageIndex: 1, pageSize: 10000, coid: 0 }).then((res: any) => {
      if (res.stat === 'OK') {
        this.setState({
          isLoading: false,
          listRows: res.rows
        })
      }
    })
  }
}
export default Form.create<Props>({})(ProductForm)
