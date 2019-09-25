import * as React from 'react'
import Common from '../../common/common'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImageUp from '../../util/upload/normal.upload'
import { Alert } from 'antd'
interface Props {
  callback: Function
  getData: Function
}

export default class extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
  }
  render() {
    return (
      <div className="control-up-diy">
        <Alert
          message="Upload images from your computer"
          type="info"
          style={{ marginBottom: 15 }}
        />
        <ImageUp
          subname="上传图片"
          return={(file: string[], thumbUrl: any) => {
            this.props.getData(file[0])
          }}
          default={['']}
          number={1}
        />
      </div>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
