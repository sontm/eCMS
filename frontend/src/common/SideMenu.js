import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { actCategoryGet } from '../redux/CategoryActions';
import {actQuerySetBrand, actQuerySetAttribute, actQuerySetBrandCountry} from '../redux/ProductQueryReducer'

import { Card } from 'antd';
import { Checkbox, Slider, InputNumber, Radio } from 'antd';
import './SideMenu.css'

const { Search } = Input;
const Sider = Layout.Sider;
const {SubMenu} = Menu;

class SideMenu extends Component {
    constructor(props) {
        super(props);

        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeBrandCountry = this.onChangeBrandCountry.bind(this);
        this.onChangeAttribute = this.onChangeAttribute.bind(this);
        this.onChangePriceRangeRadio = this.onChangePriceRangeRadio.bind(this);
        this.onChangePriceRangeSliderFrom = this.onChangePriceRangeSliderFrom.bind(this);
        this.onChangePriceRangeSliderTo = this.onChangePriceRangeSliderTo.bind(this);
        this.onSubmitPriceRange = this.onSubmitPriceRange.bind(this)

        this.state = {
            curPriceName: 0,
            curPriceFrom: 0,
            curPriceTo: 1000000000,
            curPriceSliderFrom: 0,
            curPriceSliderTo: 0
        }
    }
    

    componentDidMount() {
        console.log("  >>DID MOUNT SideMenu")
        if (this.props.category.categories.length <= 0 ) {
            console.log("    >>>> actCategoryGet")
            this.props.actCategoryGet();
        }
    }
    componentDidUpdate() {
        if (this.props.category.categories.length <= 0 ) {
            console.log("  >>DID UPDATE SideMenu")
            console.log("    >>>> actCategoryGet")
            this.props.actCategoryGet();
        }
    }

