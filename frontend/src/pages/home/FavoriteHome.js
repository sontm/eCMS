import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {actUserGetFavorites} from '../../redux/UserReducer'

import AppContant from '../../util/AppConstant'
import ProductWrapper from '../category/ProductWrapper'
import { Row, Col, Radio, Button, Icon, Input, Select, Card } from 'antd';
import './HomePage.css';

class FavoriteHome extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if (this.props.user.isLogined) {
            this.props.actUserGetFavorites(this.props.user.userProfile.id)
        }
    }
    render() {
        if (this.props.user.isLogined && this.props.user.favorites.length > 0) {
            let producView = [];
            this.props.user.favorites.forEach(element => {
                //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
                if (element) {
                    // Force use 5 Columns here
                    producView.push(
                        <Col xs={8} sm={8} md={8} lg={6} xl={4} xxl={4} style={{width:"20%"}} key={element.id}>
                            <ProductWrapper product={element}/>
                        </Col>)
                }
            });
            return (
                <Card title="San Pham Yeu Thich" bordered={false}>
                <Row type="flex">
                    {producView}
                </Row>
                </Card>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
const mapActionsToProps = {
    actUserGetFavorites
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(FavoriteHome));

