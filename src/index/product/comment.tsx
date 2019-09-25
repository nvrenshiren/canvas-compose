import { Avatar, List, Row, Col, Divider } from 'antd'
import * as React from 'react'
import Common from '@/common/common'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CommentService from '@/services/comment'

interface Props {
  pid: number
  dgid: number
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
    this.state = {
      listRows: []
    }
  }
  state: any
  render() {
    return (
      <Row style={{ marginBottom: 30 }}>
        <Col span={15}>
          <Divider orientation="left" style={{ marginBottom: 5 }}>
            Comment
          </Divider>
          <List
            locale={{
              emptyText: 'none Data!'
            }}
            // itemLayout="vertical"
            dataSource={this.state.listRows}
            renderItem={(item: any) => (
              <List.Item
                extra={
                  <Row type="flex" gutter={20} style={{ marginTop: 12 }}>
                    {item.pics.map((img: string, index: number) => {
                      return (
                        <Col key={`compic-${item.comid}-${index}`}>
                          <img
                            src={`/api/transfer/downloadThumbs/${img}`}
                            width="100"
                            height="100"
                          />
                        </Col>
                      )
                    })}
                  </Row>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ display: 'inline-block' }}
                      src={'/api/transfer/downloadThumbs/' + item.pic}
                      icon="user"
                    />
                  }
                  title={item.content}
                  description={`${item.nickname} ${Common.dateTime(
                    item.ctime
                  )}`}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    )
  }
  componentDidMount() {
    CommentService.searchComment({
      pageIndex: 1,
      pageSize: 10000,
      type: 2,
      pid: this.props.pid * 1,
      dgid: this.props.dgid * 1
    }).then((res) => {
      if (res.stat === 'OK') {
        this.setState({
          listRows: res.rows
        })
      }
    })
  }
  componentWillUnmount() {}
}
