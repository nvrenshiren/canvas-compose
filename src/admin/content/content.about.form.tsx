import Quill from '@/util/quill/quill'
import { Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

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
          <FormItem {...formItemLayout} label="auid" style={{ display: 'none' }}>
            {getFieldDecorator('auid', {
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
              return={(val: any) => {
                this.props.form.setFieldsValue({
                  content: val
                })
              }}
            />
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ContetAboutForm)
