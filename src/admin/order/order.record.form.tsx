import { Form, Input, Radio } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import Moment from 'moment'
import * as React from 'react'
const RadioGroup = Radio.Group

interface Props {
  form: WrappedFormUtils
  id: number
  type: string
  item?: Item
}

interface Item {
  account: string
  accountType: number
  ctime: number
  detail: string
  fullname: string
  money: number
  ptime: any
  type: number
  uid: number
  wcid: number
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

class ItemForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }
  code: string = 'c' + new Date().getTime()
  render() {
    const { getFieldDecorator } = this.props.form
    let item = this.props.item
    let payMethod = ''
    if (item.type === 1) {
      payMethod = 'paypal'
    } else if (item.type === 2) {
      payMethod = 'alipay'
    } else if (item.type === 3) {
      payMethod = 'weixin'
    } else if (item.type === 4) {
      payMethod = 'matercard'
    }
    return (
      <Form className="module-form">
        <FormItem>
          <div style={{ marginLeft: '80px' }}>
            设计师： {item.fullname}（{item.account}）<br />
            收款方式： {payMethod}
            <br />
            提现金额： {item.money}
            <br />
            申请时间： {Moment(item.ctime * 1).format('YYYY年MM月DD日')}
            <br />
          </div>
        </FormItem>
        {this.props.item && (
          <>
            <FormItem {...formItemLayout} label="wcid" style={{ display: 'none' }}>
              {getFieldDecorator('wcids', {
                rules: [{ required: false, message: 'wcids' }],
                initialValue: [this.props.item.wcid]
              })(<Input type="number" placeholder="wcid" />)}
            </FormItem>
          </>
        )}
        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '状态' }],
            initialValue: this.props.item.type
          })(
            <RadioGroup>
              <Radio value={1}>已支付</Radio>
              <Radio value={2}>未支付</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
}
export default Form.create<Props>({})(ItemForm)
