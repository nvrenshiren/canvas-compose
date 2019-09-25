import * as React from 'react'
import { Modal, Row, Col } from 'antd'
import ReactDOM from 'react-dom'
interface State {
  visible: boolean
}
interface Props {
  dom?: HTMLElement
  width?: number
}
class ModalNobg extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      visible: false
    }
  }
  state: State
  render() {
    return (
      <Modal
        className="flower-modal"
        afterClose={() => {
          //关闭后销毁BOX
          ReactDOM.unmountComponentAtNode(this.props.dom)
        }}
        width={this.props.width}
        footer={null}
        keyboard={false}
        destroyOnClose
        closable
        visible={this.state.visible}
        centered
        onCancel={() => {
          this.setState({
            visible: false
          })
        }}
      >
        {this.props.children}
      </Modal>
    )
  }
  CloseThis() {
    this.setState({
      visible: false
    })
  }
  componentDidMount() {
    this.setState({
      visible: true
    })
  }
  componentWillUnmount() {}
}

export default ModalNobg

