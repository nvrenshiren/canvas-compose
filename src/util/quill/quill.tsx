import * as React from 'react'
import Common from '../../common/common'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import TransferService from '../../services/transfer'
import ReactQuill from 'react-quill'
import * as _ from 'underscore'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import './quill.less'
interface Props {
  value?: string
  return?: Function
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
  quillRef: any
  reactQuillRef: any
  modules = {
    // theme: 'snow',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' }
        ],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: this.imageHandler.bind(this)
      }
    }
  }
  imageHandler(image: any, callback: any) {
    const self = this
    if (image) {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.click()
      // Listen upload local image and save to server
      input.onchange = () => {
        const file = input.files[0]
        let fileType = file.type.split('/')[1]
        if (_.indexOf(['jpg', 'jpeg', 'png', 'gif'], fileType) === -1) {
          alert('请上传文件类型')
          return false
        }
        TransferService.getUploadId().then((res: any) => {
          if (res.stat === 'OK') {
            // res.uploadId
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            formData.append('file', file)
            xhr.onreadystatechange = function(e) {
              if (xhr.readyState == 4) {
                let res: any = JSON.parse(xhr.responseText)
                if (res.stat == 'OK') {
                  let url = '/api/transfer/download/' + res.fileId
                  const range = self.quillRef.getEditor().getSelection()
                  self.quillRef
                    .getEditor()
                    .insertEmbed(range.index, 'image', url)
                }
              }
            }
            let url = '/api/transfer/upload/' + res.uploadId
            xhr.open('POST', url, true)
            xhr.send(formData)
          }
        })
      }
    }
  }
  handleChange(value: any) {
    !!this.props.return && this.props.return(value)
  }
  render() {
    return (
      <ReactQuill
        value={this.props.value}
        className="qrill-main"
        theme={'snow'}
        modules={this.modules}
        onChange={this.handleChange.bind(this)}
        ref={el => {
          this.quillRef = el
        }}
      />
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
