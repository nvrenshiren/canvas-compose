import { Spin } from 'antd'
import * as React from 'react'
import { Unsubscribe } from 'redux'
import { Mask, Place } from '../../interfaces/mode'
import UpService from '../../services/transfer'
import store from '../../store/store'
import './local.less'

interface Props {
  place: string //部位名称
  width: number
  height: number
  type: number //类型,缩略图,原图
  pid: number
  finished?: Function
}

interface State {
  loaded: boolean //素材加载状态
  done: boolean //合成状态
}

export default class extends React.Component<Props> {
  constructor(props: any) {
    super(props)
    this.initComponent()
  }
  initComponent() {
    this.ID = [
      'compose',
      'local',
      this.props.pid,
      this.props.place,
      this.props.type
    ].join('-')
    this.state = {
      loaded: false,
      done: false
    }
  }
  ID: string
  Place: Place
  state: State
  ref: HTMLCanvasElement
  mainImg: HTMLImageElement = null
  shadowImg: HTMLImageElement = null
  maskbgImg: HTMLImageElement[] = []
  masksImg: HTMLCanvasElement[] = []
  flowersImg: string[] = []
  async renderMain() {
    if (this.state.loaded) {
      this.flowersImg = []
      let main = this.ref.getContext('2d')
      main.drawImage(this.mainImg, 0, 0, this.props.width, this.props.height)
      let masks = await this.getMasks()
      masks.map((mask) => {
        if (this.props.type == 1) {
          this.flowersImg.push(mask.toDataURL())
        }
        main.drawImage(mask, 0, 0, this.props.width, this.props.height)
      })
      this.shadowImg = this.shadowImg || (await this.loadImg(this.Place.shadow))
      main.drawImage(this.shadowImg, 0, 0, this.props.width, this.props.height)
      await this.getDone()
      this.setState({
        done: true
      })
    } else {
      this.renderMain()
    }
  }
  getDone() {
    return new Promise(async (resolve, reject) => {
      //上传原图
      if (this.props.type == 1) {
        let mainData = this.ref.toDataURL()
        this.props.finished(mainData)
        this.Place.flowers = []
        //上传花纹成品
        let Tasks = this.flowersImg.map(() => {
          return this.tansUploadBase.bind(this)
        })
        let index = 0
        for (let Task of Tasks) {
          this.Place.flowers = await Task(
            this.flowersImg[index++],
            this.Place.flowers
          )
        }
        //上传花纹成品
      }
      let { compose } = store.getState().product
      compose[this.props.place] = this.Place
      store.dispatch({
        product: {
          compose: compose
        },
        type: 'SET_COMPOSE_OK'
      })
      resolve()
    })
  }
  tansUploadBase(base64: string, result: any): Promise<any> {
    return new Promise((resolve, reject) => {
      //防止同时上传导致个别上传失败
      UpService.tansUploadBase(base64).then((res) => {
        result.push(res.uploadId)
        resolve(result)
      })
    })
  }
  getMasks(): Promise<HTMLCanvasElement[]> {
    return new Promise((resolve, reject) => {
      Promise.all(
        this.Place.masks.map((mask, index) => {
          return this.renderMask(mask, index)
        })
      ).then((res) => {
        this.masksImg = res
        resolve(res)
      })
    })
  }

