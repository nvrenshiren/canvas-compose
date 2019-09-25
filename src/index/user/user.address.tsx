import { Alert, Button, Col, Row, Table } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import UserService from '@/services/user'
import ModalForm from '@/util/modal/modal.form'
import AddressForm from './address.form'

interface Item {
  addr: string
  adid: number
  age: number
  country: string
  isdefault: boolean
  name: string
  phone: number
  postcode: number
  province: string
  uid: number
}

interface State {
  data: any[]
  loading: boolean
}

export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      data: [],
      loading: true
    }
  }
  Columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      dataIndex: 'addr',
      key: 'addr'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: this.rendrenItem.bind(this)
    }
  ]
  rendrenItem(any: any, item: Item) {
    return (
      <Row key={'user-address-' + item.adid} gutter={10} type="flex">
        <Col>
          <Button
            size="small"
            onClick={() => {
              this.editItem(item)
            }}
          >
            Edit
          </Button>
        </Col>
        <Col>
          <Button
            size="small"
            type="danger"
            onClick={() => {
              this.deleteItem(item.adid)
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    )
  }
  deleteItem(adid: number) {
    UserService.deleteAddress(adid).then((res) => {
      this.getAddress()
    })
  }
  editItem(item: Item) {
    ModalForm.open({
      key: 'address-edit',
      title: 'Edit Address',
      type: 'edit',
      item: item,
      adid: item.adid,
      module: 'address',
      cancelText: 'cancel',
      okText: 'save',
      formCom: AddressForm,
      service: UserService.updateAddress,
      callback: () => {
        this.getAddress()
      }
    })
  }
  get TipButton() {
    return (
      <div>
        <div>** = default shipping address</div>
        <div>
          Existing addresses are shown in the list below. Click here to
          <Button
            onClick={() => {
              ModalForm.open({
                key: 'address-add',
                title: 'Add address',
                type: 'add',
                module: 'address',
                formCom: AddressForm,
                cancelText: 'cancel',
                okText: 'save',
                service: UserService.insertAddress,
                callback: () => {
                  this.getAddress()
                }
              })
            }}
            type="primary"
            style={{ marginLeft: '20px' }}
          >
            Add New Address
          </Button>
        </div>
      </div>
    )
  }
  state: State
  getAddress() {
    UserService.listAddress().then((res) => {
      this.setState({
        loading: false,
        data: res.rows
      })
    })
  }
  render() {
    return (
      <Row id="user-address" className="main">
        <Alert
          message="Address Book"
          description={this.TipButton}
          type="info"
          showIcon
          style={{ width: '70%' }}
        />
        <Row className="user-address-list" style={{ margin: '20px 0' }}>
          <Table
            dataSource={this.state.data}
            columns={this.Columns}
            bordered
            size="small"
            loading={this.state.loading}
            pagination={false}
            rowKey={(record) => {
              return 'user-address-list' + record.adid
            }}
          />
        </Row>
      </Row>
    )
  }
  componentDidMount() {
    this.getAddress()
  }
  componentWillUnmount() {}
}
