import { Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

interface Props {
  form: WrappedFormUtils
  pid: number
  type: string
  item: ClassItem
}

interface ClassItem {
  catid?: number
  name: string
  title: string
  key: string
  sort: number
  describe: string
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

interface State {}

const FormItem = Form.Item

class ProductForm extends React.Component<Props> {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        <FormItem {...formItemLayout} label="catid" style={{ display: 'none' }}>
          {getFieldDecorator('catid', {
            rules: [{ required: false, message: 'text' }],
            initialValue: this.props.item ? this.props.item.catid : ''
          })(<Input type="number" placeholder="text" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="分类名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '分类名称' }],
            initialValue: this.props.item ? this.props.item.name : ''
          })(<Input type="text" placeholder="分类名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="排序">
          {getFieldDecorator('sort', {
            rules: [{ required: true, message: '排序' }],
            initialValue: this.props.item ? this.props.item.sort : 1
          })(<Input type="number" placeholder="排序" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="页面标题">
          {getFieldDecorator('title', {
            rules: [{ required: false, message: '页面标题' }],
            initialValue: this.props.item ? this.props.item.title : ''
          })(<Input type="text" placeholder="页面标题" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="页面关键字">
          {getFieldDecorator('key', {
            rules: [{ required: false, message: '页面关键字' }],
            initialValue: this.props.item ? this.props.item.key : ''
          })(<Input type="text" placeholder="页面关键字" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="页面描述">
          {getFieldDecorator('describe', {
            rules: [{ required: false, message: '页面描述' }],
            initialValue: this.props.item ? this.props.item.describe : ''
          })(<Input type="text" placeholder="页面描述" />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
}
export default Form.create<Props>({})(ProductForm)
