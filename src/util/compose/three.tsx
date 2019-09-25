import { Spin } from 'antd'
import * as React from 'react'
import { Unsubscribe } from 'redux'
import * as THREE from 'three'
import { Place, Mask } from '@/interfaces/mode'
import store from '@/store/store'
import UpService from '@/services/transfer'
import './objloader.js'
import './three.less'

interface Props {
  width: number
  height: number
  type: number //类型,缩略图,原图
  pid: number
  place: string
  finished?: Function
  objfile: string
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
  ID: string
  state: State
  Place: Place
  ref: HTMLCanvasElement
  ThreeRef: HTMLCanvasElement
  MainImg: HTMLImageElement
  Shadow: HTMLImageElement
  Mask: HTMLImageElement
  flowersImg: string[] = []
  Three: THREE.WebGLRenderer
  Scene: THREE.Scene
  Camera: THREE.Camera
  Object: THREE.Group
  Texture: THREE.Texture
  OBJLoader: THREE.OBJLoader
  initComponent() {
    this.ID = ['compose', 'three', this.props.pid, this.props.type].join('-')
    this.state = {
      loaded: false,
      done: false
    }
  }
  async renderMain() {
    if (this.state.loaded) {
      this.flowersImg = []
      let main = this.ref.getContext('2d')
      let mask: HTMLCanvasElement
      if (this.Place.masks[0].flower !== '') {
        mask = await this.loadModel()
      } else {
        mask = await this.renderMask(this.Place.masks[0])
      }
      if (this.props.type == 1) {
        this.flowersImg.push(mask.toDataURL())
      }
      main.drawImage(this.MainImg, 0, 0, this.props.width, this.props.height)
      main.drawImage(mask, 0, 0, this.props.width, this.props.height)
      //如果只渲染颜色的话,需要添加阴影
      if (this.Place.masks[0].flower === '') {
        this.Shadow = this.Shadow || (await this.loadImg(this.Place.shadow))
        main.drawImage(this.Shadow, 0, 0, this.props.width, this.props.height)
      }
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
  renderMask(item: Mask): Promise<HTMLCanvasElement> {
    return new Promise(async (resolve, reject) => {
      let mask = document.createElement('canvas')
      let context = mask.getContext('2d')
      mask.width = this.props.width
      mask.height = this.props.height
      context.fillStyle = this.Place.bgcolor
      context.fillRect(0, 0, mask.width, mask.height)
      let { scale, position } = item
      if (!!item.flower) {
        //3D模式和2D的唯一区别就是3D返回整个画布,2D返回的是带遮罩的画布
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

        // //创建渲染画布的容器,宽高要为当前的3倍(九宫格布局),初始定位为九宫格正中那块.
        // let bgcanvas = document.createElement('canvas')
        // bgcanvas.width = this.props.width * 3
        // bgcanvas.height = this.props.height * 3
        // let bgcanvas_context = bgcanvas.getContext('2d')
        // //将花纹当作背景,重复插入画布
        // bgcanvas_context.fillStyle = context.createPattern(flowerBox, 'repeat')
        // bgcanvas_context.fillRect(0, 0, bgcanvas.width, bgcanvas.height)
        // //将画布插入到主体中,并根据设置的定位
        // context.drawImage(
        //   bgcanvas,
        //   0,
        //   0,
        //   bgcanvas.width,
        //   bgcanvas.height,
        //   -this.props.width + position.x * (this.props.width / 650),
        //   -this.props.height + position.y * (this.props.height / 975),
        //   bgcanvas.width,
        //   bgcanvas.height
        // )
      } else {
        this.Mask = this.Mask || (await this.loadImg(this.Place.masks[0].mask))
        context.globalCompositeOperation = 'destination-in'
        context.drawImage(this.Mask, 0, 0, mask.width, mask.height)
      }
      resolve(mask as HTMLCanvasElement)
    })
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
  //模型加载后渲染纹理
  loadModel(): Promise<HTMLCanvasElement> {
    return new Promise(async (resolve, reject) => {
      let Texture = await this.renderMask(this.Place.masks[0])
      this.Texture = new THREE.Texture(Texture)
      this.Texture.needsUpdate = true
      this.Object.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          let MeshLambertMaterial = new THREE.MeshLambertMaterial()
          MeshLambertMaterial.map = this.Texture
          MeshLambertMaterial.refractionRatio = 2
          child.material = MeshLambertMaterial
        }
      })
      this.Scene.add(this.Object)
      setTimeout(() => {
        resolve(this.Three.domElement)
      }, 200)
    })
  }
  aniMate() {
    requestAnimationFrame(this.aniMate.bind(this))
    this.renderThree()
  }
  //渲染主模块
  renderThree() {
    this.Camera.position.x = 0
    this.Camera.position.y = 0
    this.Camera.position.z = this.props.place === 'front' ? 70 : -70
    this.Camera.up = new THREE.Vector3(0, 1, 0)
    this.Camera.lookAt(0, -2, 0)
    this.Three.render(this.Scene, this.Camera)
  }
  //初始化Thre
  initThree() {
    this.ThreeRef = document.createElement('canvas')
    this.Camera = new THREE.PerspectiveCamera(
      57,
      this.props.width / this.props.height,
      1,
      10000
    )
    this.Scene = new THREE.Scene()
    let LightLeft = new THREE.SpotLight(0xffffff, 1)
    LightLeft.position.set(100, 100, this.props.place === 'front' ? 70 : -70)
    this.Scene.add(LightLeft)
    let LightRight = new THREE.SpotLight(0xffffff, 1)
    LightRight.position.set(this.props.place === 'front' ? -100 : 100, 100, 70)
    this.Camera.add(LightRight)
    this.Scene.add(this.Camera)

    this.Three = new THREE.WebGLRenderer({
      canvas: this.ThreeRef,
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true
    })
    this.Three.setSize(this.props.width, this.props.height)
    this.Three.setClearColor(0xffffff, 0) //画布颜色
  }
  //加载OBJ模型
  loadOBJ() {
    return new Promise((resolve, reject) => {
      let manager = new THREE.LoadingManager()
      this.OBJLoader = new THREE.OBJLoader(manager)
      this.OBJLoader.load(
        `/api/transfer/download/${this.props.objfile}`,
        (OBJ) => {
          this.Object = OBJ
          resolve()
        }
      )
    })
  }
  render() {
    return (
      <div
        id={this.ID}
        className="compose-three"
        style={{
          width: this.props.width,
          height: this.props.height,
          backgroundColor: '#f2eeea'
        }}
      >
        <Spin spinning={!this.state.done} style={{ height: '100%' }}>
          <canvas
            className="compose-three-finished"
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
  mount: boolean = true
  subscribe: Unsubscribe
  async getImg() {
    this.MainImg = await this.loadImg(this.Place.main) //下载原图
    await this.loadOBJ() //下载模型
    this.setState({
      loaded: true
    })
    this.initThree()
    this.aniMate()
    this.renderMain()
  }
  componentDidMount() {
    //监听
    this.subscribe = store.subscribe(() => {
      let { action } = store.getState().product
      if (!action || !(['ChangeGlobal'].indexOf(action) < 0)) {
        return false
      } else {
        this.setState({
          done: false
        })
        setTimeout(() => {
          this.Place = store.getState().product.compose[this.props.place]
          this.renderMain()
        }, 500)
      }
    })
    this.Place = store.getState().product.compose[this.props.place]
    this.getImg()
  }
  componentWillUnmount() {
    this.mount = false
    this.subscribe()
    this.setState = () => {
      return false
    }
  }
}
