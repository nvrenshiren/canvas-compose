import { Form, Input, Select, Radio, Checkbox, Row, Col } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

interface Props {
  form: WrappedFormUtils
  type: string
  item?: Item
}

interface Item {
  roleid?: number
  title: string
  content: string
  right: number[]
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
const Option = Select.Option
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

class UserForm extends React.Component<Props> {
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
    return (
      <Form className="module-form" autoComplete="no">
        {this.props.item && (
          <FormItem {...formItemLayout} label="roleid" style={{ display: 'none' }}>
            {getFieldDecorator('roleid', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.roleid
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="角色名称">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '角色名称' }],
            initialValue: (this.props.item && this.props.item.title) || ''
          })(<Input type="text" placeholder="角色名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="角色描述">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '角色描述' }],
            initialValue: (this.props.item && this.props.item.content) || ''
          })(<Input type="text" placeholder="角色描述" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="角色权限">
          {getFieldDecorator('right', {
            rules: [{ required: true, message: '角色权限' }],
            initialValue: (this.props.item && this.props.item.right) || []
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={8}>
                  <Checkbox value={1}>商品</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={2}>会员</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={4}>内容</Checkbox>
                </Col>

                <Col span={8}>
                  <Checkbox value={3}>订单</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={5}>统计</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={6}>设置</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value={7}>工具</Checkbox>
                </Col>

                <Col span={8}>
                  <Checkbox value={8}>供应商</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(UserForm)
