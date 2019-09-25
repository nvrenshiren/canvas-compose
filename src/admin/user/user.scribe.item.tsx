import * as React from 'react'
import { Form, Icon, Input, Button, Row, Col, InputNumber,Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AreaService from '@/services/area'
import Common from '@/common/common'

interface Props {
  form: WrappedFormUtils
  type: string
  item: ClassItem
}

interface ClassItem {
  email: string
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

interface State {
  listRows:any
}

const FormItem = Form.Item

class ProductForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  state: State
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        <FormItem {...formItemLayout} label="email">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'email' }],
            initialValue: this.props.item ? this.props.item.email : null
          })(<Input placeholder="email" />)}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {
    AreaService.listArea({ pageIndex: 1, pageSize: 10000, coid: 0 }).then((res: any) => {
      if (res.stat === 'OK') {
        this.setState({
          isLoading: false,
          listRows: res.rows
        })
      }
    })
  }
}
export default Form.create<Props>({})(ProductForm)