    onSideMenuItemClick (item) {
        console.log("onSideMenuItemClick:")
        console.log(item)
    }
    // "BanhKeo":{
  //       "id": 1,
  //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
  //     },
    renderSelectCategory() {
        if (this.props.category && this.props.category.categoriesLevel) {
            
            const curID = this.props.query.category.id;
            const selectedKeys = [];
            const openKeys = [];
            selectedKeys.push("" + curID)

            // From Whole Menu, here only Choose the Correct Category to Select, CANBE CUSTOMIZE
            let menuToDisplay = {};
            // First, find which part current Category is in
            // prop is "BanhKeo"
            for (var prop in this.props.category.categoriesLevel) {
                if (Object.prototype.hasOwnProperty.call(this.props.category.categoriesLevel, prop)) {
                    // curMenu is First High Level Menu
                    let curMenu = this.props.category.categoriesLevel["" +prop];
                    if (curMenu.id == curID) {
                        // Selected Category is is First Menu
                        menuToDisplay[""+prop] = curMenu;
                        openKeys.push("" + curMenu.id);
                    } else {
                        for (var propSub in curMenu) {
                            if (Object.prototype.hasOwnProperty.call(curMenu, propSub)) {
                                if (propSub != "id") {
                                    let curSubMenu = curMenu[""+propSub];
                                    if (curSubMenu.id == curID) {
                                        // Selected Category is Second Menu
                                        menuToDisplay[""+prop] = curMenu;
                                        openKeys.push("" + curMenu.id);
                                        openKeys.push("" + curSubMenu.id);
                                    } else {
                                        // Search in all THird Menu
                                        if (curSubMenu.subs && curSubMenu.subs.length > 0) {
                                            curSubMenu.subs.forEach(element => {
                                                if (element.id == curID) {
                                                    // THis is Third Menu
                                                    menuToDisplay[""+prop] = curMenu;
                                                    openKeys.push("" + curMenu.id);
                                                    openKeys.push("" + curSubMenu.id);
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // menuToDisplay
            // "BanhKeo":{
            //       "id": 1,
            //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
            //     },

            // --------CUSTOMIZE: COmment this to Display WHOLE LEVEL
            menuToDisplay = this.props.category.categoriesLevel;
            const subMenusFirst = [];
            if (menuToDisplay) {
                // propD is "BanhKeo"
                for (var propD in menuToDisplay) {
                    if (Object.prototype.hasOwnProperty.call(menuToDisplay, propD)) {
                        if (propD != "id") {
                            // curItem is
                            //{
                            //       "id": 1,
                            //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
                            //     },
                            //
                            const subMenusSecond = [];
                            let curItem = menuToDisplay[""+propD]
                            for (var propD2 in curItem) {
                                if (Object.prototype.hasOwnProperty.call(curItem, propD2)) {
                                    if (propD2 != "id") {
                                        const subMenuItems = [];
                                        // curMenuLvl is {id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
                                        let curMenuLvl = curItem[""+propD2];
                                        if (curMenuLvl.subs && curMenuLvl.subs.length > 0) {
                                            curMenuLvl.subs.forEach(element => {
                                                subMenuItems.push(
                                                    <Menu.Item key={element.id} 
                                                    className={element.id==curID ? "sidemenu-cate-selected" : ""}>
                                                        <Link to={"/category/" + element.id + "?lvl=1"}>
                                                        {element.name + "-" + element.id}
                                                        </Link>
                                                    </Menu.Item>
                                                );
                                            });
                                        }
                                        subMenusSecond.push(
                                            <SubMenu
                                            key={curMenuLvl.id}
                                            className={curMenuLvl.id==curID ? "sidemenu-cate-selected" : ""}
                                            title={
                                                <Link to={"/category/" + curMenuLvl.id + "?lvl=2"}>
                                                {propD2 + "-" + curMenuLvl.id}
                                                </Link>
                                            }>
                                                {subMenuItems}
                                            </SubMenu>
                                        );
                                    }
                                }
                            }

                            subMenusFirst.push(
                                <SubMenu
                                key={curItem.id}
                                className={curItem.id==curID ? "sidemenu-cate-selected" : ""}
                                title={
                                    <Link to={"/category/" + curItem.id + "?lvl=3"}>
                                    {propD + "-" + curItem.id}
                                    </Link>
                                }>
                                {subMenusSecond}
                                </SubMenu>
                            );
                        }
                    }
                }

            }

            // this.props.category.categories.forEach((item, idx) => {
            //     subMenus.push(
            //         <Menu.Item key={item.id}>
            //             {item.name}
            //         </Menu.Item>)            
            //     });

            // TODO: Dont know why but set selectedKeys={["" + curID]} cannot OK
            // using defaultOpenKeys because if not, user cannot Open menu
            return (
                <div>
                    <div className="ant-card ant-card-small" style={{borderRight:"1px solid #e8e8e8"}}>
                    <div className="ant-card-head app-card-head">
                        <div className="ant-card-head-wrapper">
                            <div className="ant-card-head-title">
                            Danh Muc San Pham
                            </div>
                        </div>
                    </div>
                    </div>
                    <Menu
                        selectedKeys={selectedKeys}
                        openKeys={openKeys}
                        mode="inline"
                        inlineIndent={20}
                        onClick={this.onSideMenuItemClick}
                        style={{borderTop:"1px solid #e8e8e8", paddingTop:"0px"}}
                    >
                        {subMenusFirst}
                    </Menu>
                </div>
            );
        }
    }


    onChangeBrand(e) {
        console.log("BrandID:" + e.target.name + ":" + e.target.checked);
        this.props.actQuerySetBrand(this.props.query, e.target.name, e.target.checked)
    }
    // this.props.product.brandsQuery: {id1: {count:10, value:DBBrand}, id2:{}}
    renderBrand() {
        if (this.props.product.brandsQuery) {
            const content = [];
            for (var prop in this.props.product.brandsQuery) {
                if (Object.prototype.hasOwnProperty.call(this.props.product.brandsQuery, prop)) {
                    content.push(
                        <React.Fragment>
                        <Checkbox
                            key={this.props.product.brandsQuery[""+prop].value.id}
                            name={this.props.product.brandsQuery[""+prop].value.id}
                            onChange={this.onChangeBrand}
                        >
                            {this.props.product.brandsQuery[""+prop].value.name + 
                                "(" + this.props.product.brandsQuery[""+prop].count + ")"}
                        </Checkbox>
                        <br />
                        </React.Fragment>
                    )   
                }
            }
            return (
                <Card size="small" title="Thuong Hieu" style={{marginTop: "10px"}}>
                    {content}
                </Card>
            )
        }
    }

    onChangeBrandCountry(e) {
        console.log("BrandCountryID:" + e.target.name + ":" + e.target.checked);
        this.props.actQuerySetBrandCountry(this.props.query, e.target.name, e.target.checked)
    }
    renderBrandCountry() {
        if (this.props.product.brandCountriesQuery) {
            const content = [];
            for (var prop in this.props.product.brandCountriesQuery) {
                if (Object.prototype.hasOwnProperty.call(this.props.product.brandCountriesQuery, prop)) {
                    content.push(
                        <React.Fragment>
                        <Checkbox
                            key={this.props.product.brandCountriesQuery[""+prop].value.id}
                            name={this.props.product.brandCountriesQuery[""+prop].value.id}
                            onChange={this.onChangeBrandCountry}
                        >
                            {this.props.product.brandCountriesQuery[""+prop].value.name + 
                                "(" + this.props.product.brandCountriesQuery[""+prop].count + ")"}
                        </Checkbox>
                        <br />
                        </React.Fragment>
                    )   
                }
            }
            return (
                <Card size="small" title="Xuat Xu Thuong Hieu" style={{marginTop: "10px"}}>
                    {content}
                </Card>
            )
        }
    }


    onSubmitPriceRange() {
        console.log("onSubmitPriceRange......")
        console.log(this.state)
    }
    onChangePriceRangeRadio(e) {
        console.log("onChangePriceRangeRadio:" + e.target.value)

        // Found the name in propsPriceRangeQuery
        if (this.props.product.priceRangeQuery.length > 0) {
            this.props.product.priceRangeQuery.forEach(item => {
                if (item.name == e.target.value) {
                    this.setState({
                        curPriceName:e.target.value,
                        curPriceFrom: item.from,
                        curPriceTo: item.to,
                        curPriceSliderFrom: 0,
                        curPriceSliderTo: 0
                    })
                }
            })
        }
        
    }
    onChangePriceRangeSliderFrom(value) {
        this.setState({
            curPriceSliderFrom: value,
            curPriceName: 0,
            curPriceFrom: 0,
            curPriceTo: 1000000000,
        })
    }
    onChangePriceRangeSliderTo(value) {
        this.setState({
            curPriceSliderTo: value,
            curPriceName: 0,
            curPriceFrom: 0,
            curPriceTo: 1000000000,
        })
    }
    renderPriceRange() {
        let radioViews = [];
        let sliderFromMin = 0;
        let sliderFromMax = 10000000;
        let sliderToMin = 0;
        let sliderToMax = 10000000;
        // Whole Slider should have 20 Range Steps only
        let sliderFromStep = 10000; // Default Step is 10000
        let sliderToStep = 10000;
        if (this.props.product.priceRangeQuery.length > 0) {
            this.props.product.priceRangeQuery.forEach((item, index) => {
                if (index == 0) {
                    sliderFromMin = item.from;
                    sliderToMin = item.from;
                } else if(index == this.props.product.priceRangeQuery.length-1) {
                    sliderFromMax = item.to;
                    sliderToMax = item.to;
                }

                radioViews.push(
                    <Radio value={item.name}>
                        {item.from + "-" + item.to}
                    </Radio>
                )
            })
            sliderFromStep = Math.floor((sliderFromMax - sliderFromMin) / 20);
            sliderToStep = Math.floor((sliderToMax - sliderToMin) / 20);
        }
        return (
            <Card size="small" title="Gia" style={{marginTop: "10px"}}>
                <Radio.Group onChange={this.onChangePriceRangeRadio} value={this.state.curPriceName}>
                    {radioViews}
                </Radio.Group>
                <Row>
                    <Col span={8}>
                        <hr style={{marginTop: "12px"}}/>
                    </Col>
                    <Col span={8}>
                        <div style={{textAlign:"center"}}>
                        <span style={{display:"inline-block", fontWeight:"bold"}}>Hoặc</span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <hr style={{marginTop: "12px"}}/>
                    </Col>
                </Row>

                
                <Row>
                    <Col span={8}>
                        <span style={{display: "inline-block", verticalAlign: "middle"}}>
                        From (đ):
                        </span>
                    </Col>
                    <Col span={16}>
                        <InputNumber
                            min={sliderFromMin}
                            max={sliderFromMax}
                            step={sliderFromStep}
                            style={{ width: "100%"}}
                            value={this.state.curPriceSliderFrom}
                            onChange={this.onChangePriceRangeSliderFrom}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={16}>
                        <Slider
                            min={sliderFromMin}
                            max={sliderFromMax}
                            step={sliderFromStep}
                            onChange={this.onChangePriceRangeSliderFrom}
                            value={typeof this.state.curPriceSliderFrom === 'number' ? this.state.curPriceSliderFrom : 0}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                    </Col>
                    <Col span={18}>
                    <hr></hr>
                    </Col>
                </Row>
               
                <Row>
                    <Col span={8}>
                        <span style={{display: "inline-block", verticalAlign: "middle"}}>
                        To (đ):
                        </span>
                    </Col>
                    <Col span={16}>
                        <InputNumber
                            min={sliderToMin}
                            max={sliderToMax}
                            step={sliderToStep}
                            style={{ width: "100%"}}
                            value={this.state.curPriceSliderTo}
                            onChange={this.onChangePriceRangeSliderTo}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={16}>
                        <Slider
                            min={sliderToMin}
                            max={sliderToMax}
                            step={sliderToStep}
                            onChange={this.onChangePriceRangeSliderTo}
                            value={typeof this.state.curPriceSliderTo === 'number' ? this.state.curPriceSliderTo : 0}
                        />
                    </Col>
                </Row>
                <hr/>
                <div style={{textAlign:"center"}}>
                    <Button type="primary" onClick={this.onSubmitPriceRange}>Tìm Kiếm</Button>
                </div>
            </Card>
        )
    }

    onChangeAttribute(e) {
        console.log("AttributeID:" + e.target.name + ":" + e.target.checked);
        this.props.actQuerySetAttribute(this.props.query, e.target.name, e.target.checked)
    }
    // Input
    // {
    //     "MauSac": {
    //         "id": 1,
    //         attributes:[
    //             {name: Xanh, id:2, count: 5},
    //             {name: Do, id:3, count: 6}
    //         ]
    //     }
    // }
    renderAttributes() {
        if (this.props.product.attributesQuery) {
            let content = [];
            for (var prop in this.props.product.attributesQuery) {
                if (Object.prototype.hasOwnProperty.call(this.props.product.attributesQuery, prop)) {
                    var attributes = this.props.product.attributesQuery[""+prop].attributes;
                    let subValue = [];
                    if (attributes && attributes.length > 0) {
                        attributes.forEach(attribute => {
                            subValue.push(
                                <React.Fragment>
                                <Checkbox
                                    key={attribute.id}
                                    name={attribute.id}
                                    onChange={this.onChangeAttribute}
                                >
                                    {attribute.name+"(" + attribute.count + ")"}
                                </Checkbox>
                                <br />
                                </React.Fragment>
                            )
                        })
                    }
                    content.push(
                        <Card size="small" title={prop} style={{marginTop: "10px"}}>
                            {subValue}
                        </Card>
                    )
                }
            }
            return content;
        }
    }
    render() {
        return (
            <div className="app-side-menu">
            {this.renderSelectCategory()}
            {this.renderPriceRange()}
            {this.renderBrand()}
            {this.renderBrandCountry()}
            {this.renderAttributes()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    category: state.category,
    product: state.product,
    query: state.query
});
const mapActionsToProps = {
    actCategoryGet,
    actQuerySetBrand, actQuerySetAttribute, actQuerySetBrandCountry
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(SideMenu));