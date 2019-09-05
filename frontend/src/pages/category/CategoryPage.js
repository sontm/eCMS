import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductWrapper from './ProductWrapper'
import SideMenu from '../../common/SideMenu';

import { actProductGetOfCategory } from '../../redux/actions/ProductActions';

import { Row, Col } from 'antd';
const queryString = require('query-string');

class CategoryPage extends Component {
    componentDidMount() {
        console.log("  >>DID MOUNT CategoryPage:" + this.props.match.params.id)
        var parsedQuery = queryString.parse(this.props.location.search);
        if (this.props.product.productsQuery.length <= 0 ) {
            console.log("    >>>> actProductGetOfCategory")
            this.props.actProductGetOfCategory(this.props.match.params.id, parsedQuery.lvl);
        }
    }
    componentDidUpdate() {
        console.log("  >>DID UPdate CategoryPage:" + this.props.match.params.id)
        var parsedQuery = queryString.parse(this.props.location.search);
        if (this.previousCategoryId != this.props.match.params.id) {
            console.log("    >>>> actProductGetOfCategory")
            this.props.actProductGetOfCategory(this.props.match.params.id, parsedQuery.lvl);
        }
        this.previousCategoryId = this.props.match.params.id;
    }

    render() {
        console.log("  >>render CategoryPage:" + this.props.match.params.id)
        var parsedQuery = queryString.parse(this.props.location.search);
        let producView = [];
        if (this.props.product.productsQuery.length > 0) {
            this.props.product.productsQuery.forEach(element => {
                producView.push(
                    <Col span={6}>
                        <ProductWrapper {...element}/>
                    </Col>)
            });
        }
        return (
            <React.Fragment>
                <Row>
                    <Col span={4}>
                    <SideMenu />
                    </Col>
                    <Col span={20}>
                    {producView}
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    category: state.category,
    product: state.product
});
const mapActionsToProps = {
    actProductGetOfCategory
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(CategoryPage));
