import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {actDiscountGetBestHome} from '../../redux/DiscountReducer'

import ProductWrapper from '../category/ProductWrapper'
import { Row, Col, Radio, Button, Icon, Input, Select } from 'antd';
import './HomePage.css';

class HotDiscountHome extends Component {
    constructor(props) {
        super(props)

        
    }
    componentDidMount() {
        if (!this.props.discount.best4Home || this.props.discount.best4Home.length <= 0) {
            this.props.actDiscountGetBestHome();
        }
    }
    render() {
        if (this.props.discount.best4Home && this.props.discount.best4Home.length > 0) {
            let producView = [];
            this.props.discount.best4Home.forEach(element => {
                //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
                if (element.product) {
                    // Force use 5 Columns here
                    producView.push(
                        <Col xs={12} sm={12} md={8} lg={6} xl={6} xxl={4}  key={element.product.id}>
                            <ProductWrapper product={element.product}/>
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
    discount: state.discount
});
const mapActionsToProps = {
    actDiscountGetBestHome
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(HotDiscountHome));
