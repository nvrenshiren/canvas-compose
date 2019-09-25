import { Form, Input, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import product from '@/services/product'
import ImageUp from '@/util/upload/normal.upload'

interface Props {
  form: WrappedFormUtils
  type: string
  item?: FlowerItem
}

interface FlowerItem {
  tid: number
  styid: number
  name: string
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
    this.state = {
      listTheme: []
    }
  }
  state: {
    listTheme: any[]
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const themeOptions = this.state.listTheme.map((item: any) => (
      <Select.Option key={item.tid} value={item.tid}>
        {item.name}
      </Select.Option>
    ))
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem {...formItemLayout} label="styid" style={{ display: 'none' }}>
            {getFieldDecorator('styid', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.styid
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '名称' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="主题">
          {getFieldDecorator('tid', {
            rules: [{ required: true, message: '主题' }],
            initialValue: (this.props.item && this.props.item.tid) || '请选择主题'
          })(<Select placeholder="请选择主题">{themeOptions}</Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label="花型图片">
          {getFieldDecorator('pic', {
            rules: [{ required: true, message: '上传图片' }],
            initialValue: (this.props.item && this.props.item.pic) || ''
          })(
            <ImageUp
              subname="上传图片"
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
  componentWillMount() {
    product.listTheme({ pageIndex: 1, pageSize: 10000 }).then((data: any) => {
      if (data.stat == 'OK') {
        this.setState({
          listTheme: data.rows
        })
      }
    })
  }
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ProductThemeForm)
