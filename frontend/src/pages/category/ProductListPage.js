import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {actQueryChangeCategory} from '../../redux/ProductQueryReducer'

import ProductWrapper from './ProductWrapper'
import SideMenu from '../../common/SideMenu';

import { actProductGetOfCategory, actProductFilter } from '../../redux/ProductActions';
import './ProductListPage.css';

import { Row, Col, Radio, Button, Icon, Input, Select } from 'antd';
const queryString = require('query-string');
const { Search } = Input;
const { Option } = Select;

class ProductListPage extends Component {
    constructor(props) {
        super(props)

        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onSearchFilter = this.onSearchFilter.bind(this);
        
    }

    // Note when Refresh by URL, there is no parsedQuery.lvl
    componentDidMount() {
        //var parsedQuery = queryString.parse(this.props.location.search);
        if (this.props.product.productsQuery.length <= 0 ) {
            //this.props.actProductGetOfCategory(this.props.match.params.id, parsedQuery.lvl);
            this.props.actQueryChangeCategory(this.props.query, this.props.match.params.id, this.props.match.params.lvl);
        }
    }
    componentDidUpdate() {
        if (this.previousCategoryId != this.props.match.params.id) {
            //this.props.actProductGetOfCategory(this.props.match.params.id, parsedQuery.lvl);
            this.props.actQueryChangeCategory(this.props.query, this.props.match.params.id, this.props.match.params.lvl);
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
                <Col xs={0} sm={0} md={0} lg={24} xl={16} xxl={16}>
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
                {/* {For Mobile UI} */}
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    <Row>
                    <Col xs={8} sm={6} span={6}>
                    <span className="filter-option">Sắp Xếp:</span>
                    </Col>
                    <Col xs={16} sm={18} span={18}>
                    <Select defaultValue="popular" style={{width: "100%"}}>
                        <Option value="popular">Bán Chạy</Option>
                        <Option value="new">Hàng Mới</Option>
                        <Option value="discount">Giảm Giá</Option>
                        <Option value="lowprice">Giá Thấp</Option>
                        <Option value="highprice">Giá Cao</Option>
                    </Select>
                    </Col>
                    </Row>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={8} xxl={8}>
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
        var parsedQuery = queryString.parse(this.props.location.search);
        let producView = [];
        if (this.props.product.productsQueryFiltered.length > 0) {
            this.props.product.productsQueryFiltered.forEach(element => {
                //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
                producView.push(
                    <Col xs={12} sm={12} md={12} lg={8} xl={6} xxl={6} key={element.id}>
                        <ProductWrapper product={element}/>
                    </Col>)
            });
        }
        return (
            <React.Fragment>
                <Row>
                    <Col xs={0} sm={0} md={6} lg={5} xl={4} xxl={4}>
                    <SideMenu />
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={19} xl={20} xxl={20}>
                        {this.renderFilterBar()}
                        <Row type="flex">
                        {producView}
                        </Row>
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