  renderMask(item: Mask, index: number): Promise<HTMLCanvasElement> {
    return new Promise(async (resolve, reject) => {
      let mask = document.createElement('canvas')
      let context = mask.getContext('2d')
      //绘制颜色
      mask.width = this.props.width
      mask.height = this.props.height
      context.fillStyle = this.Place.bgcolor
      context.fillRect(0, 0, mask.width, mask.height)
      let { scale, position } = item
      if (!!item.flower) {
        let flowerImg = await this.loadImg(item.flower)
        //创建花纹容器
        let flowerBox = document.createElement('canvas')
        let flowerBox_Con = flowerBox.getContext('2d')
        //设置花纹容器宽高,根据缩放
        flowerBox.width = Math.round(
          // flowerImg.width * scale * (this.props.width / 650)
          flowerImg.width * scale
        )
        flowerBox.height = Math.round(
          // flowerImg.height * scale * (this.props.height / 975)
          flowerImg.height * scale
        )
        flowerBox_Con.drawImage(
          flowerImg,
          0,
          0,
          flowerBox.width,
          flowerBox.height
        )

        if (this.Place.repeat) {
          //创建渲染画布的容器,宽高要为当前的3倍(九宫格布局),初始定位为九宫格正中那块.
          let bgcanvas = document.createElement('canvas')
          bgcanvas.width = this.props.width * 3
          bgcanvas.height = this.props.height * 3
          let bgcanvas_context = bgcanvas.getContext('2d')
          //将花纹当作背景,重复插入画布
          bgcanvas_context.fillStyle = context.createPattern(
            flowerBox,
            'repeat'
          )
          bgcanvas_context.fillRect(0, 0, bgcanvas.width, bgcanvas.height)
          //将画布插入到主体中,并根据设置的定位
          context.drawImage(
            bgcanvas,
            0,
            0,
            bgcanvas.width,
            bgcanvas.height,
            -this.props.width + position.x * (this.props.width / 650),
            -this.props.height + position.y * (this.props.height / 975),
            bgcanvas.width,
            bgcanvas.height
          )
        } else {
          let bgcanvas = document.createElement('canvas')
          bgcanvas.width = this.props.width
          bgcanvas.height = this.props.height
          let bgcanvas_context = bgcanvas.getContext('2d')
          bgcanvas_context.drawImage(
            flowerBox,
            0,
            0,
            flowerBox.width,
            flowerBox.height,
            (this.props.width - flowerBox.width) / 2 +
              position.x * (this.props.width / 650),
            (this.props.height - flowerBox.height) / 2 +
              position.y * (this.props.height / 975),
            flowerBox.width,
            flowerBox.height
          )

          //将画布插入到主体中,并根据设置的定位
          context.drawImage(bgcanvas, 0, 0)
        }
      }
      //创建遮罩
      context.globalCompositeOperation = 'destination-in'
      this.maskbgImg[index] =
        this.maskbgImg[index] || (await this.loadImg(item.mask))
      context.drawImage(this.maskbgImg[index], 0, 0, mask.width, mask.height)
      resolve(mask as HTMLCanvasElement)
    })
  }
  mount: boolean = true
  render() {
    return (
      <div
        id={this.ID}
        className="compose-local"
        style={{
          width: this.props.width,
          height: this.props.height,
          backgroundColor: '#f2eeea'
        }}
      >
        <Spin spinning={!this.state.done} style={{ height: '100%' }}>
          <canvas
            className="compose-local-finished"
            width={this.props.width}
            height={this.props.height}
            ref={(ref) => {
              this.ref = ref
            }}
          />
        </Spin>
      </div>
    )
  }
  loadImg(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      let http = !!this.props.type
        ? `/api/transfer/download/${src}`
        : `/api/transfer/thumbs/${src}?w=${this.props.width}&h=${
            this.props.height
          }`
      let DownLoad = new Image()
      DownLoad.src = !!src.match('data:image') ? src : http
      DownLoad.onload = () => {
        if (this.mount) {
          resolve(DownLoad)
        } else {
          reject('组件已经被卸载')
        }
      }
    })
  }
  setFinished(id: string) {
    this.props.finished(id)
  }
  async getImg() {
    this.setState({
      loaded: true
    })
    this.mainImg = await this.loadImg(this.Place.main)
    this.renderMain()
  }
  subscribe: Unsubscribe
  changeData() {
    setTimeout(() => {
      this.Place = Object.assign(
        {},
        store.getState().product.compose[this.props.place]
      )
      this.renderMain()
    }, 500)
  }
  componentDidMount() {
    this.Place = store.getState().product.compose[this.props.place]
    this.getImg()
    //监听
    this.subscribe = store.subscribe(() => {
      let { action, place, global } = store.getState().product
      //如果是全局
      if (!action || !(['ChangeGlobal'].indexOf(action) < 0)) return false
      // if (global) {
      //   this.setState({
      //     done: false
      //   })
      //   this.changeData()
      // } else {
      //   switch (action) {
      //     case 'ChangeColor':
      //       this.setState({
      //         done: false
      //       })
      //       this.changeData()
      //       break
      //     case 'ChangePlace':
      //       if (this.props.place === place) {
      //         this.setState({
      //           done: false
      //         })
      //         this.changeData()
      //       }
      //       break
      //   }
      // }
      this.setState({
        done: false
      })
      this.changeData()
    })
  }
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {
    this.mount = false
    this.subscribe()
    this.setState = () => {
      return false
    }
  }
}
