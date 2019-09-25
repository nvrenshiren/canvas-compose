import AdService from '@/services/ad'
import ImageUp from '@/util/upload/normal.upload'
import { Form, Input, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

const Option = Select.Option

interface Props {
  form: WrappedFormUtils
  pid: number
  type: string
  item?: Item
}

interface Item {
  adid: number
  title: string
  pic: string
  adtid: number
  url: string
}

interface State {
  listAllAdTag: any[]
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
  state: State = {
    listAllAdTag: []
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {this.props.item && (
          <FormItem {...formItemLayout} label="adid" style={{ display: 'none' }}>
            {getFieldDecorator('adid', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.adid
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '标题' }],
            initialValue: (this.props.item && this.props.item.title) || ''
          })(<Input type="text" placeholder="标题" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="url">
          {getFieldDecorator('url', {
            rules: [{ required: true, message: 'url' }],
            initialValue: (this.props.item && this.props.item.url) || ''
          })(<Input type="text" placeholder="url" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="广告标签">
          {getFieldDecorator('adtid', {
            rules: [{ required: true, message: '广告标签' }],
            initialValue: (this.props.item && this.props.item.adtid) || ''
          })(
            <Select placeholder="广告标签">
              {this.state.listAllAdTag.map((item) => {
                return (
                  <Option key={item.adtid + 'adtid'} value={item.adtid}>
                    {item.title}
                  </Option>
                )
              })}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="广告图">
          {getFieldDecorator('pic', {
            rules: [{ required: true, message: '请上传广告图' }],
            initialValue: (this.props.item && this.props.item.pic) || ''
          })(
            <ImageUp
              subname="广告图"
              default={[(this.props.item && this.props.item.pic) || '']}
              return={(file: string[]) => {
                this.props.form.setFieldsValue({ pic: file[0] })
              }}
              number={1}
            />
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {
    AdService.listAllAdTag({}).then((data: any) => {
      this.setState({
        listAllAdTag: data.rows
      })
    })
  }
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ProductThemeForm)
