import { Button, Col, Form, Icon, Input, Row } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

interface Props {
  form: WrappedFormUtils
  pid: number
  type: string
  item?: ThemeItem
  Save: Function
}

interface ThemeItem {
  tid: number
  name: string
  sort: string
  pic: string
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
          <h1>New to RIGHR</h1>
        </Row>
        <Row type="flex" justify="center">
          <h3>We just need a little more info to create your account...</h3>
        </Row>
        <Form className="module-form">
          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please enter your Email address!' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />} placeholder="Email Address​" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: 'Please enter your Password!' }, { min: 8, message: 'Must be at least 8 characters' }]
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />} type="password" placeholder="Must be at least 8 characters" />
            )}
          </FormItem>
          <FormItem>
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
                  Join Free
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
