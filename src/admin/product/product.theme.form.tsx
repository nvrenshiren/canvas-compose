import * as React from 'react'
import { Form, Icon, Input, Button, Row, Col } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import Common from '@/common/common'
import product from '@/services/product'
import ImageUp from '@/util/upload/normal.upload'

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

class ProductThemeForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem {...formItemLayout} label="tid" style={{ display: 'none' }}>
            {getFieldDecorator('tid', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.tid
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="主题名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '主题名称' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="主题名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="排序">
          {getFieldDecorator('sort', {
            rules: [{ required: true, message: '排序' }],
            initialValue: (this.props.item && this.props.item.sort) || 0
          })(<Input type="number" placeholder="排序" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="主题图片">
          {getFieldDecorator('pic', {
            rules: [{ required: true, message: '请上传主题图片' }],
            initialValue: (this.props.item && this.props.item.pic) || ''
          })(
            <ImageUp
              subname="主题图片"
              return={(file: string[]) => {
                this.props.form.setFieldsValue({
                  pic: file[0]
                })
              }}
              default={[(this.props.item && this.props.item.pic) || '']}
              number={1}
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
export default Form.create<Props>({})(ProductThemeForm)
