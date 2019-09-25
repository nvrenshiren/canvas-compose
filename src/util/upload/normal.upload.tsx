import * as React from 'react'
import _ from 'underscore'
import TransferService from '@/services/transfer'
import { Icon, Modal, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'

declare type acceptType = 'audio/*' | 'video/*' | 'image/*' | 'obj/*'

interface Props {
  subname?: string
  accept?: acceptType
  return: Function
  number: number
  default: string[]
  [key: string]: any
}

interface State {
  preview: boolean
  image: string
  fileList: UploadFile[]
}

export default class extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  state: State
  acceptType: string
  UploadID: string //上传ID
  UploadImg: string[] //返回数组用
  initComponent() {
    this.acceptType = !!this.props.accept ? this.props.accept : 'image/*'
    this.UploadID = ''
    this.UploadImg = []
    this.state = {
      fileList: this.getDefault(this.props.default),
      preview: false,
      image: ''
    }
  }
  getDefault(list: string[]) {
    let fileList = [] as UploadFile[]
    let thumb = ''
    if (list.length > 0 && !!list[0]) {
      this.UploadImg = []
      fileList = list.map((img) => {
        this.UploadImg.push(img)
        switch (this.acceptType) {
          case 'image/*':
            thumb = `/api/transfer/downloadThumbs/${img}`
            break
          default:
            thumb = require('@/statics/img/obj.png')
            break
        }
        return {
          uid: img,
          name: img,
          size: 0,
          type: 'image/png',
          thumbUrl: thumb,
          url: thumb,
          response: {
            fileId: img
          }
        }
      })
    }
    return fileList
  }
  onCancel() {
    this.setState({ preview: false })
  }
  onPreview(file: UploadFile) {
    if (this.acceptType === 'image/*') {
      this.setState({
        image: `/api/transfer/downloadThumbs/${
          file.response ? file.response.fileId : file.url
        }`,
        preview: true
      })
    }
  }

  onChange(info: UploadChangeParam) {
    this.setState({
      fileList: info.fileList
    })
    switch (info.file.status) {
      case 'done':
        this.UploadImg = _.uniq(
          this.UploadImg.concat([info.file.response.fileId])
        )
        !!this.props.return &&
          this.props.return(this.UploadImg, info.file.thumbUrl)
        break
      case 'removed':
        this.UploadImg = _.difference(this.UploadImg, [
          info.file.response.fileId
        ])
        !!this.props.return &&
          this.props.return(this.UploadImg, info.file.thumbUrl)
        break
    }
  }

  beforeUpload() {
    return new Promise((resolve, reject) => {
      TransferService.getUploadId().then((res: any) => {
        if (res.stat === 'OK') {
          this.UploadID = res.uploadId
          setTimeout(() => {
            resolve()
          }, 50)
        }
      })
    })
  }
  getAction() {
    return '/api/transfer/upload/' + this.UploadID
  }

  render() {
    const { preview, image, fileList } = this.state
    const uploadButton = (
      <div key="upload">
        <Icon type="plus" />
        <div key="upload-plus" className="ant-upload-text">
          {this.props.subname || '上传图片'}
        </div>
      </div>
    )
    return (
      <div className="clearfix uploadBox" style={{ minHeight: '112px' }}>
        <Upload
          key="Upload"
          accept={this.props.accept || 'image/*'}
          action={this.getAction.bind(this)}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.onPreview.bind(this)}
          onChange={this.onChange.bind(this)}
          beforeUpload={this.beforeUpload.bind(this)}
        >
          {fileList.length >= this.props.number ? null : uploadButton}
        </Upload>
        {this.acceptType === 'image/*' && (
          <Modal
            key="Modal"
            visible={preview}
            footer={null}
            onCancel={this.onCancel.bind(this)}
          >
            <img className="wfull" src={image} />
          </Modal>
        )}
      </div>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
