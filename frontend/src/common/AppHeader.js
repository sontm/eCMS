import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
import { Row, Col } from 'antd';
const { Search } = Input;
const Header = Layout.Header;
const {SubMenu} = Menu;

const menuData = {
  "BanhKeo":{
    "Banh":["Banh1", "Banh2"],
    "Keo":["Keo1", "Keo2"]
  },
  "ThucPham":{
    "ThucPhamKho":["Tao", "Chuoi", "Dua"],
    "Dac San": ["Nem chua", "Thit Cho", "Thit Lon"]
  },
  "Do Uong":{
    "Bia":["Heiniken", "Tiger", "HaNoi"],
    "Ruou":["Vodka", "Whisky", "Sochu"]
  }
};

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props); 
  }
  
  
  render = () => {
    let {config} = this.props;
    let parentMenus = [];
    for (var prop in config) {
      if (Object.prototype.hasOwnProperty.call(config, prop)) {
        // do stuff
        parentMenus.push(
            <li onMouseOver={this.props.onParentMenuHover} onMouseLeave={this.props.onParentMenuOut}
              className={this.props.hoveredParent == prop ? "parent-menu-li-hovering" : ""}>
                {prop}
            </li>)
      }
    }
    let allCols = [];
    let curSubmenuItems = config["" + this.props.hoveredParent];
    if (curSubmenuItems) {
      for (var propSub in curSubmenuItems) {
        // One Sub menu. i.e Banh
        let subMenus = [];
        if (Object.prototype.hasOwnProperty.call(curSubmenuItems, propSub)) {
          let subItems = curSubmenuItems[propSub]
          if (subItems && subItems.length > 0) {
            subItems.forEach((item, idx) => {
              subMenus.push(
                <li>
                  {item}
                </li>           
              )
            });
          }
          allCols.push (<Col span={6}>
            <ul className="sub-menu">
            {subMenus}
            </ul>
          </Col>);
        }
      }
    }
    return (
      <React.Fragment>
        <Row className={this.props.hoveredMenuList ? "flyout-container-display" : "flyout-container-hidden"}
          onMouseLeave={this.props.onMenuContainerOut}>
          <Col span={4} className="parent-menu-container-left">
            <ul className="parent-menu">
              {parentMenus}
            </ul>
          </Col>

          <Col span={20} className={this.props.hoveredParent != "" ? "parent-menu-container-right" 
              : "parent-menu-container-right-hidden"} ><Row>
            {allCols}
          </Row></Col>
        </Row>
      </React.Fragment>);
  }
}

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
    }

    onMenuListHover() {
      this.setState({
        hoveredMenuList: true
      })
    }
    onMenuListOut() {
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
    onParentMenuHover(e) {
      console.log("onParentMenuHover")
      console.log(e)
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
    render() {
        return (
            <Header>
            <React.Fragment>
            <Row>
              <Col span={4}>
              <div className="app-title" >
                <Link to="/" style={{paddingLeft: "20px"}}>Phu Phuong</Link>
              </div>
              </Col>

              <Col span={12}><Search
                placeholder="Search product, category..."
                enterButton="Tìm Kiếm"
                size="large"
                onSearch={value => console.log(value)}
              /></Col>
              
            </Row>
            <Row>
            <Col span={4}>
              <div onMouseOver={this.onMenuListHover} onMouseLeave={this.onMenuListOut}>
              <Icon type="menu" className="nav-icon"/>
              <span className="nav-menu-text" >Danh Mục Sản Phẩm</span>
              </div>
            </Col>
            </Row>
            <DropdownMenu config={menuData} onParentMenuOut={this.onParentMenuOut} onMenuContainerOut={this.onMenuContainerOut}
              onParentMenuHover={this.onParentMenuHover} hoveredParent={this.state.hoveredParent}
              hoveredMenuList={this.state.hoveredMenuList}
              />
            
            </React.Fragment>
          </Header>
        );
    }
}


const mapStateToProps = (state) => ({
  //user: state.user
});
const mapActionsToProps = {
  //actLogout
};

export default withRouter(connect(
  mapStateToProps,mapActionsToProps
)(AppHeader));