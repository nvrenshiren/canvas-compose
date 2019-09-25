import {
  Button,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Modal
} from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import OrderService from '@/services/order'
import UserService from '@/services/user'
import store from '@/store/store'
import ModalForm from '@/util/modal/modal.form'
import ImageUp from '@/util/upload/normal.upload'
import UserForm from './user.info.form'

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

const Option = Select.Option
const FormItem = Form.Item
class UserInfo extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: any
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    let userinfo = store.getState().user
    this.state = {
      user: userinfo,
      uid: userinfo.uid,
      nickName: userinfo.nickname, // 昵称
      phone: userinfo.phone,
      password: '',
      pic: userinfo.pic, // 头像
      digest: (userinfo.designer && userinfo.designerInfo.digest) || '', // digest  （设计师需要）
      abstract: (userinfo.designer && userinfo.designerInfo.abstract) || '', // 设计师背景图片  （设计师需要）
      describe: (userinfo.designer && userinfo.designerInfo.describe) || '', // 描述  （设计师需要）
      type: userinfo.type, // 支付方式
      account: userinfo.account // 付款账号
    }
  }
  handleSubmit = (e: Event) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      UserService.updateUser(values).then((res) => {
        if (res.stat === 'OK') {
          store.dispatch({
            type: 'SET_USER_INFO',
            user: res.user
          })
          message.success('Save Success')
          this.initComponent()
        }
      })
    })
  }
  render() {
    let userinfo = this.state.user
    const { getFieldDecorator } = this.props.form
    return (
      <div className="user-info-box main">
        <Row type="flex" justify="space-between">
          <Col span={18}>
            <Form
              onSubmit={this.handleSubmit.bind(this)}
              className="login-form"
            >
              <FormItem {...formItemLayout} label="NickName">
                {getFieldDecorator('nickName', {
                  rules: [
                    { required: true, message: 'Please input your nickName!' }
                  ],
                  initialValue: this.state.nickName
                })(<Input placeholder="nickName" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Phone">
                {getFieldDecorator('phone', {
                  rules: [
                    { required: true, message: 'Please input your phone!' }
                  ],
                  initialValue: this.state.phone
                })(<Input placeholder="Please input your phone" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Icon">
                {getFieldDecorator('pic', {
                  initialValue: this.state.pic
                })(
                  <ImageUp
                    subname="Your Icon"
                    return={(file: string[]) => {
                      this.setState({
                        pic: file[0]
                      })
                    }}
                    default={[this.state.pic]}
                    number={1}
                  />
                )}
              </FormItem>
              {userinfo.designer === true && (
                <>
                  <FormItem {...formItemLayout} label="Digest">
                    {getFieldDecorator('digest', {
                      initialValue: this.state.digest
                    })(<TextArea rows={4} />)}
                  </FormItem>
                  {/* 设计师背景图片 */}
                  <FormItem {...formItemLayout} label="Abstract">
                    {getFieldDecorator('abstract', {
                      initialValue: this.state.abstract
                    })(
                      <ImageUp
                        subname="Abstract"
                        return={(file: string[]) => {
                          this.setState({
                            abstract: file[0]
                          })
                        }}
                        default={[this.state.abstract]}
                        number={1}
                      />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Pay Method">
                    {getFieldDecorator('type', {
                      rules: [{ required: true, message: 'type' }],
                      initialValue: this.state.type
                    })(
                      <Select style={{ width: 120 }}>
                        <Option value={1}>paypal</Option>
                        <Option value={2}>alipay</Option>
                        <Option value={3}>wechat</Option>
                        <Option value={4}>mastercard</Option>
                        <Option value={5}>payoneer</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Pay Account">
                    {getFieldDecorator('account', {
                      rules: [
                        { required: true, message: 'Please input your account' }
                      ],
                      initialValue: this.state.account
                    })(
                      <Input
                        type="text"
                        placeholder="Please input your account"
                      />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Describe">
                    {getFieldDecorator('describe', {
                      initialValue: this.state.describe
                    })(
                      <TextArea rows={4} />
                    )}
                  </FormItem>
                </>
              )}
              <FormItem>
                <Button
                  style={{ float: 'right' }}
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={6}>
            <Button
              style={{ marginLeft: '70px' }}
              onClick={() => {
                ModalForm.open({
                  key: 'edit',
                  title: 'Change password',
                  type: 'edit',
                  item: {
                    oldpassword: '',
                    newpassword: ''
                  },
                  module: 'product',
                  formCom: UserForm,
                  service: UserService.changePwd,
                  callback: () => {}
                })
              }}
            >
              Change password
            </Button>
            <br />
            <br />
            {userinfo.designer === false && (
              <Button style={{ marginLeft: '70px' }}>
                <Popconfirm
                  title={'Apply?'}
                  onConfirm={() => {
                    UserService.applyDesigner({}).then((res) => {
                      if (res.stat === 'OK') {
                        Modal.success({
                          title: 'Successful application!',
                          content:
                            'Application to become a designer has been submitted, please wait for review'
                        })
                      }
                    })
                  }}
                >
                  <div>Apply Designer</div>
                </Popconfirm>
              </Button>
            )}
          </Col>
        </Row>
      </div>
    )
  }
  componentDidMount() {
    UserService.getUserInfo().then((res) => {
      if (res.stat == 'OK') {
      }
    })
    OrderService.getUserOrderInfo().then((res) => {
      this.setState({
        orderInfo: res
      })
    })
  }
  componentWillUnmount() {}
}

export default Form.create<Props>({})(UserInfo)
