import * as React from 'react'
import CartCom from '@/index/shopping/cart.common'
import Common from '@/common/common'
import DocumentTitle from 'react-document-title'
import HomeFooter from './footer'
import HomeHead from './header'
import HomeNav from './nav'
import ModalForm from '@/util/modal/modal.form'
import NavServer from '@/services/navigation'
import ProductService from '@/services/product'
import RegeditModal from './regedit.form'
import { default as UserServer, default as UserService } from '@/services/user'
import { Layout, message, Modal } from 'antd'
import { RouteComponentProps } from 'react-router'
import './index.less'
import '@/statics/css/pub.less'
// import './route'

const { Header, Footer, Content } = Layout

interface State {
  ready: boolean
  visible: boolean
}

export default class extends React.Component<RouteComponentProps<any>> {
  constructor(props: any) {
    super(props)
    this.state = {
      ready: false,
      visible: false
    }
  }
  state: State
  render() {
    const indexLayout = (
      <Layout id="index-main">
        <Modal
          className="flower-modal"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            background: 'none'
          }}
          width={1083}
          closable={false}
          footer={null}
          keyboard={false}
          maskClosable={false}
          visible={this.state.visible}
        >
          <div className="reg-modal">
            <div
              className="reg-colse"
              onClick={() => {
                this.setState({
                  visible: false
                })
              }}
            />
            <div
              className="reg-btn"
              onClick={() => {
                this.setState({
                  visible: false
                })
                ModalForm.open({
                  key: 'userregedit',
                  title: 'New to RIGHR',
                  type: 'userregedit',
                  formCom: RegeditModal,
                  module: 'index',
                  service: UserService.addUser,
                  width: 450,
                  footer: null,
                  callback: (res: any, data: any) => {
                    if (res.stat === 'OK') {
                      UserService.vaildationUser(data.name).then(() => {
                        Modal.success({
                          title: 'Registration success',
                          content:
                            'Your email will soon receive an activation email. Please check and activate your account.'
                        })
                      })
                    } else {
                      message.error(res.errText)
                    }
                  }
                })
              }}
            />
          </div>
        </Modal>
        <Header className="index-header-box">
          {this.state.ready && <HomeHead />}
        </Header>
        <Content className="index-content-box" style={{ minHeight: 300 }}>
          {this.state.ready && <HomeNav />}
          {this.state.ready && this.props.children}
        </Content>
        <Footer className="index-footer-box">
          <HomeFooter />
        </Footer>
      </Layout>
    )
    return (
      <React.Fragment>
        <DocumentTitle title="Righr">{indexLayout}</DocumentTitle>
      </React.Fragment>
    )
  }
  componentDidMount() {
    //获取需要的数据
    let listCatagorys = ProductService.listCatagorys
    let listNavigation = NavServer.listNavigation
    let listSpecifications = ProductService.listSpecifications
    let getUserInfo = UserServer.getUserInfo
    let listTheme = ProductService.listTheme
    Promise.all([
      listCatagorys(),
      listNavigation(),
      listTheme({ pageIndex: 1, pageSize: 999 }),
      getUserInfo()
    ]).then(async ([Cats, Navs, listTheme, User]: any[]) => {
      if (User.stat !== 'OK') {
        Common.removeCooike('token')
        this.setState({
          visible: true
        })
      }
      CartCom.getCart()
      setTimeout(() => {
        this.setState({
          ready: true
        })
      }, 500)
    })
  }
}
