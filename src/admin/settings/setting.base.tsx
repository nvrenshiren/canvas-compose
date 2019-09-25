import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Tabs
} from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SysmsgService from '@/services/sysmsg'
import Quill from '@/util/quill/quill'
import ImageUp from '@/util/upload/normal.upload'

const { TextArea } = Input

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

interface Props {
  form: WrappedFormUtils
}
interface State {
  designerCommission: number //设计师佣金比例
  email: string //商家email
  logo: string //logo图片id
  name: string //商城名字
  onlineCustomService: string //在线客服
  picSizeLimit: number //图片最大（M）
  seoDescribe: string //seo商城描述
  seoKeyword: string //seo商城关键字
  seoTitle: string //seo商城标题
  slogan: string //口号
  bottomInfo: string //页面底部信息
}
const FormItem = Form.Item
const TabPane = Tabs.TabPane

class UserInfo extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: State
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      designerCommission: 0,
      email: '',
      logo: '',
      name: '',
      onlineCustomService: '',
      picSizeLimit: 0,
      seoDescribe: '',
      seoKeyword: '',
      seoTitle: '',
      slogan: '',
      bottomInfo: ''
    }
  }
  handleSubmit = (e: Event) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      SysmsgService.setMallInfo(values).then((res) => {
        if (res.stat === 'OK') {
          this.getData()
          message.success('保存成功')
        }
      })
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div
        className="main"
        style={{
          background: '#fff',
          width: '100%',
          padding: '50px 150px 50px 50px',
          minHeight: '700px'
        }}
      >
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <Tabs type="card">
            <TabPane tab="基本信息" key="1">
              <FormItem {...formItemLayout} label="商城名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '商城名称' }],
                  initialValue: this.state.name
                })(<Input placeholder="" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="商家email">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '商家email' }],
                  initialValue: this.state.email
                })(<Input placeholder="" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="商家口号">
                {getFieldDecorator('slogan', {
                  rules: [{ required: true, message: '商家口号' }],
                  initialValue: this.state.slogan
                })(<Input placeholder="" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="在线客服">
                {getFieldDecorator('onlineCustomService', {
                  rules: [{ required: true, message: '在线客服' }],
                  initialValue: this.state.onlineCustomService
                })(<Input placeholder="" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="diy图片最大(M)">
                {getFieldDecorator('picSizeLimit', {
                  rules: [{ required: true, message: 'diy图片最大(M)' }],
                  initialValue: this.state.picSizeLimit
                })(<InputNumber placeholder="" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="设计师佣金比例">
                {getFieldDecorator('designerCommission', {
                  rules: [{ required: true, message: '设计师佣金比例' }],
                  initialValue: this.state.designerCommission
                })(<InputNumber placeholder="" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="LOGO">
                {getFieldDecorator('logo', {
                  rules: [{ required: true, message: '上传图片' }],
                  initialValue: this.state.logo
                })(
                  <ImageUp
                    subname="上传图片"
                    return={(file: string[]) => {
                      this.setState({
                        logo: file[0]
                      })
                    }}
                    default={[this.state.logo]}
                    number={1}
                  />
                )}
              </FormItem>
            </TabPane>
            <TabPane tab="页面" key="2">
              <FormItem {...formItemLayout} label="页面底部信息">
                {getFieldDecorator('bottomInfo', {
                  rules: [{ required: true, message: '页面底部信息' }],
                  initialValue: this.state.bottomInfo
                })(<TextArea rows={6} />)}
              </FormItem>
            </TabPane>
            <TabPane tab="SEO" key="3">
              <FormItem {...formItemLayout} label="商城标题">
                {getFieldDecorator('seoTitle', {
                  rules: [{ required: false, message: '商城标题' }],
                  initialValue: this.state.seoTitle
                })(<Input placeholder="" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="商城关键字">
                {getFieldDecorator('seoKeyword', {
                  rules: [{ required: false, message: '商城关键字' }],
                  initialValue: this.state.seoKeyword
                })(<Input placeholder="" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="商城描述">
                {getFieldDecorator('seoDescribe', {
                  rules: [{ required: false, message: '商城描述' }],
                  initialValue: this.state.seoDescribe
                })(<TextArea rows={4} />)}
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
  getData() {
    SysmsgService.getMallInfo().then((res) => {
      if (res.stat === 'OK') {
        let info = res.info
        this.setState({
          designerCommission: info.designerCommission,
          email: info.email,
          logo: info.logo,
          name: info.name,
          onlineCustomService: info.onlineCustomService,
          picSizeLimit: info.picSizeLimit,
          seoDescribe: info.seoDescribe,
          seoKeyword: info.seoKeyword,
          seoTitle: info.seoTitle,
          slogan: info.slogan,
          bottomInfo: info.bottomInfo
        })
      }
    })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUnmount() {}
}

export default Form.create<Props>({})(UserInfo)
