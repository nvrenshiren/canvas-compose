import * as React from 'react'
import Common from '@/common/common'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import UserService from '@/services/user'
import OrderService from '@/services/order'

export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
    this.state = {
      userInfo: {},
      orderInfo: {}
    }
  }
  state: any
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  render() {
    return (
    <div className="main">
      <p>You're welcome, {this.state.userInfo.nickname}</p>
      <p>LastLoginTime,last date：{Common.dateTime(this.state.userInfo.recentTime)}</p>
      <p>Your consumption in the shop：($) {this.state.orderInfo.consumption}</p>
      <p>The ongoing orders：{this.state.orderInfo.ongoing}</p>
    </div>)
  }
  componentDidMount() {
    UserService.getUserInfo().then((res)=>{
      if(res.stat == 'OK') {
        this.setState({
          userInfo: res.userInfo
        })
      }
    })
    OrderService.getUserOrderInfo().then((res)=>{
      this.setState({
        orderInfo: res
      })
    })
  }
  componentWillUnmount() {}
}
