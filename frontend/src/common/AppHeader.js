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

class AppHeader extends Component {
    constructor(props) {
        super(props); 
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
    }

    render() {
        let menuItems = [
          <Menu.Item key="/team">
            <Link to="/team">
            <Icon type="menu" className="nav-icon"/>
              <span className="nav-menu-text" >Danh Mục Sản Phẩm</span>
            </Link>
          </Menu.Item>,

          <Menu.Item key="/absence">
            <Link to="/">
            <Icon type="contacts" className="nav-icon"/>
              <span className="nav-menu-text" >Theo Dõi Đơn Hàng</span>
            </Link>
          </Menu.Item>,

          <Menu.Item key="/poll">
          <Link to="/">
            <Icon type="bar-chart" className="nav-icon" />
            <span className="nav-menu-text" >Today Deals</span>
          </Link>
          </Menu.Item>
        ]; 

        return (
            <Header>
            <React.Fragment>
            <Row>
              <Col span={4}>
              <div className="app-title" >
                <Link to="/" style={{paddingLeft: "20px"}}>App</Link>
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
              <Menu theme="light"
                className="app-menu"
                mode="horizontal"
                onClick={this.handleMenuClick}
                selectedKeys={[this.props.location.pathname]}
                >
                  {menuItems}
              </Menu>
            </Row>
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