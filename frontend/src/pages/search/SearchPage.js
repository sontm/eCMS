import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SideMenu from '../../common/SideMenu';
import Backend from '../../util/Backend'
import ProductWrapper from '../category/ProductWrapper'
import './SearchPage.css';

import Helpers from '../../util/Helpers'
import { Row, Col, Radio, Button, Icon, Input, Select, Card } from 'antd';
const queryString = require('query-string');
const { Search } = Input;
const { Option } = Select;

// This Class using State to Display, not Redux
class SearchPage extends Component {
    constructor(props) {
        super(props)

        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onSearchFilter = this.onSearchFilter.bind(this);
        this.state = {
            products: [],
            productsFilter: [],
            product: {
                categoryQuery:{},
                brandsQuery:{},
                brandCountriesQuery:{},
                attributesQuery:{},
                priceRangeQuery:[]
            },
            query: { // Current Query which user select on sidemenu
                category:{}, // {id, level} TODO
                categories:[], // list of ID
                brands:[], // list of brand ID, if empty mean All
                brandCountries:[], // list of ID
                attributes:[], // list of ID,
                priceRange:{}, // {from: m to:};
                filter: {filterType: "popular", searchTerm: ""}
            }
        }

        this.actQuerySetBrand = this.actQuerySetBrand.bind(this);
        this.actQuerySetAttribute = this.actQuerySetAttribute.bind(this);
        this.actQuerySetBrandCountry = this.actQuerySetBrandCountry.bind(this);
        this.actQueryChangePriceRange = this.actQueryChangePriceRange.bind(this);
        this.actQuerySetCategory = this.actQuerySetCategory.bind(this);

        // Class Variale
        //shouldReExtract products
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
        Backend.searchProduct(this.props.match.params.keyword, 
            response => {
                console.log("searchProduct Done:" + this.props.match.params.keyword)
                console.log(response.data)
                let {categoryQuery, brandsQuery,brandCountriesQuery,
                    attributesQuery,priceRangeQuery} = Helpers.extractInfoFromProductList(response.data);
                this.setState({
                    products: response.data,
                    productsFilter: response.data,
                    product: {
                        categoryQuery:categoryQuery,
                        brandsQuery:brandsQuery,
                        brandCountriesQuery:brandCountriesQuery,
                        attributesQuery:attributesQuery,
                        priceRangeQuery:priceRangeQuery}
                })
            },
            error => {
                console.log("searchProduct error")
            }); 
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.keyword != nextProps.match.params.keyword) {
            Backend.searchProduct(nextProps.match.params.keyword, 
                response => {
                    console.log("searchProduct Done:" + this.props.match.params.keyword)
                    console.log(response.data)
                    let {categoryQuery, brandsQuery,brandCountriesQuery,
                        attributesQuery,priceRangeQuery} = Helpers.extractInfoFromProductList(response.data);
                    this.setState({
                        products: response.data,
                        productsFilter: response.data,
                        product: {
                            categoryQuery:categoryQuery,
                            brandsQuery:brandsQuery,
                            brandCountriesQuery:brandCountriesQuery,
                            attributesQuery:attributesQuery,
                            priceRangeQuery:priceRangeQuery}
                    })
                },
                error => {
                    console.log("searchProduct error")
                }); 
        }
    }
    
    onChangeFilter (e) {
        console.log('Name:' + e.target.name);
        let productFilters = Helpers.filterProduct(e.target.name, 
            this.state.query.filter.searchTerm, 
            this.state.products, this.state.query);
        this.setState({
            query:{
                ...this.state.query,
                filter: {
                    filterType: e.target.name,
                    searchTerm: this.state.query.filter.searchTerm
                }
            },
            productsFilter: productFilters
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
            let productFilters = Helpers.filterProduct(this.state.query.filter.filterType, currentSearch, 
                this.state.products, this.state.query);
            this.setState({
                query:{
                    ...this.state.query,
                    filter: {
                        filterType: this.state.query.filter.filterType,
                        searchTerm: currentSearch
                    }
                },
                productsFilter: productFilters
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
                            <span>{"Kết quả tìm kiếm cho '" + this.props.match.params.keyword + "'"}</span>
                            <br/>
                            <span>{this.state.productsFilter.length + " kết quả"}</span>
                            <br/>
                        </Card>
                    )
                }
            });

        }
        return (
            <React.Fragment>
                <Row>
                    <Col xs={0} sm={0} md={6} lg={5} xl={4} xxl={4}>
                    <SideMenu product={this.state.product} query={this.state.query}
                        actQuerySetCategory={this.actQuerySetCategory}
                        actQuerySetBrand={this.actQuerySetBrand}
                        actQuerySetAttribute={this.actQuerySetAttribute}
                        actQuerySetBrandCountry={this.actQuerySetBrandCountry}
                        actQueryChangePriceRange={this.actQueryChangePriceRange}
                    />
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={19} xl={20} xxl={20}>
                        <Row>
                            {infoView}
                        </Row>
                        <br/>
                        {this.renderFilterBar()}
                        <Row type="flex">
                            {producView}
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
    actQueryChangePriceRange(prevQueryProps, from, to) {
        console.log("LOCAL actQueryChangePriceRange:" + from + "->" + to)
        let newQuery = {
            ...this.state.query,
            priceRange: {from: from, to:to}
        }

        let productFilters = Helpers.filterProduct(this.state.query.filter.filterType, 
            this.state.query.filter.searchTerm, 
            this.state.products, newQuery);
        this.setState({
            query:newQuery,
            productsFilter: productFilters
        })
    }
    
    // id -1 mean Clear
    actQuerySetCategory(prevQueryProps, id, isCheck) {
        console.log("LOCAL actQuerySetCategory:")
        let newCate = [...this.state.query.categories];
    
        if (id == -1) {
            newCate = [];
        } else if (isCheck) {
            // Include Cate
            if (newCate.indexOf(id) <= -1) {
                newCate.push(id);
            }
        } else {
            // Exclude Cate
            if (newCate.indexOf(id) > -1) {
                newCate.splice(newCate.indexOf(id), 1);
            }
        }
        let newQuery = {
            ...this.state.query,
            categories: newCate
        }
        let productFilters = Helpers.filterProduct(this.state.query.filter.filterType, 
            this.state.query.filter.searchTerm, 
            this.state.products, newQuery);
        this.setState({
            query: newQuery,
            productsFilter:productFilters
        })
    }

    // id -1 mean Clear
    actQuerySetBrand(prevQueryProps, id, isCheck) {
        console.log("LOCAL actQuerySetBrand:")
        let newBrands = [...this.state.query.brands];
    
        if (id == -1) {
            newBrands = [];
        } else if (isCheck) {
            // Include Brand
            if (newBrands.indexOf(id) <= -1) {
                newBrands.push(id);
            }
        } else {
            // Exclude Brand
            if (newBrands.indexOf(id) > -1) {
                newBrands.splice(newBrands.indexOf(id), 1);
            }
        }
        let newQuery = {
            ...this.state.query,
            brands: newBrands
        }
        let productFilters = Helpers.filterProduct(this.state.query.filter.filterType, 
            this.state.query.filter.searchTerm, 
            this.state.products, newQuery);
        this.setState({
            query: newQuery,
            productsFilter:productFilters
        })
    }
    
    // id = -1 mean isCHeck is array of ID, need to remove all
    actQuerySetAttribute(prevQueryProps, id, isCheck) {
        console.log("LOCAL actQuerySetAttribute:")
        let newAttributes = [...this.state.query.attributes];
    
        if (id == -1) {
            isCheck.forEach(id => {
                if (newAttributes.indexOf(""+id) > -1) {
                    newAttributes.splice(newAttributes.indexOf(""+id), 1);
                }
            })
        } else if (isCheck) {
            // Include
            if (newAttributes.indexOf(id) <= -1) {
                newAttributes.push(id);
            }
        } else {
            // Exclude
            if (newAttributes.indexOf(id) > -1) {
                newAttributes.splice(newAttributes.indexOf(id), 1);
            }
        }
        let newQuery = {
            ...this.state.query,
            attributes: newAttributes
        }
        let productFilters = Helpers.filterProduct(this.state.query.filter.filterType, 
            this.state.query.filter.searchTerm, 
            this.state.products, newQuery);

        this.setState({
            query:newQuery,
            productsFilter:productFilters
        })
    }
    
    // id -1 mean clear
    actQuerySetBrandCountry(prevQueryProps, id, isCheck) {
        console.log("Local actQuerySetBrandCountry:")
        let newBrandCountriess = [...this.state.query.brandCountries];
    
        if (id == -1) {
            newBrandCountriess = [];
        } else if (isCheck) {
            // Include Brand
            if (newBrandCountriess.indexOf(id) <= -1) {
                newBrandCountriess.push(id);
            }
        } else {
            // Exclude Brand
            if (newBrandCountriess.indexOf(id) > -1) {
                newBrandCountriess.splice(newBrandCountriess.indexOf(id), 1);
            }
        }
        let newQuery = {
            ...this.state.query,
            brandCountries: newBrandCountriess
        }
        let productFilters = Helpers.filterProduct(this.state.query.filter.filterType, 
            this.state.query.filter.searchTerm, 
            this.state.products, newQuery);
        this.setState({
            query: newQuery,
            productsFilter:productFilters
        })
    }
}

const mapStateToProps = (state) => ({

});
const mapActionsToProps = {

};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(SearchPage));
