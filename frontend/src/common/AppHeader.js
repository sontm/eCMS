import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { actCategoryGet } from '../redux/CategoryActions';
import AppDropdownMenu from './AppDropdownMenu'

import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon, Input, Popover } from 'antd';
import { Row, Col, Button,Badge } from 'antd';
const { Search } = Input;
const Header = Layout.Header;
const {SubMenu} = Menu;

class AppHeader extends Component {
    constructor(props) {
        super(props); 
        this.state = {
          hoveredMenuList: false,
          hoveredParent: ""
        };
        this.onMenuListHover = this.onMenuListHover.bind(this);   
        this.onMenuListOut = this.onMenuListOut.bind(this);
        this.onParentMenuHover = this.onParentMenuHover.bind(this);   
        this.onMenuContainerOut = this.onMenuContainerOut.bind(this); 
        this.onParentMenuClick = this.onParentMenuClick.bind(this); 
        
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

    componentDidMount() {
      console.log("  >>DID MOUNT AppHeader")
      if (this.props.category.categories.length <= 0 ) {
          console.log("    >>>> actCategoryGet")
          this.props.actCategoryGet();
      }
    }
    componentDidUpdate() {
        if (this.props.category.categories.length <= 0 ) {
            console.log("  >>DID UPDATE AppHeader")
            console.log("    >>>> actCategoryGet")
            this.props.actCategoryGet();
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
      if (this.props.user.isLogined && this.props.user.userid) {
        return (
          <div style={{textAlign: "center", width: "200px"}}>
            <Row>
            <Link to={"/login"}>
              <Button type="link" style={{width: "100%", marginBottom: "10px"}}>
                <span style={{width: "100%", textAlign: "left"}}>
                Profile
                </span>
              </Button></Link>
            </Row>
            <Row>
            <Link to={"/login"}>
              <Button type="link" style={{width: "100%", marginBottom: "10px"}}>
                <span style={{width: "100%", textAlign: "left"}}>
                Thong Tin
                </span>
              </Button>
            </Link>
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
          </Row>
        </div>
        );
      }
    }
    render() {
      let isHomePage = this.props.location.pathname == "/" ? true : false;
      this.isHomePage = isHomePage;
      let appDropDownMenu = 
        <AppDropdownMenu config={this.props.category.categoriesLevel} onParentMenuOut={this.onParentMenuOut} onMenuContainerOut={this.onMenuContainerOut}
          onParentMenuHover={this.onParentMenuHover} hoveredParent={this.state.hoveredParent}
          onParentMenuClick={this.onParentMenuClick}
          hoveredMenuList={this.state.hoveredMenuList}
          isHomePage={isHomePage}
          />;

      //xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl	≥1600px
      return (
        <React.Fragment>
          <div className={(this.state.hoveredMenuList) ? "flyout-outside-mask" : ""}></div>
          <Header>
          <div className="app-header">
          <Row>
            <div>
            <Col xs={0} sm={0} md={4} lg={4} xl={4} xxl={4}>
            <div className="app-title" >
              <Link to="/" style={{paddingLeft: "20px"}}>Phu Phuong</Link>
            </div>
            </Col>

            <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={10}><Search
              placeholder="Search product, category..."
              enterButton="Tìm Kiếm"
              size="large"
              onSearch={value => console.log(value)}
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
                  <Button type="link" ghost size="large">
                    <Icon type="user" style={{fontSize:"1.2em"}} className="show-only-in-md"/>
                    <span className="hidden-in-md">
                      {this.props.user.userid ? this.props.user.userid : "Tài Khoản"}
                    </span>
                  </Button>
                </Popover>
                </div>
                </Col>

                <Col md={10} lg={10} xl={10} xxl={10}>
                <div className="cart-container">
                  <Link to={"/cart"}>
                  <Button  ghost size="large">
                    <Icon type="shopping-cart" style={{fontSize:"1.2em"}} className="show-only-in-md"/>
                    <span className="hidden-in-md">Giỏ Hàng</span>
                    <Badge showZero count={this.props.cart.savedProductsId ? this.props.cart.savedProductsId.length : 0} 
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
          </div>
          </Row>
          {isHomePage ? null : appDropDownMenu}
        </div>
        </Header>
        {isHomePage ? appDropDownMenu: null}
        {this.renderBottomMenuMobile()}
        </React.Fragment>
      );
    }
}


const mapStateToProps = (state) => ({
  user: state.user,
  category: state.category,
  cart: state.cart
});
const mapActionsToProps = {
  actCategoryGet
};

export default withRouter(connect(
  mapStateToProps,mapActionsToProps
)(AppHeader));