import { Form, Input, InputNumber, Radio, Select, Icon, Button, Row, Col } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import './pay.fail.less'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Common from '@/common/common'

interface Props {
  form: WrappedFormUtils
  item: AddressItem
}

interface AddressItem {
  name: string
  addr: string
  postcode: number
  phone: string
  age: number
  country: string
  province: string
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
  ordernumber: string
  paymentamount: string
}

const RadioGroup = Radio.Group
const Option = Select.Option
const FormItem = Form.Item

class PaySuccessForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      ordernumber: '',
      paymentamount: ''
    }
  }
  state: State
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="pay-fail">
        <div className="content">
          <Row justify='start'>
            <Col span={6}>
              <Icon type="close-circle" theme="twoTone" style={{ fontSize: '100px', color: 'red' }} twoToneColor="red" />
            </Col>
            <Col span={18}>
              <p style={{ fontSize: '42px' }}>
                Order payment failed
              </p>
              <p>
                <Icon type="file-text" />&nbsp;
                Order number: <span className="span">{this.state.ordernumber}</span>
              </p>
              <p>
                <Icon type="wallet" />&nbsp;
                Payment amount: <span className="span">${this.state.paymentamount}</span>
              </p>
              <div className="btn">
                <Button type="primary">
                  <Icon type="reload" /> RETRY
                </Button>
                <Button type="primary" style={{ marginLeft: '30px' }}>
                  <Icon type="shopping-cart" /> Continue shopping
                </Button>
              </div>
            </Col>
          </Row>
        </div>

      </div>
    )
  }
  componentWillMount() { }
  componentDidMount() {
    this.setState({
      ordernumber: Common.getRequest().ordernumber,
      paymentamount: Common.getRequest().paymentamount
    })
  }
}
export default Form.create<Props>({})(PaySuccessForm)
