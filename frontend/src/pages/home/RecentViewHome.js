import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {actHomeGetRecentView} from '../../redux/HomeReducer'
import AppContant from '../../util/AppConstant'
import ProductWrapper from '../category/ProductWrapper'
import { Row, Col, Radio, Button, Icon, Input, Select } from 'antd';
import './HomePage.css';

class RecentViewHome extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (!this.props.home.recentViews || this.props.home.recentViews.length <= 0) {
            this.props.actHomeGetRecentView(AppContant.getProductRecentView());
        }
    }
    render() {
        console.log(AppContant.getProductRecentView());
        if (this.props.home.recentViews && this.props.home.recentViews.length > 0) {
            let producView = [];
            this.props.home.recentViews.forEach(element => {
                //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
                if (element) {
                    // Force use 5 Columns here
                    producView.push(
                        <Col xs={8} sm={8} md={8} lg={6} xl={4} xxl={4} style={{width:"20%"}}>
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
    home: state.home
});
const mapActionsToProps = {
    actHomeGetRecentView
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(RecentViewHome));
