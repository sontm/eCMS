import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {actHomeGetRecentView} from '../../redux/HomeReducer'
import {actUserGetRecentViews} from '../../redux/UserReducer'

import AppContant from '../../util/AppConstant'
import ProductWrapper from '../category/ProductWrapper'
import { Row, Col, Radio, Button, Icon, Input, Select } from 'antd';
import './HomePage.css';

class RecentViewHome extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (this.props.user.isLogined) {
            this.props.actUserGetRecentViews(this.props.user.userProfile.id)
        } else {
            if (!this.props.home.recentViews || this.props.home.recentViews.length <= 0) {
                this.props.actHomeGetRecentView(AppContant.getProductRecentView());
            }
        }
    }
    render() {
        let viewData = [];
        if (this.props.user.isLogined && this.props.user.recentViews.length > 0) {
            viewData = this.props.user.recentViews;
        } else if (this.props.home.recentViews && this.props.home.recentViews.length > 0) {
            viewData = this.props.home.recentViews;
        }
        if (viewData.length > 0) {
            let producView = [];
            viewData.forEach(element => {
                //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
                if (element) {
                    // Force use 5 Columns here
                    producView.push(
                        <Col xs={12} sm={12} md={8} lg={6} xl={6} xxl={4} key={element.id}>
                            <ProductWrapper product={element}/>
                        </Col>)
                }
            });
            return (
                <div>
                <Row type="flex">
                    {producView}
                </Row>
                </div>
            )
        } else {
            return (
                <div>
                    None!
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    home: state.home,
    user: state.user
});
const mapActionsToProps = {
    actHomeGetRecentView,
    actUserGetRecentViews
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(RecentViewHome));
