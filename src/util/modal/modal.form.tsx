import { Modal } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import * as ReactDOM from 'react-dom'
import { message } from 'antd'

interface Props {
  title: string //表单名称
  type: string //类型   edit | add
  formCom: any //表单组件
  module: string //模块名称
  service: Function //表单点击保存时用到的接口
  width?: number
  [key: string]: any //表单参数
  callback?: Function // 回调
}
const Box = document.createElement('div')
class ModalForm extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: {
    show: boolean
    isLoading: boolean
  }
  initComponent() {
    this.state = {
      show: true,
      isLoading: false
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  FormComponent: WrappedFormUtils
  render() {
    let { title, formCom, module, service, width, ...params } = this.props
    let FormComponent = this.props.formCom
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
        onOk={this.FormSave.bind(this)}
        {...params}
      >
        <FormComponent
          {...params}
          ref={this.getRef.bind(this)}
          Save={this.FormSave.bind(this)}
        />
      </Modal>
    )
  }
  getRef(FormComponent: WrappedFormUtils) {
    this.FormComponent = FormComponent
  }
  FormSave() {
    this.setState({
      isLoading: true
    })
    this.FormComponent.validateFields((err: any, values: any) => {
      if (err) {
        this.setState({
          isLoading: false
        })
        return false
      } else {
        this.props.service(values).then((res: any) => {
          this.props.callback && this.props.callback(res, values)
          if (res.stat === 'OK') {
            this.setState({
              show: false
            })
          } else {
            message.warning(res.errText)
          }
          this.setState({
            isLoading: false
          })
        })
      }
    })
  }
  componentDidMount() {}
  componentWillUnmount() {}
}

interface Params {
  key: string //key值
  title: string //模态框标题
  type: string //表单类型 add?edit
  module?: string //模块
  formCom: Function //表单组件
  service: Function //表单保存调用的接口
  [params: string]: any //表单所需的其他参数
}

export default {
  open(params: Params) {
    let { key, title, type, module, formCom, service, ...props } = params
    let modal = React.createElement(ModalForm, {
      key,
      title,
      type,
      module,
      formCom,
      service,
      ...props
    })
    ReactDOM.render(modal, Box)
  }
}
