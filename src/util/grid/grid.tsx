import { Dropdown, Layout, Pagination, Spin } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '../../common/event'
import { AutoSizer, Grid, GridCellProps } from 'react-virtualized'
import { ListCol } from '../../interfaces/mode'
import store from '../../store/store'
import './grid.less'
interface Props {
  columns: ListCol[]
  pagination?: boolean
  modules: string
  getdata: Function
  event: Function
  isLoading?: boolean
  contextmenu?: Function
  rowHeight?: number
  columnWidth?: number
}

const { Content, Footer } = Layout
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
      items: []
    }
  }
  state: {
    items: any[]
  }
  render() {
    let { items, pageIndex, pageSize, total } = store.getState().list
    return (
      <Layout className="grid-box">
        <Content className="grid-main-box" id="list-scroll">
          {this.state.items.length > 0 &&
            !this.props.isLoading && (
              <AutoSizer disableHeight>
                {() => {
                  let scrollElement = document.getElementById('list-scroll')
                  let { offsetWidth, offsetHeight } = scrollElement
                  let columnWidth = this.props.columnWidth || 150
                  let rowHeight = this.props.rowHeight || 170
                  //计算一行放几列-1
                  let columnCount = Math.floor(offsetWidth / columnWidth)
                  //计算一共有多少行+1
                  let rowCount = Math.ceil(this.state.items.length / columnCount)
                  return (
                    <Grid
                      style={{ outline: 0 }}
                      cellRenderer={(props: GridCellProps) => {
                        return this.renderItem(props, columnCount)
                      }}
                      columnWidth={columnWidth}
                      columnCount={columnCount}
                      height={rowCount * rowHeight}
                      overscanColumnCount={0}
                      overscanRowCount={1}
                      rowHeight={rowHeight}
                      rowCount={rowCount}
                      width={offsetWidth}
                    />
                  )
                }}
              </AutoSizer>
            )}
          {this.props.isLoading && (
            <div style={{ textAlign: 'center' }}>
              <Spin className="grid-data-spin" size="large" />
            </div>
          )}
        </Content>
        {this.props.pagination &&
          this.state.items.length > 0 && (
            <Footer className="grid-footer-page">
              <Pagination
                defaultCurrent={1}
                defaultPageSize={pageSize}
                pageSize={pageSize}
                current={pageIndex}
                total={total}
                pageSizeOptions={['10', '20', '30', '40', '50']}
                onChange={this.pageChange.bind(this)}
                onShowSizeChange={this.SizeChange.bind(this)}
                showTotal={this.showTotal}
                showSizeChanger
                hideOnSinglePage
              />
            </Footer>
          )}
      </Layout>
    )
  }

  renderItem(props: GridCellProps, columnCount: number) {
    let { rowIndex, columnIndex, key, style } = props
    let data = store.getState().list.items
    let index = rowIndex * columnCount + columnIndex
    let item = data[index]
    let itemWidth = this.props.columnWidth ? this.props.columnWidth - 20 : 130
    let itemHeight = this.props.rowHeight ? this.props.rowHeight - 20 : 150
    return (
      !!item && (
        <Dropdown
          disabled={!this.props.contextmenu}
          key={key + 'Dropdown'}
          overlay={
            (!!this.props.contextmenu &&
              this.props.contextmenu([item], this.props.modules)) || <></>
          }
          trigger={['contextMenu']}
          onVisibleChange={(visible) => {
            visible && this.onSelect(index)
          }}
        >
          <div style={style}>
            <div
              className="grid-item-box"
              style={{ width: itemWidth, height: itemHeight }}
            >
              <div
                style={{ width: itemWidth, height: itemHeight }}
                className={
                  item.selected ? 'grid-main-item active' : 'grid-main-item'
                }
                onClick={(event) => {
                  this.onClick(index, item, event)
                }}
                onDoubleClick={(event) => {
                  this.onDoubleClick(index, item)
                }}
              >
                {this.props.columns.map((column) => {
                  if (!column.checkbox && column.grid) {
                    return (
                      <div
                        className="list-item-content"
                        key={`${column.field}${index}`}
                      >
                        {column.formatter(item)}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </Dropdown>
      )
    )
  }
  showTotal(total: number) {
    let { pageSize } = store.getState().list
    return `共${Math.ceil(total / pageSize)}页  ${total} 条数据`
  }
  SizeChange(current: number, pageSize: number) {
    let { pagination } = store.getState().list
    this.props.getdata(current, pageSize, pagination)
    document.getElementById('list-scroll').scrollTop = 0
  }
  pageChange(current: number, pageSize: number) {
    let { pagination } = store.getState().list
    this.props.getdata(current, pageSize, pagination)
    document.getElementById('list-scroll').scrollTop = 0
  }
  onSelect(index: number) {
    store.dispatch({
      type: 'LIST_SELECT_ITEM',
      list: {
        index: index
      }
    })
  }
  onToggle(index: number) {
    store.dispatch({
      type: 'LIST_TOGGLE_ITEM',
      list: {
        index: index
      }
    })
  }
  onMulti(index: number) {
    store.dispatch({
      type: 'LIST_MULTI_ITEM',
      list: {
        index: index
      }
    })
  }
  onDoubleClick(index: number, item: any) {
    this.props.event('onDoubleClick', item)
  }
  onClick(index: number, item: any, event: React.MouseEvent) {
    if (event.ctrlKey) {
      this.onMulti(index)
    } else {
      this.onToggle(index)
    }
    this.props.event('onClick', item)
  }
  loadMore() {
    let { pageIndex, pageSize, pagination, total } = store.getState().list
    if (this.state.items.length < total) {
      this.props.getdata(++pageIndex, pageSize, pagination)
    }
  }
  componentDidMount() {
    EventPlus.on('listRefresh', () => {
      this.refreshData()
    })
    store.subscribe(() => {
      this.setState({
        items: store.getState().list.items
      })
    })
  }
  refreshData() {
    let { pagination, pageIndex, pageSize } = store.getState().list
    this.props.getdata(pageIndex, pageSize, pagination)
  }
  componentWillUnmount() {
    EventPlus.off('listRefresh')
    this.setState = () => {
      return false
    }
  }
}
