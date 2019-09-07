import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {actQueryChangeCategory} from '../../redux/ProductQueryReducer'

import ProductWrapper from './ProductWrapper'
import SideMenu from '../../common/SideMenu';

import { actProductGetOfCategory, actProductFilter } from '../../redux/ProductActions';
import './ProductListPage.css';

import { Row, Col, Radio, Button, Icon, Input } from 'antd';
const queryString = require('query-string');
const { Search } = Input;

class ProductListPage extends Component {
    constructor(props) {
        super(props)

        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onSearchFilter = this.onSearchFilter.bind(this);
        
    }
    componentDidMount() {
        console.log("  >>DID MOUNT ProductListPage:" + this.props.match.params.id)
        var parsedQuery = queryString.parse(this.props.location.search);
        if (this.props.product.productsQuery.length <= 0 ) {
            console.log("    >>>> actProductGetOfCategory")
            //this.props.actProductGetOfCategory(this.props.match.params.id, parsedQuery.lvl);
            this.props.actQueryChangeCategory(this.props.query, this.props.match.params.id, parsedQuery.lvl);
        }
    }
    componentDidUpdate() {
        console.log("  >>DID UPdate ProductListPage:" + this.props.match.params.id)
        var parsedQuery = queryString.parse(this.props.location.search);
        if (this.previousCategoryId != this.props.match.params.id) {
            console.log("    >>>> actProductGetOfCategory")
            //this.props.actProductGetOfCategory(this.props.match.params.id, parsedQuery.lvl);
            this.props.actQueryChangeCategory(this.props.query, this.props.match.params.id, parsedQuery.lvl);
        }
        this.previousCategoryId = this.props.match.params.id;
    }

    onChangeFilter (e) {
        console.log('Name:' + e.target.name);
        this.props.actProductFilter(e.target.name, this.props.product.searchFilter, this.props.product.productsQuery)
    };
    onSearchFilter (value) {
        // console.log('Search:' + value);
        // this.props.actProductFilter(this.props.product.filter, value, this.props.product.productsQuery)
    };

    // If support Search when typing, use this
    onChangeSearchFilter(e) {
        console.log("onChangeSearchFilter:" + e.target.value)
        let currentSearch = e.target.value
        //if (e.target.value=="" || e.target.value.length <= 0) {
        if(this.timeout) {
            // When duing 500ms, User typing new character, stop timeout, no need to search
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            console.log("END of TIMEOUT")
            this.props.actProductFilter(this.props.product.filter, currentSearch, this.props.product.productsQuery)
        },500);
    }
    renderFilterBar() {
        return (
            <Row>
            <div className="product-filter">
                <Col span={16}>
                    <span className="filter-option">Sắp Xếp:</span>
                    <Button type={this.props.product.filter=="popular" ? "danger" : "dashed"} size="large" className="filter-option" 
                            name="popular" onClick={this.onChangeFilter}>
                        Bán Chạy
                    </Button>
                    <Button type={this.props.product.filter=="new" ? "danger" : "dashed"} size="large" className="filter-option"
                            name="new" onClick={this.onChangeFilter}>
                        Hàng Mới
                    </Button>
                    <Button type={this.props.product.filter=="discount" ? "danger" : "dashed"} size="large" className="filter-option"
                            name="discount" onClick={this.onChangeFilter}>
                        Giảm Giá
                    </Button>
                    <Button type={this.props.product.filter=="lowprice" ? "danger" : "dashed"} size="large" className="filter-option"
                            name="lowprice" onClick={this.onChangeFilter}>
                        Giá Thấp
                    </Button>
                    <Button type={this.props.product.filter=="highprice" ? "danger" : "dashed"} size="large" className="filter-option"
                            name="highprice" onClick={this.onChangeFilter}>
                        Giá Cao
                    </Button>
                </Col>
                <Col span={8}>
                    <Search
                        placeholder="Search product"
                        enterButton
                        size="large"
                        onSearch={value => this.onSearchFilter(value)}
                        onChange={e => this.onChangeSearchFilter(e)}
                    />
                </Col>
            </div>
            </Row>
        );
    }
    render() {
        console.log("  >>render ProductListPage:" + this.props.match.params.id)
        var parsedQuery = queryString.parse(this.props.location.search);
        let producView = [];
        if (this.props.product.productsQueryFiltered.length > 0) {
            this.props.product.productsQueryFiltered.forEach(element => {
                producView.push(
                    <Col span={6}>
                        <ProductWrapper product={element}/>
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
                        {this.renderFilterBar()}
                        {producView}
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    category: state.category,
    product: state.product,
    query: state.query
});
const mapActionsToProps = {
    actProductGetOfCategory,
    actQueryChangeCategory,
    actProductFilter
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(ProductListPage));
