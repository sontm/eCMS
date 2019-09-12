import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { actCategoryGet } from '../redux/CategoryActions';
import AppDropdownMenu from './AppDropdownMenu'

import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
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

    onMenuListHover() {
      if (!this.isHomePage) {
        this.setState({
          hoveredMenuList: true
        })
      }
    }
    onMenuListOut() {
      if (!this.isHomePage) {
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
      console.log("onMenuContainerOut")
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
      return (
        <React.Fragment>
          <div className={(this.state.hoveredMenuList) ? "flyout-outside-mask" : ""}></div>
          <Header>
          <div className="app-header">
          <Row>
            <div>
            <Col span={4}>
            <div className="app-title" >
              <Link to="/" style={{paddingLeft: "20px"}}>Phu Phuong</Link>
            </div>
            </Col>

            <Col span={10}><Search
              placeholder="Search product, category..."
              enterButton="Tìm Kiếm"
              size="large"
              onSearch={value => console.log(value)}
            /></Col>

            <Col span={3}>
            <div className="top-header-menu-item">
              <Button type="link" ghost size="large">
                <Icon type="shopping-cart" style={{fontSize:"1.2em"}}/>
                Theo Doi Don Hang
              </Button>
            </div>
            </Col>
            <Col span={3}>
            <div className="top-header-menu-item">
              <Button type="link" ghost size="large">
                <Icon type="user" style={{fontSize:"1.2em"}}/>
                Tai Khoan
              </Button>
            </div>
            </Col>

            <Col span={4}>
            <div className="cart-container">
              <Link to={"/cart"}>
              <Button  ghost size="large">
                <Icon type="shopping-cart" style={{fontSize:"1.2em"}} />
                Giỏ Hàng
                <Badge showZero count={this.props.cart.savedProductsId ? this.props.cart.savedProductsId.length : 0} 
                  className="cart-badge"/>
              </Button>
              </Link>
            </div>
            </Col>
            </div>
          </Row>
          <Row>
          <Col span={4}>
            <div onMouseOver={this.onMenuListHover} onMouseLeave={this.onMenuListOut}
              style={{marginLeft:"15px"}} className="hamburger-category-menu">
              <Icon type="menu"/>
              <span className="category-menu-text" >Danh Mục Sản Phẩm</span>
            </div>
          </Col>
          </Row>
          {isHomePage ? null : appDropDownMenu}
        </div>
        </Header>
        {isHomePage ? appDropDownMenu: null}
        </React.Fragment>
      );
    }
}


const mapStateToProps = (state) => ({
  //user: state.user
  category: state.category,
  cart: state.cart
});
const mapActionsToProps = {
  actCategoryGet
};

export default withRouter(connect(
  mapStateToProps,mapActionsToProps
)(AppHeader));