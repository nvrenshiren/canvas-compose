import {
  Checkbox,
  Col,
  Dropdown,
  Layout,
  Pagination,
  Row,
  Spin,
  List
} from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EventPlus from '../../common/event'
import { AutoSizer, List as VList, ListRowProps } from 'react-virtualized'
import store from '../../store/store'
import './list.less'
interface Props {
  columns: any[]
  pagination?: boolean
  modules: string
  getdata: Function
  event: Function
  isLoading?: boolean
  contextmenu?: Function
  rowHeight?: number
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
      items: store.getState().list.items
    }
  }
  state: {
    items: any[]
  }
  render() {
    let { pageIndex, pageSize, total } = store.getState().list
    let selected = this.state.items.filter((item: any) => {
      return item.selected
    })
    return (
      <Layout className="list-box">
        <div className="list-header-box">
          <Row type="flex" justify="space-between">
            {this.props.columns.map((column, index) => {
              if (column.checkbox) {
                return (
                  <Col key={index} className="list-header-checkbox">
                    <Checkbox
                      checked={
                        this.state.items.length > 0 &&
                        this.state.items.length === selected.length
                      }
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < this.state.items.length
                      }
                      onChange={this.onCheckAllChange.bind(this)}
                    />
                  </Col>
                )
              } else {
                return (
                  <Col
                    key={index}
                    className="list-header-column"
                    style={
                      column.width > 0
                        ? { width: column.width }
                        : { flexGrow: 1, width: 0 }
                    }
                  >
                    <span
                      className="col-item"
                      onClick={() => {
                        this.sortable(column.sortable && column.field)
                      }}
                    >
                      {column.title}
                    </span>
                  </Col>
                )
              }
            })}
          </Row>
        </div>
        <Content className="list-main-box" id="list-scroll">
          <List dataSource={[]} renderItem={{}}>
            {this.state.items.length > 0 &&
              !this.props.isLoading && (
                <AutoSizer disableHeight>
                  {() => {
                    let scrollElement = document.getElementById('list-scroll')
                    let { offsetWidth, offsetHeight } = scrollElement
                    return (
                      <VList
                        style={{ outline: 0 }}
                        height={
                          this.state.items.length * (this.props.rowHeight || 53)
                        }
                        overscanRowCount={2}
                        rowCount={
                          this.props.pagination
                            ? pageSize > this.state.items.length
                              ? this.state.items.length
                              : pageSize
                            : total
                        }
                        rowHeight={this.props.rowHeight || 53}
                        rowRenderer={this.renderItem.bind(this)}
                        width={offsetWidth}
                      />
                    )
                  }}
                </AutoSizer>
              )}
            {this.props.isLoading && (
              <div style={{ textAlign: 'center' }}>
                <Spin className="list-data-spin" size="large" />
              </div>
            )}
          </List>
        </Content>
        {this.props.pagination &&
          this.state.items.length > 0 && (
            <Footer className="list-footer-page">
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
              />
            </Footer>
          )}
      </Layout>
    )
  }
  renderItem({ index, key, style }: ListRowProps) {
    let data = store.getState().list.items
    let item = data[index]
    return (
      !!item &&
      (!!this.props.contextmenu ? (
        <Dropdown
          disabled={!this.props.contextmenu}
          key={key + 'Dropdown'}
          overlay={
            !!this.props.contextmenu &&
            this.props.contextmenu([item], this.props.modules)
          }
          trigger={['contextMenu']}
          onVisibleChange={(visible) => {
            visible && this.onSelect(index)
          }}
        >
          <div style={style}>
            <List.Item className="list-item-box">
              <Row
                type="flex"
                justify="space-between"
                className={
                  item.selected
                    ? 'wfull list-main-item active'
                    : 'wfull list-main-item'
                }
                onClick={(event) => {
                  this.onClick(index, item, event)
                }}
                onDoubleClick={(event) => {
                  this.onDoubleClick(index, item)
                }}
              >
                {this.props.columns.map((column) => {
                  if (column.checkbox) {
                    return (
                      <Col
                        className="list-item-checkbox"
                        onClick={(event) => {
                          event.stopPropagation()
                          this.onMulti(index)
                        }}
                        key={`${column.field}${index}`}
                      >
                        <Checkbox checked={item.selected} />
                      </Col>
                    )
                  } else {
                    return (
                      <Col
                        className="list-item-content"
                        key={`${column.field}${index}`}
                        style={
                          column.width > 0
                            ? { width: column.width }
                            : { flexGrow: 1, width: 0 }
                        }
                      >
                        {column.formatter(item)}
                      </Col>
                    )
                  }
                })}
              </Row>
            </List.Item>
          </div>
        </Dropdown>
      ) : (
        <div
          style={style}
          key={key + 'noDropdown'}
          className="ant-dropdown-trigger"
        >
          <List.Item className="list-item-box">
            <Row
              type="flex"
              justify="space-between"
              className={
                item.selected
                  ? 'wfull list-main-item active'
                  : 'wfull list-main-item'
              }
              onClick={(event) => {
                this.onClick(index, item, event)
              }}
              onDoubleClick={(event) => {
                this.onDoubleClick(index, item)
              }}
            >
              {this.props.columns.map((column) => {
                if (column.checkbox) {
                  return (
                    <Col
                      className="list-item-checkbox"
                      onClick={(event) => {
                        event.stopPropagation()
                        this.onMulti(index)
                      }}
                      key={`${column.field}${index}`}
                    >
                      <Checkbox checked={item.selected} />
                    </Col>
                  )
                } else {
                  return (
                    <Col
                      className="list-item-content"
                      key={`${column.field}${index}`}
                      style={
                        column.width > 0
                          ? { width: column.width }
                          : { flexGrow: 1, width: 0 }
                      }
                    >
                      {column.formatter(item)}
                    </Col>
                  )
                }
              })}
            </Row>
          </List.Item>
        </div>
      ))
    )
  }
  refreshData() {
    let { pagination, pageIndex, pageSize } = store.getState().list
    this.props.getdata(pageIndex, pageSize, pagination)
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
  onCheckAllChange() {
    let selected = this.state.items.filter((item: any) => {
      return item.selected
    })
    store.dispatch({
      type: selected.length > 0 ? 'LIST_SELECT_NONE' : 'LIST_SELECT_ALL'
    })
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
  sortable(field?: string) {}
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
  componentWillUnmount() {
    EventPlus.off('listRefresh')
    this.setState = () => {
      return false
    }
  }
}
