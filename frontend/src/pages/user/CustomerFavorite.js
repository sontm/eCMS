import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';
import Backend from '../../util/Backend';
import {actUserGetFavorites} from '../../redux/UserReducer'

import ProductWrapper from '../category/ProductWrapper'

// Redux stuff
import { connect } from 'react-redux';

import { Form, Input, Button, Icon, notification, Row, Col} from 'antd';
const FormItem = Form.Item;

class CustomerFavorites extends Component {
    componentDidMount() {
        console.log("CustomerFavorites DidMount")
        if (this.props.user.userProfile) {
            this.props.actUserGetFavorites(this.props.user.userProfile.id);
        }
    }
    render() {
        console.log("CustomerFavorites Render:" + this.props.user.favorites.length)
        let producView = [];
        if (this.props.user.favorites.length > 0) {
            this.props.user.favorites.forEach(element => {
                //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
                producView.push(
                    <Col xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                        <ProductWrapper product={element}/>
                    </Col>)
            });
        }
        return (
            <div className="customer-content">
                <Row type="flex">
                {producView}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapActionsToProps = {
    actUserGetFavorites
};
  
export default withRouter(connect(
    mapStateToProps,
    mapActionsToProps
)(CustomerFavorites));

