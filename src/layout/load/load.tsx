import { Spin } from 'antd'
import * as React from 'react'
export default class extends React.Component {
  render() {
    return (
      <div style={{ paddingTop: 100, textAlign: 'center', width: '100%' }}>
        <Spin size="large" />
      </div>
    )
  }
}
