import { Button, Col, Form, Icon, Input, Row, message } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import ModalForm from '@/util/modal/modal.form'
import RegeditModal from './regedit.form'
import UserService from '@/services/user'
interface Props {
  form: WrappedFormUtils
  pid: number
  type: string
  Save: Function
}

const FormItem = Form.Item

class ProductThemeForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Row className="index-user-login-from">
        <Row type="flex" justify="center">
          <h1>Log In</h1>
        </Row>
        <Row type="flex" justify="center">
          <h3>
            New to RIGHR?{' '}
            <a
              onClick={() => {
                ModalForm.open({
                  key: 'userregedit',
                  title: 'New to RIGHR',
                  type: 'userregedit',
                  formCom: RegeditModal,
                  module: 'index',
                  service: UserService.addUser,
                  width: 450,
                  footer: null,
                  callback: (res: any) => {
                    if (res.stat === 'OK') {
                      window.location.href = '/'
                    } else {
                      message.error(res.errText)
                    }
                  }
                })
              }}
            >
              {' '}
              Sign Up
            </a>
          </h3>
        </Row>
        <Form className="module-form">
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please enter your Email address!' }]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />} placeholder="Username" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: 'Please enter your Password!' }]
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />} type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem>
            {/* <Row type="flex" justify="end">
              <a className="login-form-forgot">Forgot password</a>
            </Row> */}
            <Row type="flex" justify="center">
              <Col span={10}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={() => {
                    this.props.Save && this.props.Save()
                  }}
                  block
                >
                  Log in
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Row>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ProductThemeForm)
