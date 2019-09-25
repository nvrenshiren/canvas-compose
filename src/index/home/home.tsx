import Common from '@/common/common'
import AdService from '@/services/ad'
import { Carousel, Col, Row } from 'antd'
import * as React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { RouteComponentProps } from 'react-router-dom'
import Link from 'umi/link'
import './home.less'

interface State {
  slides: any[]
  news: any[]
  latest: any[]
  subnavs: any[]
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
      slides: [],
      news: [],
      latest: [],
      subnavs: []
    }
  }
  state: State
  render() {
    return (
      <div>
        <Carousel effect="fade" className="main-item">
          {this.state.slides.map((slide) => {
            return (
              <div key={`home-slide-${slide.pic}`}>
                <img
                  src={Common.getThumb(
                    slide.pic,
                    document.body.offsetWidth,
                    650
                  )}
                  width="100%"
                  height="650"
                />
              </div>
            )
          })}
        </Carousel>
        <div className="index-content-warp main">
          <Row gutter={32} className="main-item">
            {this.state.subnavs.map((subnav) => {
              return (
                <Col span={8} key={`home-subnav-${subnav.pic}`}>
                  <a href="">
                    <img
                      src={Common.getThumb(subnav.pic, 379, 115)}
                      width="100%"
                      height="115"
                    />
                  </a>
                </Col>
              )
            })}
          </Row>
          <Row className="main-item">
            <Col>
              <Row
                className="new-product item-tab"
                type="flex"
                justify="space-between"
              >
                <Col>NEW PRODUCT</Col>
                <Col>
                  <Link to="">MORE</Link>
                </Col>
              </Row>
              <Row
                className="new-product item-box"
                type="flex"
                justify="center"
                gutter={10}
              >
                {this.state.news.map((newpic) => {
                  return (
                    <Col span={6} key={`home-newpic-${newpic.pic}`}>
                      <Link to="">
                        <img
                          src={Common.getThumb(newpic.pic, 270, 370)}
                          width="270"
                          height="370"
                        />
                      </Link>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
          <Row className="main-item">
            <Col>
              <Row
                className="new-product item-tab"
                type="flex"
                justify="space-between"
              >
                <Col>LATEST VERSION</Col>
                <Col>
                  <Link to="">MORE</Link>
                </Col>
              </Row>
              <Row
                className="latest-version item-box"
                type="flex"
                justify="center"
                gutter={10}
              >
                {this.state.latest.map((late) => {
                  return (
                    <Col span={6} key={`home-late-${late.pic}`}>
                      <Link to="">
                        <img
                          src={Common.getThumb(late.pic, 270, 576)}
                          width="270"
                          height="576"
                        />
                      </Link>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  getData() {
    AdService.listAllAd().then((res) => {
      let items: any[] = res.rows
      let slides = items.filter((item) => {
        return item.adtid === 15
      })
      let news = items.filter((item) => {
        return item.adtid === 16
      })
      let latest = items.filter((item) => {
        return item.adtid === 17
      })
      let subnavs = items.filter((item) => {
        return item.adtid === 18
      })
      this.setState({ slides, news, latest, subnavs })
    })
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUnmount() {}
}
