import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import { actCategoryGet, actBrandsGet } from '../redux/SiteInfoReducer';
import {actUserAddLoginWithFaceBook, actUserAddLoginWithGoogle, actUserLogout} from '../redux/UserReducer'
import AppDropdownMenu from './AppDropdownMenu'
import AppDropdownBrand from './AppDropdownBrand'

import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon, Input, Popover } from 'antd';
import { Row, Col, Button,Badge } from 'antd';

require('dotenv').config()

const { Search } = Input;
const Header = Layout.Header;
const {SubMenu} = Menu;



class AppHeader extends Component {
    constructor(props) {
        super(props); 
        this.state = {
          hoveredMenuList: false,
          hoveredParent: "",

          hoveredBrandMenu: false,
          hoveredBrandContainer:false,

          searchTerm:""
          
        };
        this.onMenuListHover = this.onMenuListHover.bind(this);   
        this.onMenuListOut = this.onMenuListOut.bind(this);
        this.onParentMenuHover = this.onParentMenuHover.bind(this);   
        this.onMenuContainerOut = this.onMenuContainerOut.bind(this); 
        this.onParentMenuClick = this.onParentMenuClick.bind(this); 
        this.onBrandMenuClick = this.onBrandMenuClick.bind(this)
        this.onChangeSearch = this.onChangeSearch.bind(this)
        
        this.onBrandMenuHover = this.onBrandMenuHover.bind(this);
        this.onBrandMenuOut = this.onBrandMenuOut.bind(this);
        this.onBrandContainerHover = this.onBrandContainerHover.bind(this);
        this.onBrandContainerOut = this.onBrandContainerOut.bind(this);
        
        this.facebookResponse = this.facebookResponse.bind(this)
        this.googleResponse = this.googleResponse.bind(this)

        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout() {
      console.log(" USER handleLogout")
      this.props.actUserLogout();
    }

    // WHen mouse over ThuongHieu
    onBrandMenuHover() {
      if (!this.isHomePage) {
        // Below timeout to prevent when Mouse only Move through ThuongHieu-menu shown
        // wait 300ms to show Menu list
        this.timeoutBrand = setTimeout(() => {
          this.setState({
            hoveredBrandMenu: true
          })
        },300);
        
      }
    }
    onBrandMenuOut() {
      if (!this.isHomePage) {
        if(this.timeoutBrand) {
          clearTimeout(this.timeoutBrand);
        }

        // Below Timeout to make Time for Mouse move from DanhMucSanPham to the shown menu below
        // If is not SET any more, mean hover then right after that, will disappear
        setTimeout(() => {
          if (this.state.hoveredBrandContainer == false) {
            this.setState({
              hoveredBrandMenu: false,
            })
          }
        }, 100);
      }
    }
    onBrandContainerHover(){
      this.setState({
        hoveredBrandContainer: true,
      })
    }
    onBrandContainerOut(){
      this.setState({
        hoveredBrandContainer: false,
        hoveredBrandMenu: false
      })
    }
    // When click on Brand item, close the PopOut menu
    onBrandMenuClick() {
      this.setState({
        hoveredBrandContainer: false,
        hoveredBrandMenu: false
      })
    }


    // WHen mouse over DanhMucSanPham
    onMenuListHover() {
      if (!this.isHomePage) {
        // Below timeout to prevent when Mouse only Move through DanhMucSanPham-menu shown
        // wait 300ms to show Menu list
        this.timeout = setTimeout(() => {
          this.setState({
            hoveredMenuList: true
          })
        },300);
        
      }
    }
    // WHen mouse out DanhMucSanPham
    onMenuListOut() {
      if (!this.isHomePage) {
        if(this.timeout) {
          clearTimeout(this.timeout);
        }

        // Below Timeout to make Time for Mouse move from DanhMucSanPham to the shown menu below
        // If is not SET any more, mean hover then right after that, will disappear
        setTimeout(() => {
          if (this.state.hoveredParent == "") {
            this.setState({
              hoveredMenuList: false,
              hoveredParent: ""
            })
          }
        }, 100);
      }
    }
    onParentMenuHover(e) {
      this.setState({
        hoveredParent: e.target.textContent.trim()
      })
    }
    onMenuContainerOut() {
      this.setState({
        hoveredMenuList: false,
        hoveredParent: ""
      })
    }
    onParentMenuClick() {
      this.setState({
        hoveredMenuList: false,
        hoveredParent: ""
      })
    }

    onChangeSearch(e) {
      console.log(e.target.value)
      this.setState({
        searchTerm: e.target.value
      })
    }
    onSearchTerm(value) {
      console.log("onSearchTerm:" + value)
      if (value.trim().length > 0) {
        this.props.history.push("/search/" + value);
      }
    }
    componentDidMount() {
      console.log("  >>DID MOUNT AppHeader")
      if (this.props.siteInfo.categories.length <= 0 ) {
          this.props.actCategoryGet();
      }
      if (this.props.siteInfo.brands.length <= 0 ) {
        this.props.actBrandsGet();
      }

      // If User Refresh Search page with Search Term, set it
      if (this.props.location.pathname.indexOf("/search") >= 0) {
        let searchTerm =   this.props.location.pathname.substring(8);
        
        this.setState({
            searchTerm: searchTerm
        })
      }
    }
    componentDidUpdate() {
      if (this.props.siteInfo.categories.length <= 0 ) {
          console.log("  >>DID UPDATE AppHeader")
          console.log("    >>>> actCategoryGet")
          this.props.actCategoryGet();
      }
      
    }
    componentWillReceiveProps(nextProps) {
      // console.log("Next PROPS PATH:" + nextProps.location.pathname)
      // console.log("  Current PROPS PATH:" + this.props.location.pathname)
      // If user from Search Page to another page, will clear Search Term
      if (nextProps.location.pathname.indexOf("/search") < 0 && 
        this.props.location.pathname.indexOf("/search") >= 0) {
          this.setState({
            searchTerm: ""
          })
      }
    }

    renderBottomMenuMobile () {
      return (
        <Menu
            mode="horizontal"
            inlineIndent={20}
            className="mobile-bottom-menu"
        >
            <Menu.Item key="home">
              <Icon type="mail" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="category">
              <Icon type="mail" />
              <span>Category</span>
            </Menu.Item>
            <Menu.Item key="cart">
              <Icon type="shopping-cart" />
              <span>Cart</span>
            </Menu.Item>
            <Menu.Item key="user">
              <Icon type="user" />
              <span>User</span>
            </Menu.Item>
        </Menu>
      )
    }
    renderPopoverUser() {
      if (this.props.user.isLogined && this.props.user.userProfile && this.props.user.userProfile.id) {
        return (
          <div style={{textAlign: "center", width: "200px"}}>
            <Row>
            <Link to={"/customer/orders"}>
              <Button type="link" style={{width: "100%", marginBottom: "10px"}}>
                <span style={{width: "100%", textAlign: "left"}}>
                Đơn Hàng Của Tôi
                </span>
              </Button></Link>
            </Row>
            <Row>
            <Link to={"/customer/profile"}>
              <Button type="link" style={{width: "100%", marginBottom: "10px"}}>
                <span style={{width: "100%", textAlign: "left"}}>
                Tài Khoản
                </span>
              </Button>
            </Link>
            </Row>
            <Row>
            <Link to={"/customer/addressbook"}>
              <Button type="link" style={{width: "100%", marginBottom: "10px"}}>
                <span style={{width: "100%", textAlign: "left"}}>
                Địa Chỉ
                </span>
              </Button>
            </Link>
            </Row>
            <Row>
            <Link to={"/customer/favorites"}>
              <Button type="link" style={{width: "100%", marginBottom: "10px"}}>
                <span style={{width: "100%", textAlign: "left"}}>
                Sản Phẩm Yêu Thích
                </span>
              </Button>
            </Link>
            </Row>
            <Row>
            <Link to={"/customer/recentviews"}>
              <Button type="link" style={{width: "100%", marginBottom: "10px"}}>
                <span style={{width: "100%", textAlign: "left"}}>
                Sản Phẩm Xem Gần Đây
                </span>
              </Button>
            </Link>
            </Row>

            <Row>
              <Button type="link" style={{width: "100%", marginBottom: "10px"}} onClick={this.handleLogout}>
                <span style={{width: "100%", textAlign: "left"}}>
                Đăng Xuất
                </span>
              </Button>
            </Row>
          </div>
        )
      } else {
        return (
          <div style={{textAlign: "center", width: "200px"}}>
          <Row>
          <Link to={"/login"}>
            <Button type="primary" size="large" style={{width: "100%", marginBottom: "10px"}}>Đăng Nhập</Button>
          </Link>
          </Row>
          <Row>
          <Link to={"/register"}>
            <Button type="primary" size="large" style={{width: "100%", marginBottom: "10px"}}>Đăng Ký Tài Khoản</Button>
          </Link>

          <Row>
            <FacebookLogin
              appId={process.env.REACT_APP_FB_APPID}
              autoLoad={false}
              fields="name,email,picture"
              callback={this.facebookResponse} />
          </Row>

          <Row>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                buttonText="Login With Google"
                onSuccess={this.googleResponse}
                onFailure={this.onGoogleFailure}
            />
          </Row>
          </Row>
        </div>
        );
      }
    }
    render() {
      let isHomePage = this.props.location.pathname == "/" ? true : false;
      this.isHomePage = isHomePage;
      let appDropDownMenu = 
        <AppDropdownMenu config={this.props.siteInfo.categoriesLevel} 
          onParentMenuOut={this.onParentMenuOut} onMenuContainerOut={this.onMenuContainerOut}
          onParentMenuHover={this.onParentMenuHover} hoveredParent={this.state.hoveredParent}
          onParentMenuClick={this.onParentMenuClick}
          hoveredMenuList={this.state.hoveredMenuList}
          isHomePage={isHomePage}
          />;

      let appDropDownBrandMenu = 
        <AppDropdownBrand brands={this.props.siteInfo.brandsColumnize} 
          onBrandContainerHover={this.onBrandContainerHover}
          onBrandContainerOut={this.onBrandContainerOut}
          hoveredBrandMenu={this.state.hoveredBrandMenu}
          onBrandMenuClick={this.onBrandMenuClick}
          />;

      let cartNum = 0;
      if (this.props.user.isLogined) {
        cartNum = this.props.user.cartItems ? this.props.user.cartItems.length : 0;
      } else {
        cartNum = this.props.cart.savedProductsId ? this.props.cart.savedProductsId.length : 0;
      }
      //xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl	≥1600px
      return (
        <React.Fragment>
          <div className={(this.state.hoveredMenuList || this.state.hoveredBrandMenu) ? "flyout-outside-mask" : ""}></div>
          <Header>
          <div className="app-header">
          <Row>
            <div>
            <Col xs={0} sm={0} md={4} lg={4} xl={4} xxl={4}>
            <div className="app-title" >
              <Link to="/" style={{paddingLeft: "20px"}}>Phu Phuong</Link>
            </div>
            </Col>

            <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={10}>
              <Search
                placeholder="Search product, category..."
                enterButton="Tìm Kiếm"
                size="large"
                value={this.state.searchTerm}
                onChange={this.onChangeSearch}
                onSearch={value => this.onSearchTerm(value)}
            /></Col>

            <Col xs={0} sm={0} md={8} lg={10} xl={10} xxl={10}>
              <Row>
                <Col md={7} lg={7} xl={7} xxl={7}>
                <div className="top-header-menu-item">
                  <Button type="link" ghost size="large">
                    <Icon type="shopping-cart" style={{fontSize:"1.2em"}} className="show-only-in-md"/>
                    <span className="hidden-in-md">Theo Doi Don Hang</span>
                  </Button>
                </div>
                </Col>
                <Col md={7} lg={7} xl={7} xxl={7}>
                <div className="top-header-menu-item">
                <Popover content={this.renderPopoverUser()} placement="bottom">
                <Link to={"/customer/profile"}>
                  <Button type="link" ghost size="large">
                    <Icon type="user" style={{fontSize:"1.2em"}} className="show-only-in-md"/>
                    <span className="hidden-in-md">
                      {this.props.user.userProfile ? this.props.user.userProfile.fullName : "Tài Khoản"}
                    </span>
                  </Button>
                </Link>
                </Popover>
                </div>
                </Col>

                <Col md={10} lg={10} xl={10} xxl={10}>
                <div className="cart-container">
                  <Link to={"/cart"}>
                  <Button  ghost size="large">
                    <Icon type="shopping-cart" style={{fontSize:"1.2em"}} className="show-only-in-md"/>
                    <span className="hidden-in-md">Giỏ Hàng</span>
                    <Badge showZero count={cartNum} 
                      className="cart-badge"/>
                  </Button>
                  </Link>
                </div>
                </Col>
              </Row>
              </Col>
            </div>
          </Row>

          <Row>
          <div className="header-options">
          <Col xs={0} sm={0} md={12} lg={6} xl={6} xxl={4}>
            <div onMouseEnter={this.onMenuListHover} onMouseLeave={this.onMenuListOut}
              style={{marginLeft:"15px"}} className="hamburger-category-menu">
              <Icon type="menu"/>
              <span className="category-menu-text" >Danh Mục Sản Phẩm</span>
            </div>
          </Col>

          <Col xs={0} sm={0} md={12} lg={6} xl={6} xxl={4}>
            <div onMouseEnter={this.onBrandMenuHover} onMouseLeave={this.onBrandMenuOut}
              style={{marginLeft:"15px"}} className="hamburger-category-menu">
              <Icon type="shop" />
              <span className="category-menu-text" >Thương Hiệu</span>
            </div>
          </Col>

          </div>
          </Row>

          {isHomePage ? null : appDropDownMenu}

          {appDropDownBrandMenu}
        </div>
        </Header>
        {isHomePage ? appDropDownMenu: null}
        {this.renderBottomMenuMobile()}
        </React.Fragment>
      );
    }

    // accessToken: "EAAF5BlgorvYBAAAFQbZBQpmZAWC0Q6ZCTPHo8fr8H8PrpcjsEZCkG46yp6WDT9UFVO2nVHLyFcViPaU15N3XUx6XH2g0vUkHGvVSeSXKIZCy9Vegi9MUZBaQ2zIzLv4Drb3wfrcVbzRKSQJlC8lzw4tqxZBsEsQpjEcwZAKAUr4lVXZCMsXONGFjIyZCy8gKZCZA84ZCak2hS8xGk7aad1ZBVtAbgN6PXjFgpx9zcZD"
    // data_access_expiration_time: 1577460547
    // email: "son.tranminh.vn@gmail.com"
    // expiresIn: 5452
    // id: "2591119204279824"
    // name: "Son Tran Minh"
    // picture: {data: {…}}
    // signedRequest: "0ycLAlPXDnc8ayYtMcpC1S6zAd9mzUhFCYZDKMxuyAA.eyJ1c2VyX2lkIjoiMjU5MTExOTIwNDI3OTgyNCIsImNvZGUiOiJBUUJXMlNnZ3Z6bkpOU3RzbUN6OVcyTzV3TWpUX0NLWmpwU3NUa2FMNnRmTFNVbjgtTEl4MU11Tld0cDFzcTlkRVpJUDNZVkVxNDZSQ1pWM2N0YU9SMktqLWtvWUxjaWU4ZzJyUjJIanhMTXZhZjZYZXhQNjRPUVlvSWM5eVNMWWlrejhjMklGS3NvdjRveld1d3FrRlRNWGJLMTRPOG55RXhrek9ad051Q1BlTTFZWjlNUm5DdjJieV9ydzRYRGR3Ym5qNU85eV9WM1NmdHNuUE12MmxianZBLWpSMjdSWk5GRGE5SmJVZ1FhWEJqb242c1hfM0N5d3JsaS16U3JIVUU0TFVnTDNzdHB2LXBaSGZSd1Bubjc0NXhfUDNFTmVzdm1wUEdqS3IwZkZqS3RBeVVYdnM2eEJHZTN2cVFjSEU3UEx2QWRmcVZFREN1Q1AzTXlEeFFndzR6OFp4YVdyT2k3VG5icTQ2Q3d2U1lXZzBhYldRN1J5cEdkMnFEUWN4aXMiLCJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTU2OTY4NDU0OH0"
    // userID: "2591119204279824"
    facebookResponse = (response) => {
      console.log("facebookResponse")
      console.log(response)
      this.props.actUserAddLoginWithFaceBook({
        userId: response.id ? response.id : response.userID,
        email: response.email,
        phone: null,
        password: null,
        fullName: response.name,
        pictureUrl: response.picture.data.url, // TODO
        accessToken: response.accessToken,
        userType: "facebook",
        roleId: 2 // Customer
      }, this.props.history);
    };

    // El: "100647700980982997517"
    // accessToken: "ya29.Il-RBwQ9KgB4CxJ4f9qeAaPM5OK2XZzNDxLyKSx6St0j_mg7QZwTGlNT3vMsI-eTlAdLGNSjf_x7tS1jCizh761O_FxtE0CPjuUvoNqcvQD0zkN8rlBP0gSDwYiVppj87g"
    // googleId: "100647700980982997517"
    // tokenId: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhjNThlMTM4NjE0YmQ1ODc0MjE3MmJkNTA4MGQxOTdkMmIyZGQyZjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODUzMDc1Mzc2ODk2LTZnMDhhbXBrY2RnbDBhMGoyZ3M0dW02a2tkMGRmMGNjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODUzMDc1Mzc2ODk2LTZnMDhhbXBrY2RnbDBhMGoyZ3M0dW02a2tkMGRmMGNjLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNjQ3NzAwOTgwOTgyOTk3NTE3IiwiZW1haWwiOiJzb250bS51ZXQudm51QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiR2JHeXVVMFZ6Ri1JcTNPbnJsZElGUSIsIm5hbWUiOiJTb24gVHJhbiBtaW5oIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BQXVFN21BNERGX3NxMnMzYXlDNXdUS1cwZnV0OXJsVXVKdXU1cFJGNU5hV193PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNvbiIsImZhbWlseV9uYW1lIjoiVHJhbiBtaW5oIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1Njk2ODkyODIsImV4cCI6MTU2OTY5Mjg4MiwianRpIjoiYjhhNmVmZjNkNGVjZjMyMDllODRhZjBkN2IwZWMzYzQ4NzMwYmYxOSJ9.AMOhTSZACE8dkK5mRC-UZ1CajCW2mXWw4XjTl5-fJ8caHarndoQo-nHH8pwfk9k4lPmoQp78PmzJs_sdn5JUuYGa1JJMGoWemxt2Qw1q6gjgKupIO2nlH2f6NVhWRepAxdeiTHxqMqrjQ_iiulPyoYOizd2v44NvGCnKVMvAktWiKzuFMILdnMS008Xl7RWd6ZeLXf2yHsLXjA1xyik91CVmCY5g64i5A2dtv7GexUGJYvLTvbUpwsrKnIaDy4Ck4UmzERXW2y-aBov1O2xpW4XNk_yoVhOXvc6MVHnpNiNvn-00E163yuzgwgfeQ_IsZO4_XgQd1stgsV505XbWbQ"
    //----Profile Obj
        // email: "sontm.uet.vnu@gmail.com"
        // familyName: "Tran minh"
        // givenName: "Son"
        // googleId: "100647700980982997517"
        // imageUrl: "https://lh3.googleusercontent.com/a-/AAuE7mA4DF_sq2s3ayC5wTKW0fut9rlUuJuu5pRF5NaW_w=s96-c"
        // name: "Son Tran minh"
    // Decode Token ID token ----https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=
        // "iss": "accounts.google.com",
        // "azp": "853075376896-6g08ampkcdgl0a0j2gs4um6kkd0df0cc.apps.googleusercontent.com",
        // "aud": "853075376896-6g08ampkcdgl0a0j2gs4um6kkd0df0cc.apps.googleusercontent.com",
        // "sub": "100647700980982997517",
        // "email": "sontm.uet.vnu@gmail.com",
        // "email_verified": "true",
        // "at_hash": "GbGyuU0VzF-Iq3OnrldIFQ",
        // "name": "Son Tran minh",
        // "picture": "https://lh3.googleusercontent.com/a-/AAuE7mA4DF_sq2s3ayC5wTKW0fut9rlUuJuu5pRF5NaW_w=s96-c",
        // "given_name": "Son",
        // "family_name": "Tran minh",
        // "locale": "en",
        // "iat": "1569689282",
        // "exp": "1569692882",
        // "jti": "b8a6eff3d4ecf3209e84af0d7b0ec3c48730bf19",
        // "alg": "RS256",
        // "kid": "8c58e138614bd58742172bd5080d197d2b2dd2f3",
        // "typ": "JWT"
    googleResponse = (response) => {
      console.log("googleResponse")
      console.log(response)
      this.props.actUserAddLoginWithGoogle({
        userId: response.googleId,
        email: response.profileObj.email,
        phone: null,
        password: null,
        fullName: response.profileObj.name,
        pictureUrl: response.profileObj.imageUrl,
        accessToken: response.accessToken,
        userType: "google",
        roleId: 2 // Customer
      }, this.props.history);
    };
    onGoogleFailure = (e) => {
      console.log("onGoogleFailure")
      console.log(e)
    };
}


const mapStateToProps = (state) => ({
  user: state.user,
  siteInfo: state.siteInfo,
  cart: state.cart
});
const mapActionsToProps = {
  actCategoryGet,actBrandsGet,
  actUserAddLoginWithFaceBook,
  actUserAddLoginWithGoogle,
  actUserLogout
};

export default withRouter(connect(
  mapStateToProps,mapActionsToProps
)(AppHeader));