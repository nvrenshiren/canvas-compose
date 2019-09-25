import * as React from 'react'
import Common from '../../common/common'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Row, Select } from 'antd'
import ProductService from '../../services/product'
import Grid from '../../util/grid/grid'
import store from '../../store/store'

interface Props {
  callback?: Function
  getData?: Function
}

interface State {
  themes?: any[]
  tid?: number
  flowers?: any[]
  ready?: boolean
  isLoading?: boolean
}

const Columns = [
  {
    field: 'flower',
    grid: true,
    formatter: (item: any) => {
      return (
        <img
          src={Common.getThumb(item.pic, 110, 160)}
          width="110"
          height="160"
        />
      )
    }
  }
]

const Option = Select.Option
export default class extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    )
    this.state = {
      themes: [],
      tid: 0,
      flowers: [],
      ready: false,
      isLoading: true
    }
  }
  state: State
  render() {
    return (
      <Row
        className="control-flower-select"
        id="control-flower-select-box"
        style={{ minHeight: 400 }}
      >
        {this.state.ready && (
          <Row className="theme-select">
            <Select
              style={{ width: '100%' }}
              defaultValue={this.state.tid}
              onChange={(value) => {
                this.setState({
                  tid: value
                })
              }}
            >
              {this.state.themes.map((theme) => {
                return (
                  <Option key={'theme-select-' + theme.tid} value={theme.tid}>
                    {theme.name}
                  </Option>
                )
              })}
            </Select>
          </Row>
        )}
        <Row className="flower-select" style={{ marginTop: 15, height: 400 }}>
          <Grid
            columns={Columns}
            modules="flower"
            getdata={this.getData.bind(this)}
            event={this.itemEvent.bind(this)}
            rowHeight={200}
            columnWidth={150}
            pagination={false}
            isLoading={this.state.isLoading}
          />
        </Row>
      </Row>
    )
  }
  getData() {
    this.setState({
      isLoading: true
    })
    ProductService.listStyle({
      tid: this.state.tid,
      pageIndex: 1,
      pageSize: 999
    }).then((res: any) => {
      store.dispatch({
        type: 'LIST_ADD',
        list: {
          items: res.rows,
          total: res.total,
          pageIndex: 1,
          pageSize: 999,
          pagination: false
        }
      })
      this.setState({
        isLoading: false
      })
    })
  }
  componentDidUpdate(props: any, state: State) {
    if (this.state.tid !== state.tid) {
      this.getData()
    }
  }
  itemEvent(event: any, item: any) {
    if (event === 'onClick') {
      this.props.getData(item.pic)
    }
  }
  componentDidMount() {
    ProductService.listTheme({ pageIndex: 1, pageSize: 999 }).then(
      (res: any) => {
        this.setState({
          themes: res.rows,
          tid: res.rows[0].tid,
          ready: true
        })
      }
    )
  }
  componentWillUnmount() {}
}
