import { Form, Input, InputNumber, Radio, Select } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'

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

interface State {}

const RadioGroup = Radio.Group
const Option = Select.Option
const FormItem = Form.Item

class ProductForm extends React.Component<Props> {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="module-form">
        <FormItem {...formItemLayout} label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your Name!' }],
            initialValue: this.props.item ? this.props.item.name : ''
          })(
            <Input
              type="text"
              placeholder="Please input your Name!"
              style={{ width: '50%' }}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Age">
          {getFieldDecorator('age', {
            rules: [{ required: true, message: 'Please input your Age!' }],
            initialValue: this.props.item ? this.props.item.age : 0
          })(
            <InputNumber
              min={10}
              placeholder="Please input your Age!"
              style={{ width: '50%' }}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Country">
          {getFieldDecorator('country', {
            rules: [{ required: true, message: 'Please input your Country!' }],
            initialValue: this.props.item ? this.props.item.country : 'OTHER'
          })(
            <Select style={{ width: '50%' }}>
              <Option value="OTHER">OTHER</Option>
              <Option value="United States">United States</Option>
              <Option value="United Kingdom">United Kingdom</Option>
              <Option value="Canada">Canada</Option>
              <Option value="France">France</Option>
              <Option value="Germany">Germany</Option>
              <Option value="Norway">Norway</Option>
              <Option value="Denmark">Denmark</Option>
              <Option value="Japan">Japan</Option>
              <Option value="Italy">Italy</Option>
              <Option value="Hong Kong">Hong Kong</Option>
              <Option value="Russian Federation">Russian Federation</Option>
              <Option value="Finland">Finland</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Province">
          {getFieldDecorator('province', {
            rules: [{ required: true, message: 'Please input your Province!' }],
            initialValue: this.props.item ? this.props.item.province : 'OTHER'
          })(
            <Select style={{ width: '50%' }}>
              <Option value="OTHER">OTHER</Option>
              <Option value="ALABAMA">ALABAMA</Option>
              <Option value="ALASKA">ALASKA</Option>
              <Option value="AMERICAN SAMOA">AMERICAN SAMOA</Option>
              <Option value="ARIZONA">ARIZONA</Option>
              <Option value="ARKANSAS">ARKANSAS</Option>
              <Option value="CALIFORNIA">CALIFORNIA</Option>
              <Option value="COLORADO">COLORADO</Option>
              <Option value="CONNECTICUT">CONNECTICUT</Option>
              <Option value="DELAWARE">DELAWARE</Option>
              <Option value="DISTRICT OF COLUMBIA">DISTRICT OF COLUMBIA</Option>
              <Option value="FEDERATED STATES OF MICRO">
                FEDERATED STATES OF MICRO
              </Option>
              <Option value="FLORIDA">FLORIDA</Option>
              <Option value="GEORGIA">GEORGIA</Option>
              <Option value="GUAM">GUAM</Option>
              <Option value="HAWAII">HAWAII</Option>
              <Option value="IDAHO">IDAHO</Option>
              <Option value="ILLINOIS">ILLINOIS</Option>
              <Option value="INDIANA">INDIANA</Option>
              <Option value="IOWA">IOWA</Option>
              <Option value="KANSAS">KANSAS</Option>
              <Option value="KENTUCKY">KENTUCKY</Option>
              <Option value="LOUISIANA">LOUISIANA</Option>
              <Option value="MAINE">MAINE</Option>
              <Option value="MARSHALL ISLANDS">MARSHALL ISLANDS</Option>
              <Option value="MARYLAND">MARYLAND</Option>
              <Option value="MASSACHUSETTS">MASSACHUSETTS</Option>
              <Option value="MICHIGAN">MICHIGAN</Option>
              <Option value="MINNESOTA">MINNESOTA</Option>
              <Option value="MISSISSIPPI">MISSISSIPPI</Option>
              <Option value="MISSOURI">MISSOURI</Option>
              <Option value="MONTANA">MONTANA</Option>
              <Option value="NEBRASKA">NEBRASKA</Option>
              <Option value="NEVADA">NEVADA</Option>
              <Option value="NEW HAMPSHIRE">NEW HAMPSHIRE</Option>
              <Option value="NEW JERSEY">NEW JERSEY</Option>
              <Option value="NEW MEXICO">NEW MEXICO</Option>
              <Option value="NEW YORK">NEW YORK</Option>
              <Option value="NORTH CAROLINA">NORTH CAROLINA</Option>
              <Option value="NORTH DAKOTA">NORTH DAKOTA</Option>
              <Option value="NORTHERN MARIANA ISLANDS">
                NORTHERN MARIANA ISLANDS
              </Option>
              <Option value="OHIO">OHIO</Option>
              <Option value="OKLAHOMA">OKLAHOMA</Option>
              <Option value="PALAU">PALAU</Option>
              <Option value="PENNSYLVANIA">PENNSYLVANIA</Option>
              <Option value="RHODE ISLAND">RHODE ISLAND</Option>
              <Option value="SOUTH CAROLINA">SOUTH CAROLINA</Option>
              <Option value="SOUTH DAKOTA">SOUTH DAKOTA</Option>
              <Option value="TENNESSEE">TENNESSEE</Option>
              <Option value="TEXAS">TEXAS</Option>
              <Option value="UTAH">UTAH</Option>
              <Option value="VERMONT">VERMONT</Option>
              <Option value="VIRGINIA">VIRGINIA</Option>
              <Option value="WASHINGTON">WASHINGTON</Option>
              <Option value="WEST VIRGINIA">WEST VIRGINIA</Option>
              <Option value="WISCONSIN">WISCONSIN</Option>
              <Option value="WYOMING">WYOMING</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Gender">
          {getFieldDecorator('sex', {
            initialValue: 0
          })(
            <Select style={{ width: '50%' }}>
              <Option value={0}>man</Option>
              <Option value={1}>woman</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Address">
          {getFieldDecorator('addr', {
            rules: [{ required: true, message: 'Please input your Address!' }],
            initialValue: this.props.item ? this.props.item.addr : ''
          })(
            <Input
              type="text"
              placeholder="Please input your Address!"
              style={{ width: '50%' }}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="PostCode">
          {getFieldDecorator('postcode', {
            rules: [{ required: true, message: 'Please input your PostCode!' }],
            initialValue: this.props.item ? this.props.item.postcode : 0
          })(
            <InputNumber
              placeholder="Please input your PostCode!"
              style={{ width: '50%' }}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Phone">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your Phone!' }],
            initialValue: this.props.item ? this.props.item.phone : '0'
          })(
            <Input
              placeholder="Please input your Phone!"
              style={{ width: '50%' }}
            />
          )}
        </FormItem>
      </Form>
    )
  }
  componentWillMount() {}
  componentDidMount() {}
}
export default Form.create<Props>({})(ProductForm)
