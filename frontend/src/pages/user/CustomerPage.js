import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';

import { Form, Input, Button, Icon, notification, Tabs, Row, Col, Avatar} from 'antd';

import CustomerProfile from './CustomerProfile';
import CustomerAddress from './CustomerAddress';
import CustomerFavorite from './CustomerFavorite';
import CustomerOrder from './CustomerOrder';
import CustomerRecentView from './CustomerRecentView';
import {actUserLogout} from '../../redux/UserReducer'
import { getAvatarColor } from '../../util/Colors';

const FormItem = Form.Item;
const {TabPane} = Tabs;

//this.props.match.params.info:
// /customer/profile
// /customer/addressbook
// /customer/orders
// /customer/favorites
// /customer/recentviews

class CustomerPage extends Component {
    constructor(props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log("CustPage WILL RECEIT:" + this.props.match.params.info)
    }
    handleLogout() {
        console.log(" USER handleLogout")
        this.props.actUserLogout();
      }
    render() {
        console.log("Custoer Page neeeeeeeeeeeeeeee")
        console.log(this.props.match.params)
        console.log(this.props.match.query)
        if (window.innerWidth >= 768) { // Desktop Layout
            let userName = (this.props.user.userProfile && this.props.user.userProfile.fullName) ?
            this.props.user.userProfile.fullName : "Tài Khoản";
            let avatarInfoView = 
                <Link to={"/customer/profile"}>
                    <Avatar size={64} style={{ backgroundColor: getAvatarColor(userName)}}>
                        {userName[0].toUpperCase()}   
                    </Avatar><br />   
                    <span style={{fontSize: "1.2em"}}>{userName}</span>  
                </Link>;
            if (this.props.user.userProfile && this.props.user.userProfile.pictureUrl) {
                avatarInfoView = 
                    <Link to={"/customer/profile"}>
                        <Avatar size={64} src={this.props.user.userProfile.pictureUrl}>
                        </Avatar><br />
                        <span style={{fontSize: "1.2em"}}>{userName}</span> 
                    </Link>;
            }

            let tabOrder = (
                <Link to={"/customer/orders"}>
                    <span>Đơn Hàng Của Tôi</span> 
                </Link>
            );
            let tabAddress = (
                <Link to={"/customer/addressbook"}>
                    <span>Địa Chỉ</span> 
                </Link>
            );
            let tabFavorite = (
                <Link to={"/customer/favorites"}>
                    <span>Sản Phẩm Yêu Thích</span> 
                </Link>
            );
            let tabRecentViews = (
                <Link to={"/customer/recentviews"}>
                    <span>Sản Phẩm Xem Gần Đây</span> 
                </Link>
            );
            return (
                <div>

                <Tabs activeKey={this.props.match.params.info ?
                    this.props.match.params.info : "profile"}
                    tabPosition="left" size="large" tabBarStyle={{width: "20%"}}>
                    <TabPane tab={avatarInfoView} key="profile">
                        <CustomerProfile />
                    </TabPane>
                    <TabPane tab={tabAddress} key="addressbook">
                        <CustomerAddress />
                    </TabPane>
                    <TabPane tab={tabOrder} key="orders">
                        <CustomerOrder />
                    </TabPane>
                    <TabPane tab={tabFavorite} key="favorites">
                        <CustomerFavorite />
                    </TabPane>
                    <TabPane tab={tabRecentViews} key="recentviews">
                        <CustomerRecentView />
                    </TabPane>
                </Tabs>
                </div>
            );
        } else {
            // Mobile Layout (xs, sm)
            let userName = (this.props.user.userProfile && this.props.user.userProfile.fullName) ?
                this.props.user.userProfile.fullName : "Tài Khoản";
            let customerDefault = (
                <React.Fragment>
                <Row>
                <div className="customer-menu-list-mobile-account">
                <Link to={"/customer/profile"}>
                    <Col span={23}>
                        <Avatar size={64} style={{ backgroundColor: getAvatarColor(userName)}}>
                            {userName[0].toUpperCase()}   
                        </Avatar>
                        {" "}
                        <span style={{fontSize: "1.2em"}}>{userName}</span>
                    </Col>
                    <Col span={1} style={{height: "100%", display:"flex", alignItems: "center"}}>
                        <Icon type="right" style={{float: "right"}}/>
                    </Col>
                </Link>
                </div>
                </Row>
                    
                <Row className="customer-menu-list-mobile">
                <Link to={"/customer/addressbook"}>
                    <Col span={23} style={{height: "100%", display:"flex", alignItems: "center"}}>
                        <span>Địa Chỉ</span>
                    </Col>
                    <Col span={1} style={{height: "100%", display:"flex", alignItems: "center"}}>
                        <Icon type="right" style={{float: "right"}}/>
                    </Col>
                </Link>
                </Row>

                <Row className="customer-menu-list-mobile">
                <Link to={"/customer/orders"}>
                    <Col span={23} style={{height: "100%", display:"flex", alignItems: "center"}}>
                    <span>Đơn Hàng Của Tôi</span> 
                    </Col>
                    <Col span={1} style={{height: "100%", display:"flex", alignItems: "center"}}>
                        <Icon type="right" style={{float: "right"}}/>
                    </Col>
                </Link>
                </Row>

                <Row className="customer-menu-list-mobile">
                <Link to={"/customer/favorites"}>
                    <Col span={23} style={{height: "100%", display:"flex", alignItems: "center"}}>
                        <span>Sản Phẩm Yêu Thích</span> 
                    </Col>
                    <Col span={1} style={{height: "100%", display:"flex", alignItems: "center"}}>
                        <Icon type="right" style={{float: "right"}}/>
                    </Col>
                </Link>
                </Row>

                <Row className="customer-menu-list-mobile">
                <Link to={"/customer/recentviews"}>
                    <Col span={23} style={{height: "100%", display:"flex", alignItems: "center"}}>
                        <span>Sản Phẩm Xem Gần Đây</span> 
                    </Col>
                    <Col span={1} style={{height: "100%", display:"flex", alignItems: "center"}}>
                        <Icon type="right" style={{float: "right"}}/>
                    </Col>
                </Link>
                </Row>

                <br />
                <Row style={{textAlign: "center"}}>
                    <Button type="danger" size="large" onClick={this.handleLogout}>
                        Đăng Xuất
                    </Button>
                </Row>
                </React.Fragment>
            )

            if (this.props.match.params.info == "profile") {
                return (
                    <CustomerProfile />
                );
            } else if (this.props.match.params.info == "addressbook") {
                return (
                    <CustomerAddress />
                );
            } else if (this.props.match.params.info == "orders") {
                return (
                    <CustomerOrder />
                );
            } else if (this.props.match.params.info == "favorites") {
                return (
                    <CustomerFavorite />
                );
            } else if (this.props.match.params.info == "recentviews") {
                return (
                    <CustomerRecentView />
                );
            } else {
                return (
                    <React.Fragment>
                    {customerDefault}
                    </React.Fragment>
                );
            }
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapActionsToProps = {
    actUserLogout
};
  
export default withRouter(connect(
    mapStateToProps,
    mapActionsToProps
)(CustomerPage));

