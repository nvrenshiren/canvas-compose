import contentService from '@/services/content'
import productService from '@/services/product'
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
  nid?: number
  name: number
  classify: number
  catid: number
  spcid: number
  url: string
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
        {this.props.item && (
          <FormItem {...formItemLayout} label="nid" style={{ display: 'none' }}>
            {getFieldDecorator('nid', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.nid
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '名称' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="类型">
          {getFieldDecorator('classify', {
            rules: [{ required: true, message: '类型' }],
            initialValue: (this.props.item && this.props.item.classify) || ''
          })(
            <Select placeholder="类型">
              <Option key="1" value={1}>
                链接地址
              </Option>
              <Option key="2" value={2}>
                文章类别
              </Option>
              <Option key="3" value={3}>
                商品分类
              </Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="文章类别">
          {getFieldDecorator('spcid', {
            rules: [{ required: true, message: '文章类别' }],
            initialValue: (this.props.item && this.props.item.spcid) || ''
          })(
            <Select placeholder="文章类别">
              {this.state.listSpcid.map((item) => {
                return (
                  <Option key={item.spcid + 'spcid'} value={item.spcid}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="产品分类">
          {getFieldDecorator('catid', {
            rules: [{ required: true, message: '产品分类' }],
            initialValue: (this.props.item && this.props.item.catid) || ''
          })(
            <Select placeholder="产品分类">
              {this.state.listCatid.map((item) => {
                return (
                  <Option key={item.spcid + 'catid'} value={item.catid}>
                    {item.name}
                  </Option>
                )
              })}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="导航地址">
          {getFieldDecorator('url', {
            rules: [{ required: true, message: '导航地址' }],
            initialValue: (this.props.item && this.props.item.url) || ''
          })(<Input type="text" placeholder="导航地址" />)}
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
    contentService.listCategory({ pageIndex: 1, pageSize: 10000 }).then((data: any) => {
      this.setState({
        listSpcid: data.rows
      })
    })
  }
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ProductThemeForm)
