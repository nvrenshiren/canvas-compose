import { Col, Row } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as React from 'react'
import ImageUp from '@/util/upload/normal.upload'

interface Props {
  binditems: {
    [key: string]: {
      main?: string
      shadow?: string
      mask?: string[]
    }
  }
  form: WrappedFormUtils
  [key: string]: any
}

interface State {
  [key: string]: {
    main?: string
    shadow?: string
    mask?: string[]
  }
}

export default class extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.state = Object.assign(
      {},
      {
        front: {
          main: '',
          shadow: '',
          mask: []
        },
        back: {
          main: '',
          shadow: '',
          mask: []
        },
        right: {
          main: '',
          shadow: '',
          mask: []
        },
        left: {
          main: '',
          shadow: '',
          mask: []
        }
      },
      this.props.binditems
    )
  }
  state: State
  setValue(params: State) {
    let nowState = this.state
    let assign = Object.assign({}, nowState, params)
    this.setState(assign)
  }
  render() {
    return (
      <div className="form-img-bind" key="binditems">
        <Row gutter={15} type="flex" key="front.box">
          <Col style={{ width: 130 }} key="front.main">
            <ImageUp
              subname="正面主图"
              default={[this.state.front.main]}
              return={(file: string[]) => {
                this.setValue({
                  front: Object.assign({}, this.state.front, {
                    main: file[0] || ''
                  })
                })
              }}
              number={1}
            />
          </Col>
          <Col style={{ width: 130 }} key="front.shadow">
            <ImageUp
              subname="正面阴影"
              default={[this.state.front.shadow]}
              return={(file: string[]) => {
                this.setValue({
                  front: Object.assign({}, this.state.front, {
                    shadow: file[0] || ''
                  })
                })
              }}
              number={1}
            />
          </Col>
          <Col style={{ width: 0, flexGrow: 1 }} key="front.mask">
            <ImageUp
              subname="正面画布"
              default={this.state.front.mask}
              return={(file: string[]) => {
                this.setValue({
                  front: Object.assign({}, this.state.front, {
                    mask: file
                  })
                })
              }}
              number={3}
            />
          </Col>
        </Row>
        <Row gutter={15} type="flex" key="back.box">
          <Col style={{ width: 130 }} key="back.main">
            <ImageUp
              subname="背面主图"
              default={[this.state.back.main]}
              return={(file: string[]) => {
                this.setValue({
                  back: Object.assign({}, this.state.back, {
                    main: file[0] || ''
                  })
                })
              }}
              number={1}
            />
          </Col>
          <Col style={{ width: 130 }} key="back.shadow">
            <ImageUp
              subname="背面阴影"
              default={[this.state.back.shadow]}
              return={(file: string[]) => {
                this.setValue({
                  back: Object.assign({}, this.state.back, {
                    shadow: file[0] || ''
                  })
                })
              }}
              number={1}
            />
          </Col>
          <Col style={{ width: 0, flexGrow: 1 }} key="back.mask">
            <ImageUp
              subname="背面画布"
              default={this.state.back.mask}
              return={(file: string[]) => {
                this.setValue({
                  back: Object.assign({}, this.state.back, {
                    mask: file
                  })
                })
              }}
              number={3}
            />
          </Col>
        </Row>
        <Row gutter={15} type="flex" key="right.box">
          <Col style={{ width: 130 }} key="right.main">
            <ImageUp
              subname="右面主图"
              default={[this.state.right.main]}
              return={(file: string[]) => {
                this.setValue({
                  right: Object.assign({}, this.state.right, {
                    main: file[0] || ''
                  })
                })
              }}
              number={1}
            />
          </Col>
          <Col style={{ width: 130 }} key="right.shadow">
            <ImageUp
              subname="右面阴影"
              default={[this.state.right.shadow]}
              return={(file: string[]) => {
                this.setValue({
                  right: Object.assign({}, this.state.right, {
                    shadow: file[0] || ''
                  })
                })
              }}
              number={1}
            />
          </Col>
          <Col style={{ width: 0, flexGrow: 1 }} key="right.mask">
            <ImageUp
              subname="右面画布"
              default={this.state.right.mask}
              return={(file: string[]) => {
                this.setValue({
                  right: Object.assign({}, this.state.right, {
                    mask: file
                  })
                })
              }}
              number={3}
            />
          </Col>
        </Row>
        <Row gutter={15} type="flex" key="left.box">
          <Col style={{ width: 130 }} key="left.main">
            <ImageUp
              subname="左面主图"
              default={[this.state.left.main]}
              return={(file: string[]) => {
                this.setValue({
                  left: Object.assign({}, this.state.left, {
                    main: file[0] || ''
                  })
                })
              }}
              number={1}
            />
          </Col>
          <Col style={{ width: 130 }} key="left.shadow">
            <ImageUp
              subname="左面阴影"
              default={[this.state.left.shadow]}
              return={(file: string[]) => {
                this.setValue({
                  left: Object.assign({}, this.state.left, {
                    shadow: file[0] || ''
                  })
                })
              }}
              number={1}
            />
          </Col>
          <Col style={{ width: 0, flexGrow: 1 }} key="left.mask">
            <ImageUp
              subname="左面画布"
              default={this.state.left.mask}
              return={(file: string[]) => {
                this.setValue({
                  left: Object.assign({}, this.state.left, {
                    mask: file
                  })
                })
                // this.setValue({ left: { mask: file } })
              }}
              number={3}
            />
          </Col>
        </Row>
      </div>
    )
  }
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return JSON.stringify(nextState) !== JSON.stringify(this.state)
  }
  componentDidUpdate() {
    this.props.form.setFieldsValue({ binditems: this.state })
  }
}
