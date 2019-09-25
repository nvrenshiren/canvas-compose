import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { Row, Col } from 'antd'

export default class extends React.Component {
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
      <div className="share-plsu">
        <Row className="share-buttons" type="flex" gutter={10} align="middle">
          <Col>
            <h3>Share This:</h3>
          </Col>
          <Col>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Frighr.keyman.com&quote="
              title="Share on Facebook"
              target="_blank"
              onClick={() => {
                window.open(
                  'https://www.facebook.com/sharer/sharer.php?u=' +
                    encodeURIComponent(document.URL) +
                    '&quote=' +
                    encodeURIComponent(document.URL)
                )
                return false
              }}
            >
              <img
                width="32"
                alt="Share on Facebook"
                src={require('../../statics/share/Facebook.svg')}
              />
            </a>
          </Col>
          <Col>
            <a
              href="https://twitter.com/intent/tweet?source=http%3A%2F%2Frighr.keyman.com&text=:%20http%3A%2F%2Frighr.keyman.com&via=righr-keyman"
              target="_blank"
              title="Tweet"
              onClick={() => {
                window.open(
                  'https://twitter.com/intent/tweet?text=' +
                    encodeURIComponent(document.title) +
                    ':%20' +
                    encodeURIComponent(document.URL)
                )
                return false
              }}
            >
              <img
                width="32"
                alt="Tweet"
                src={require('../../statics/share/Twitter.svg')}
              />
            </a>
          </Col>
          <Col>
            <a
              href="https://plus.google.com/share?url=http%3A%2F%2Frighr.keyman.com"
              target="_blank"
              title="Share on Google+"
              onClick={() => {
                window.open(
                  'https://plus.google.com/share?url=' +
                    encodeURIComponent(document.URL)
                )
                return false
              }}
            >
              <img
                width="32"
                alt="Share on Google+"
                src={require('../../statics/share/Google+.svg')}
              />
            </a>
          </Col>
          <Col>
            <a
              href="http://www.tumblr.com/share?v=3&u=http%3A%2F%2Frighr.keyman.com&quote=&s="
              target="_blank"
              title="Post to Tumblr"
              onClick={() => {
                window.open(
                  'http://www.tumblr.com/share?v=3&u=' +
                    encodeURIComponent(document.URL) +
                    '&quote=' +
                    encodeURIComponent(document.title)
                )
                return false
              }}
            >
              <img
                width="32"
                alt="Post to Tumblr"
                src={require('../../statics/share/Tumblr.svg')}
              />
            </a>
          </Col>
          <Col>
            <a
              href="http://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Frighr.keyman.com&title=&summary=&source=http%3A%2F%2Frighr.keyman.com"
              target="_blank"
              title="Share on LinkedIn"
              onClick={() => {
                window.open(
                  'http://www.linkedin.com/shareArticle?mini=true&url=' +
                    encodeURIComponent(document.URL) +
                    '&title=' +
                    encodeURIComponent(document.title)
                )
                return false
              }}
            >
              <img
                width="32"
                alt="Share on LinkedIn"
                src={require('../../statics/share/LinkedIn.svg')}
              />
            </a>
          </Col>
        </Row>
      </div>
    )
  }
  componentDidMount() {}
  componentWillUnmount() {}
}
