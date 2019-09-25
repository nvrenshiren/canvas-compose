import contentService from '@/services/content'
import productService from '@/services/product'
import Quill from '@/util/quill/quill'
import { Form, Input, Radio, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

const Option = Select.Option

interface Props {
  form: WrappedFormUtils
  spid?: number
  type: string
  item?: Item
}

interface Item {
  spid?: number
  name: string
  detail: string
  spcid: number
  isurl: boolean
  url: string
  content: string
  pic: string
}

interface State {
  listCatid: any[]
  listSpcid: any[]
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
const RadioGroup = Radio.Group

class ProductThemeForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  state: State = {
    listCatid: [],
    listSpcid: []
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        {getFieldDecorator('pic', {
          rules: [{ required: false, message: 'pic' }],
          initialValue: ''
        })(<></>)}
        {this.props.item && (
          <FormItem
            {...formItemLayout}
            label="spid"
            style={{ display: 'none' }}
          >
            {getFieldDecorator('spid', {
              rules: [{ required: false, message: 'spid' }],
              initialValue: this.props.item.spid
            })(<Input type="number" placeholder="spid" />)}
          </FormItem>
        )}
        <FormItem
          {...formItemLayout}
          label="content"
          style={{ display: 'none' }}
        >
          {getFieldDecorator('content', {
            rules: [{ required: false, message: 'content' }],
            initialValue: '-'
          })(<Input type="text" placeholder="content" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '名称' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="类型">
          {getFieldDecorator('spcid', {
            rules: [{ required: true, message: '类型' }],
            initialValue: (this.props.item && this.props.item.spcid) || ''
          })(
            <Select placeholder="类型">
              {this.state.listSpcid.map((item) => {
                return (
                  <Option value={item.spcid} key={item.spcid}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否链接">
          {getFieldDecorator('isurl', {
            rules: [{ required: true, message: '是否链接' }],
            initialValue: (this.props.item && this.props.item.isurl) || false
          })(
            <RadioGroup name="isurl">
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="URL">
          {getFieldDecorator('url', {
            rules: [{ required: true, message: 'URL' }],
            initialValue: (this.props.item && this.props.item.url) || ''
          })(<Input type="text" placeholder="URL" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="详情">
          {getFieldDecorator('detail', {
            rules: [{ required: true, message: '详情' }],
            initialValue: (this.props.item && this.props.item.detail) || ''
          })(
            <Quill
              return={(val: any) => {
                this.props.form.setFieldsValue({
                  detail: val
                })
              }}
            />
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {
    productService.listCatagorys({}).then((data: any) => {
      this.setState({
        listCatid: data.rows
      })
    })
    contentService
      .listCategory({ pageIndex: 1, pageSize: 10000 })
      .then((data: any) => {
        this.setState({
          listSpcid: data.rows
        })
      })
  }
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ProductThemeForm)
