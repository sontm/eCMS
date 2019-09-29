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
    }
    render() {
        console.log(this.props.match.params)
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
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapActionsToProps = {

};
  
export default withRouter(connect(
    mapStateToProps,
    mapActionsToProps
)(CustomerPage));

