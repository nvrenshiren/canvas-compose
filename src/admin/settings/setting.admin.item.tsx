import { Form, Input, Radio, Checkbox, Col } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import RightService from '@/services/right'
import * as _ from 'underscore'

interface Props {
  form: WrappedFormUtils
  type: string
  item?: Item
}

interface Item {
  said?: number //管理员唯一id
  issuper: boolean //是否是超级管理员
  name: string //账号
  pwd: string //密码
  nickname: string //名字
  remark: string //备注
  dept: string //部门
  right: any[] //角色id的集合
  email: string //email
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
class ItemForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      listRoles: []
    }
  }
  state: {
    listRoles: any[]
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form" autoComplete="no">
        {this.props.item && (
          <FormItem {...formItemLayout} label="said" style={{ display: 'none' }}>
            {getFieldDecorator('said', {
              rules: [{ required: false, message: 'text' }],
              initialValue: this.props.item.said
            })(<Input type="number" placeholder="text" />)}
          </FormItem>
        )}
        <FormItem {...formItemLayout} label="账号">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '账号' }],
            initialValue: (this.props.item && this.props.item.name) || ''
          })(<Input type="text" placeholder="账号" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('pwd', {
            rules: [{ required: this.props.type === 'add' ? true : false, message: '密码' }],
            initialValue: (this.props.item && this.props.item.pwd) || ''
          })(<Input type="text" placeholder="密码不变，留空此项" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="昵称">
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '昵称' }],
            initialValue: (this.props.item && this.props.item.nickname) || ''
          })(<Input type="text" placeholder="昵称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否超管">
          {getFieldDecorator('issuper', {
            rules: [{ required: true, message: '是否超管' }],
            initialValue: (this.props.item && this.props.item.issuper) || false
          })(
            <RadioGroup>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="角色选择">
          {getFieldDecorator('right', {
            rules: [{ required: !this.props.form.getFieldValue('issuper'), message: '角色' }],
            initialValue: (this.props.item && _.pluck(this.props.item.right, 'roleid')) || []
          })(
            <Checkbox.Group
              options={this.state.listRoles.map((role) => {
                return {
                  label: role.content,
                  value: role.roleid
                }
              })}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="部门">
          {getFieldDecorator('dept', {
            rules: [{ required: true, message: '部门' }],
            initialValue: (this.props.item && this.props.item.dept) || ''
          })(<Input type="text" placeholder="部门" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('remark', {
            rules: [{ required: false, message: '备注' }],
            initialValue: (this.props.item && this.props.item.remark) || ''
          })(<Input type="text" placeholder="备注" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="email">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'email' }],
            initialValue: (this.props.item && this.props.item.email) || ''
          })(<Input type="text" placeholder="email" />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {
    RightService.listRoles({ pageIndex: 1, pageSize: 1000 }).then((res: any) => {
      if (res.stat === 'OK') {
        this.setState({
          listRoles: res.rows
        })
      }
    })
  }
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ItemForm)
