import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Backend from '../../util/Backend'
import ProductWrapper from '../category/ProductWrapper'
import './BrandPage.css';

import Helpers from '../../util/Helpers'
import { Row, Col, Radio, Button, Icon, Input, Select, Card } from 'antd';
const queryString = require('query-string');
const { Search } = Input;
const { Option } = Select;

// This Class using State to Display, not Redux
class BrandPage extends Component {
    constructor(props) {
        super(props)

        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onSearchFilter = this.onSearchFilter.bind(this);
        this.state = {
            products: [],
            productsFilter: [],
            filterType: "popular",
            searchTerm: ""
        }
    }

    // Note when Refresh by URL, there is no parsedQuery.lvl
    //[{"id":4,"name":"Ngũ cốc hoa quả Calbee Furugura Nhật Bản gói 800g Do",
    //"descShort":"Ngũ cốc hoa quả Calbee Furugura Nhật Bản gói 800g Desc Short",
    //"descMedium":"Ngũ cốc hoa quả Calbee Furugura Nhật Bản gói 800g<CRLF>Desc Medium",
    //"descLong":"Ngũ cốc hoa quả Calbee Furugura Nhật Bản gói 800g Desc Long","unitPrice":169000,
    //"stockNum":100,"active":true,"imgThump":"images/products/ThucPham/ptp_1_1.jpg","img1":
    //"images/products/ThucPham/ptp_1_1.jpg","img2":"images/products/ThucPham/ptp_1_2.jpg",
    //"img3":null,"img4":null,"img5":null,"img6":null,"firstCategoryId":15,"secondCategoryId":6,
    //"thirdCategoryId":2,"brandId":5,"parentProductId":null,"productAttributeId":null,
    //"categories":{"id":15,"name":"Hoa Quả Khô","desc":null,"active":true,"order":null,
    //"parentCategoryId":6,"cateDiscounts":[]},
    //  "brands":{"id":5,"name":"Calbee","imgLogo":null,"countryId":2,"active":true,
            //"countries":{"id":2,"name":"Nhật Bản","code":"jp",},
            //"brandDiscounts":[{"id":3,"desc":"Nhan Hieu Calbee have coupon JP20 giam 20K Het Thang 12",
                //"from":"2019-09-01T16:42:06.000Z","to":"2019-12-30T16:42:06.000Z","type":"coupon",
                //"fixMoney":20000,"percent":0,"applyCategoryId":0,"applyBrandId":5,
                //"applyProductId":0,"img":"","coupon":"JP20",},
            // {"id":7,"desc":"Nhan Hieu Calbee Giam 10%","from":"2019-09-01T16:42:06.000Z",
                //"to":"2019-11-30T16:42:06.000Z","type":"discount","fixMoney":0,"percent":10,
                //"applyCategoryId":0,"applyBrandId":5,"applyProductId":0,"img":"","coupon":"",}]},
    //"attributes":[{"id":4,"name":"Đỏ","value":null,"attributeGroupId":1,
    //"attributeGroups":{"id":1,"name":"Màu Sắc",}}],"productDiscounts":[]},
    componentDidMount() {
        //var parsedQuery = queryString.parse(this.props.location.search);
        Backend.getProductsOfBrand(this.props.match.params.id, 
            response => {
                console.log("getProductsOfBrand Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)
                this.setState({
                    products: response.data,
                    productsFilter: response.data
                })
            },
            error => {
                console.log("getProductsOfBrand error")
            }); 
    }
    componentDidUpdate() {

    }

    onChangeFilter (e) {
        console.log('Name:' + e.target.name);
        let productFilters = Helpers.filterProduct(e.target.name, this.state.searchTerm, this.state.products);
        this.setState({
            productsFilter: productFilters,
            filterType: e.target.name
        })
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
            let productFilters = Helpers.filterProduct(this.state.filterType, currentSearch, this.state.products);
            this.setState({
                productsFilter: productFilters,
                searchTerm: currentSearch
            })
        },500);
    }
    renderFilterBar() {
        return (
            <Row>
            <div className="product-filter">
                <Col xs={0} sm={0} md={0} lg={24} xl={16} xxl={16}>
                    <span className="filter-option">Sắp Xếp:</span>
                    <Button type={this.state.filterType=="popular" ? "danger" : "dashed"} size="large" className="filter-option" 
                            name="popular" onClick={this.onChangeFilter}>
                        Bán Chạy
                    </Button>
                    <Button type={this.state.filterType=="new" ? "danger" : "dashed"} size="large" className="filter-option"
                            name="new" onClick={this.onChangeFilter}>
                        Hàng Mới
                    </Button>
                    <Button type={this.state.filterType=="discount" ? "danger" : "dashed"} size="large" className="filter-option"
                            name="discount" onClick={this.onChangeFilter}>
                        Giảm Giá
                    </Button>
                    <Button type={this.state.filterType=="lowprice" ? "danger" : "dashed"} size="large" className="filter-option"
                            name="lowprice" onClick={this.onChangeFilter}>
                        Giá Thấp
                    </Button>
                    <Button type={this.state.filterType=="highprice" ? "danger" : "dashed"} size="large" className="filter-option"
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
        let producView = [];
        let infoView = "";
        if (this.state.productsFilter.length > 0) {
            this.state.productsFilter.forEach( (element, index) => {
                //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
                producView.push(
                    <Col xs={12} sm={12} md={8} lg={6} xl={5} xxl={5} key={element.id}>
                        <ProductWrapper product={element}/>
                    </Col>)

                if (index == 0) {
                    infoView = (
                        <Card>
                            <span>{"Thương Hiệu: " + element.brands.name}</span>
                            <br/>
                            <span>{"Số Sản Phẩm: " + this.state.productsFilter.length}</span>
                            <br/>
                            <span>{element.brands.brandDiscounts.length > 0 ? 
                                "Khuyến Mại:" : ""}</span>
                            <ul>
                            {element.brands.brandDiscounts.map(element => {
                                return (
                                    <li>{element.desc}</li>
                                )
                            })}
                            </ul>
                        </Card>
                    )
                }
            });

        }
        return (
            <React.Fragment>
                <Row>
                    {infoView}
                </Row>
                <br/>
                {this.renderFilterBar()}
                <Row type="flex">
                {producView}
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

});
const mapActionsToProps = {

};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(BrandPage));
