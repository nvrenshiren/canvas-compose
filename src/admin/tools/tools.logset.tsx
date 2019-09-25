import * as React from 'react'
import Common from '@/common/common'
import PureRenderMixin from 'react-addons-pure-render-mixin'
export default class extends React.Component {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return <div />
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
