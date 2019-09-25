import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { RouteComponentProps } from 'react-router'
import { Modal, Progress, Row, Col, Button } from 'antd'
import OrderService from '@/services/order'

interface State {
  status: 'success' | 'active' | 'exception'
  percent: number
}

export default class extends React.Component<RouteComponentProps<any>, State> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      status: 'active',
      percent: 0
    }
  }
  state: State
  render() {
    return (
      <div className="user-pay-gourl" style={{ margin: '50px 0' }}>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ flexDirection: 'column' }}
        >
          <Col style={{ marginBottom: 20 }}>
            <Progress
              type="circle"
              percent={this.state.percent}
              width={200}
              status={this.state.status}
            />
          </Col>

          <Col>
            <Button
              type="primary"
              loading={
                this.state.status.toString() === 'active' ||
                this.state.status.toString() === 'success'
              }
              onClick={() => {
                if (this.state.status.toString() === 'exception') {
                  this.setState({
                    percent: 0
                  })
                  this.getLink()
                }
              }}
            >
              {this.getText}
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
  get getText() {
    switch (this.state.status.toString()) {
      case 'active':
        return 'Loading...'
      case 'exception':
        return 'Retry'
      case 'success':
        return 'Coming in....'
    }
  }
  addpercent: any
  getLink() {
    this.addpercent = setInterval(() => {
      this.setState({
        status: 'active',
        percent: this.state.percent + 1
      })
    }, 100)
    OrderService.orderPay(this.props.match.params.oid * 1)
      .then((res) => {
        clearInterval(this.addpercent)
        if (res.stat === 'OK') {
          this.setState({
            status: 'success',
            percent: 100
          })
          setTimeout(() => {
            window.location.href = res.url
          }, 1000)
        } else {
          this.setError()
        }
      })
      .catch(() => {
        clearInterval(this.addpercent)
        this.setState({
          status: 'exception',
          percent: 100
        })
        Modal.error({
          title: 'Network Timeout',
          content:
            'Please confirm that you are connected to the normal network and refresh the web page.'
        })
      })
  }
  setError() {
    this.setState({
      status: 'exception',
      percent: 100
    })
    Modal.error({
      title: 'This is a wrong order number.',
      content:
        'Please confirm that the order number you need to pay is correct. If you have any questions, please consult the administrator.'
    })
  }
  componentDidMount() {
    if (this.props.match.params.oid) {
      this.getLink()
    } else {
      this.setError()
    }
  }
  componentWillUnmount() {}
}
