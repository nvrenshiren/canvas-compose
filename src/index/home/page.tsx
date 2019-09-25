import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { RouteComponentProps } from 'react-router-dom'
import * as _ from 'underscore'
import ContentService from '@/services/content'
import './page.less'

interface State {
  item: any
}

export default class extends React.Component<RouteComponentProps<any>> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      item: {}
    }
  }
  state: State
  render() {
    return (
      <div className="s-page">
        <div dangerouslySetInnerHTML={{ __html: this.state.item.detail }} />
      </div>
    )
  }
  getData() {
    ContentService.listSinglePages({ pageIndex: 1, pageSize: 1000 }).then(
      (res) => {
        if (res.stat === 'OK') {
          let tmp = _.filter(res.rows, (v: any) => {
            return v.spid == this.props.match.params.id
          })
          this.setState({
            item: tmp[0]
          })
        }
      }
    )
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUnmount() {}
}
