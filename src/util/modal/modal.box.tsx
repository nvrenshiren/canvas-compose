import { Modal } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import * as ReactDOM from 'react-dom'

interface Props {
  title: string //名称
  key: string //key类型
  boxCom: any //组件
  module: string //模块名称
  width?: number
  callback?: Function // 回调
  [key: string]: any //其他参数
}
const Box = document.createElement('div')
class ModalBox extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: {
    show: boolean
    isLoading: boolean
  }
  Data: any
  initComponent() {
    this.state = {
      show: true,
      isLoading: false
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  render() {
    let { title, boxCom, module, callback, width, ...params } = this.props
    let NewboxCom = this.props.boxCom
    return (
      <Modal
        visible={this.state.show}
        afterClose={() => {
          //关闭后销毁BOX
          ReactDOM.unmountComponentAtNode(Box)
        }}
        maskClosable={false}
        keyboard={false}
        width={width || 800}
        centered={true}
        closable={true}
        confirmLoading={this.state.isLoading}
        destroyOnClose={true}
        title={this.props.title}
        onCancel={() => {
          this.setState({
            show: false
          })
        }}
        onOk={this.onOk.bind(this)}
        {...params}
      >
        <NewboxCom
          {...params}
          callback={this.onOk.bind(this)}
          getData={this.getData.bind(this)}
        />
      </Modal>
    )
  }
  getData(data?: any) {
    this.Data = data
  }
  onOk(data?: any) {
    this.setState({
      show: false
    })
    this.props.callback && this.props.callback(this.Data || data)
  }
  componentDidMount() {}
  componentWillUnmount() {}
}

interface Params {
  key: string //key值
  title: string //模态框标题
  module?: string //模块
  boxCom: Function //组件
  callback: Function //回调
  [params: string]: any //其他参数
}

export default {
  open(params: Params) {
    let { key, title, module, boxCom, ...props } = params
    let modal = React.createElement(ModalBox, {
      key: key,
      title: title,
      module: module,
      boxCom: boxCom,
      ...props
    })
    ReactDOM.render(modal, Box)
  }
}
