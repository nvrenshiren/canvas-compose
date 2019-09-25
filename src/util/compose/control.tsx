import {
  Button,
  Checkbox,
  Col,
  Divider,
  Icon,
  Popover,
  Row,
  Slider
} from 'antd'
import * as React from 'react'
import { CirclePicker, SketchPicker } from 'react-color'
import { Unsubscribe } from 'redux'
import _ from 'underscore'
import { Mask, Place } from '../../interfaces/mode'
import store from '../../store/store'

import './control.less'
import ModalBox from '../../util/modal/modal.box'
import AddSelf from './add.self'
import AddLocal from './add.local'

interface Props {
  place: any //部位名称
  pid: number
  dimension: number
}

export default class extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.ID = ['compose', 'control', this.props.pid, this.props.place].join('-')
    this.state = {
      global: store.getState().product.global,
      time: new Date().getTime()
    }
  }
  state: {
    global: boolean
    time: number
  }
  ID: string
  Place: Place
  render() {
    this.Place = store.getState().product.compose[this.props.place]
    return (
      <div id={this.ID} className="compose-options">
        <Row>
          <Divider orientation="left" style={{ marginBottom: 5 }}>
            Recommended Options
          </Divider>
        </Row>
        <Row>
          <Col>
            {this.props.dimension === 1 && (
              <React.Fragment>
                <Checkbox
                  style={{ fontSize: 16 }}
                  name="global"
                  onChange={this.ChangeStatus.bind(this)}
                  checked={store.getState().product.global}
                >
                  Same pattern for all parts ?
                </Checkbox>
              </React.Fragment>
            )}
            <Checkbox
              style={{ fontSize: 16 }}
              name="repeat"
              onChange={this.ChangeRepeat.bind(this)}
              checked={this.Place.repeat}
            >
              Repeat ?
            </Checkbox>
          </Col>
          {this.Place.masks.map((mask: Mask, index) => {
            // if(index){
            //   return <></>
            // }else{
            return (
              <Row
                className="compose-option-item"
                key={`compose-option-item${index}`}
              >
                <h3>{index + 1} Part</h3>
                <Row type="flex" justify="space-between" gutter={10}>
                  <Col span={6} className="compose-options-flower">
                    <div className="flower-have-box">
                      {mask.flower !== '' ? (
                        <div className="flower-remove">
                          <img
                            width="78"
                            height="78"
                            src={`/api/transfer/downloadThumbs/${mask.flower}`}
                          />
                          <Icon
                            className="flower-delete"
                            type="delete"
                            onClick={() => {
                              this.ChangeImg('', index)
                            }}
                          />
                        </div>
                      ) : (
                        <Icon type="picture" style={{ fontSize: 80 }} />
                      )}
                    </div>
                  </Col>
                  <Col span={10}>
                    <Row type="flex" justify="space-around">
                      <Button
                        type="primary"
                        block
                        size="large"
                        style={{ marginBottom: 20 }}
                        onClick={() => {
                          ModalBox.open({
                            title: 'Add your image',
                            key: 'diy',
                            boxCom: AddSelf,
                            width: 350,
                            callback: (data: any) => {
                              console.log(index)
                              this.ChangeImg(data, index)
                            }
                          })
                        }}
                      >
                        Add your image
                      </Button>
                      <Button
                        type="primary"
                        block
                        size="large"
                        onClick={() => {
                          ModalBox.open({
                            title: 'Select from righr',
                            key: 'righr',
                            boxCom: AddLocal,
                            callback: (data: any) => {
                              this.ChangeImg(data, index)
                            }
                          })
                        }}
                      >
                        Select From RIGHR
                      </Button>
                    </Row>
                  </Col>
                  <Col span={6} className="compose-options-position">
                    <div className="position-box">
                      <div className="position-item">
                        <Icon
                          title="上30像素"
                          type="caret-up"
                          onClick={() => {
                            this.ChangePosi(index, 'y', -30)
                          }}
                        />
                        <Icon
                          title="下30像素"
                          type="caret-down"
                          onClick={() => {
                            this.ChangePosi(index, 'y', 30)
                          }}
                        />
                        <Icon
                          title="左30像素"
                          type="caret-left"
                          onClick={() => {
                            this.ChangePosi(index, 'x', -30)
                          }}
                        />
                        <Icon
                          title="右30像素"
                          type="caret-right"
                          onClick={() => {
                            this.ChangePosi(index, 'x', 30)
                          }}
                        />
                      </div>
                      <div className="position-bg">
                        <div className="position-line-l position-line" />
                        <div className="position-line-r position-line" />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="compose-options-scale">
                  <Slider
                    defaultValue={mask.scale}
                    min={0.1}
                    max={2.0}
                    step={0.1}
                    onAfterChange={(value: any) => {
                      this.ChangeScale(index, value)
                    }}
                  />
                </Row>
              </Row>
            )
            // }
          })}
        </Row>
        <Row>
          <Divider orientation="left" style={{ marginBottom: 5 }}>
            Color Options
          </Divider>
        </Row>
        <Row style={{ margin: '15px 0' }}>
          <CirclePicker
            color={this.Place.bgcolor}
            colors={[
              '#000000',
              '#F30000',
              '#FD6E2A',
              '#FD84AD',
              '#F3EC77',
              '#B5ED66'
            ]}
            onChangeComplete={(color) => {
              this.ChangeColor(color.hex)
            }}
          />
        </Row>
        <Row>
          <Popover
            content={
              <SketchPicker
                color={this.Place.bgcolor}
                onChangeComplete={(color) => {
                  this.ChangeColor(color.hex)
                }}
              />
            }
            trigger="click"
          >
            <Button block size="large">
              CHOOSE COLOR
            </Button>
          </Popover>
        </Row>
        <Row />
      </div>
    )
  }
  ChangeImg(flower: string, index: number) {
    let newState = Object.assign({}, this.Place)
    newState.masks[index].flower = flower
    this.disPatch(newState, index)
  }
  ChangeScale(index: number, scale: number) {
    let newState = Object.assign({}, this.Place)
    newState.masks[index].scale = scale
    this.disPatch(newState, index)
  }
  ChangePosi(index: number, z: string, number: number) {
    let newState = Object.assign({}, this.Place)
    newState.masks[index].position[z] += number
    this.disPatch(newState, index)
  }
  ChangeStatus(e: any) {
    store.dispatch({
      type: 'SET_COMPOSE_GLOBAL',
      product: {
        global: !!e.target.checked,
        action: 'ChangeGlobal'
      }
    })
  }
  ChangeColor(color: string) {
    let newState = Object.assign({}, store.getState().product.compose)
    Object.keys(newState).map((key: string) => {
      newState[key].bgcolor = color
    })
    store.dispatch({
      type: 'SET_COMPOSE_COLOR',
      product: {
        compose: newState,
        action: 'ChangeColor'
      }
    })
  }
  ChangeRepeat(e: any) {
    let newState = Object.assign({}, store.getState().product.compose)
    Object.keys(newState).map((key: string) => {
      newState[key].repeat = !!e.target.checked
    })
    store.dispatch({
      type: 'SET_COMPOSE_REPEAT',
      product: {
        compose: newState,
        action: 'ChangeColor'
      }
    })
  }
  disPatch(newState: Place, index: number) {
    let { compose, global } = store.getState().product
    // if (global) {
    //   let { flower, position, scale } = newState.masks[index]
    //   _.each(compose, (place, key) => {
    //     let temp: Place
    //     temp = compose[key]
    //     temp.masks.map((mask, i) => {
    //       temp.masks[i].flower = flower
    //       temp.masks[i].position = position
    //       temp.masks[i].scale = scale
    //     })
    //     compose[key] = temp
    //   })
    // } else {
    //   compose[this.props.place] = newState
    // }
    let { flower, position, scale } = newState.masks[index]
    _.each(compose, (place, key) => {
      let temp: Place
      temp = compose[key]
      if (global) {
        temp.masks.map((mask, i) => {
          temp.masks[i].flower = flower
          temp.masks[i].position = position
          temp.masks[i].scale = scale
        })
      } else {
        temp.masks.map((mask, i) => {
          if (i === index) {
            temp.masks[i].flower = flower
            temp.masks[i].position = position
            temp.masks[i].scale = scale
          }
        })
      }
      compose[key] = temp
    })

    store.dispatch({
      type: 'SET_COMPOSE_PLACE',
      product: {
        place: this.props.place,
        compose: compose,
        action: 'ChangePlace',
        index: index
      }
    })
  }
  componentDidUpdate() {
    this.ID = ['compose', 'control', this.props.pid, this.props.place].join('-')
  }
  subscribe: Unsubscribe
  componentDidMount() {
    this.subscribe = store.subscribe(() => {
      this.setState({
        time: new Date().getTime()
      })
    })
  }
  componentWillUnmount() {
    this.subscribe()
    this.setState = () => {
      return false
    }
  }
}
