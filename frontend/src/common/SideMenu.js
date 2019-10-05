import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon, Input, Button } from 'antd';
import { Row, Col } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Card } from 'antd';
import { Checkbox, Slider, InputNumber, Radio, Tooltip } from 'antd';
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
        this.onSubmitPriceRange = this.onSubmitPriceRange.bind(this);
        this.clearPriceRange = this.clearPriceRange.bind(this);
        this.clearBrandQuery = this.clearBrandQuery.bind(this);
        this.clearBrandCountryQuery = this.clearBrandCountryQuery.bind(this);
        this.clearAttributeQuery = this.clearAttributeQuery.bind(this);
        this.onChangeCategoryQuery = this.onChangeCategoryQuery.bind(this);
        this.clearCategoryQuery =  this.clearCategoryQuery.bind(this);
        this.state = {
            curPriceName: -1,
            curPriceFrom: 0,
            curPriceTo: 1000000000,
            curPriceSliderFrom: 0,
            curPriceSliderTo: 0
        }
    }

    componentDidMount() {
        console.log("  >>DID MOUNT SideMenu")
        if (this.props.category && this.props.category.categories.length <= 0 ) {
            console.log("    >>>> actCategoryGet")
            this.props.actCategoryGet();
        }
    }
    componentDidUpdate() {
        if (this.props.category && this.props.category.categories.length <= 0 ) {
            console.log("  >>DID UPDATE SideMenu")
            console.log("    >>>> actCategoryGet")
            this.props.actCategoryGet();
        }
    }

    onSideMenuItemClick (item) {
        console.log("onSideMenuItemClick:")
        console.log(item)
    }
    onChangeCategoryQuery(e) { // FOr Type 2 of Category (Checkbox)
        console.log("CategoryId:" + e.target.name + ":" + e.target.checked);
        this.props.actQuerySetCategory(this.props.query, e.target.name, e.target.checked)
    }
    clearCategoryQuery() {
        // name -1 mean Clear
        if (this.props.query.categories.length > 0) {
            this.props.actQuerySetCategory(this.props.query, -1, false)
        }
    }

    // "BanhKeo":{
  //       "id": 1,
  //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
  //     },
    renderSelectCategory() {
        // Type 1 of Category (Query Whole Category)
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
                                                        <Link to={"/category/" + element.id + "/1"}>
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
                                                <Link to={"/category/" + curMenuLvl.id + "/2"}>
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
                                    <Link to={"/category/" + curItem.id + "/3"}>
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
        } else if (this.props.product.categoryQuery) {
            // Use content self from Query (Search, ...)
            const content = [];
            for (var prop in this.props.product.categoryQuery) {
                if (Object.prototype.hasOwnProperty.call(this.props.product.categoryQuery, prop)) {
                    content.push(
                        <React.Fragment key={this.props.product.categoryQuery[""+prop].value.id + 1000}>
                        <Checkbox
                            key={this.props.product.categoryQuery[""+prop].value.id}
                            name={""+this.props.product.categoryQuery[""+prop].value.id}
                            onChange={this.onChangeCategoryQuery}
                            checked={(this.props.query.categories.length > 0 && 
                                this.props.query.categories.indexOf(
                                    (""+this.props.product.categoryQuery[""+prop].value.id)) >= 0)}
                        >
                            {this.props.product.categoryQuery[""+prop].value.name + 
                                "(" + this.props.product.categoryQuery[""+prop].count + ")"}
                        </Checkbox>
                        <br />
                        </React.Fragment>
                    )   
                }
            }
            return (
                <Card size="small" title="Danh Muc San Pham" style={{marginTop: "10px"}}
                extra={<Tooltip title="Xoá Lọc"><Button shape="circle" type="primary"  size="small" onClick={this.clearCategoryQuery}>
                    <Icon type="undo" style={{fontSize:"20px", color:"white"}}/>
                </Button></Tooltip>}>
                    {content}
                </Card>
            )
        }
    }


    onChangeBrand(e) {
        console.log("BrandID:" + e.target.name + ":" + e.target.checked);
        this.props.actQuerySetBrand(this.props.query, e.target.name, e.target.checked)
    }
    clearBrandQuery() {
        // name -1 mean Clear
        if (this.props.query.brands.length > 0) {
            this.props.actQuerySetBrand(this.props.query, -1, false)
        }
    }
    // this.props.product.brandsQuery: {id1: {count:10, value:DBBrand}, id2:{}}
    renderBrand() {
        if (this.props.product.brandsQuery && 
                Object.keys(this.props.product.brandsQuery).length > 0) {
            const content = [];
            for (var prop in this.props.product.brandsQuery) {
                if (Object.prototype.hasOwnProperty.call(this.props.product.brandsQuery, prop)) {
                    content.push(
                        <React.Fragment key={this.props.product.brandsQuery[""+prop].value.id + 1000}>
                        <Checkbox
                            key={this.props.product.brandsQuery[""+prop].value.id}
                            name={""+this.props.product.brandsQuery[""+prop].value.id}
                            onChange={this.onChangeBrand}
                            checked={(this.props.query.brands.length > 0 && 
                                this.props.query.brands.indexOf(
                                    (""+this.props.product.brandsQuery[""+prop].value.id)) >= 0)}
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
                <Card size="small" title="Thuong Hieu" style={{marginTop: "10px"}}
                extra={<Tooltip title="Xoá Lọc"><Button shape="circle" type="primary"  size="small" onClick={this.clearBrandQuery}>
                    <Icon type="undo" style={{fontSize:"20px", color:"white"}}/>
                </Button></Tooltip>}>
                    {content}
                </Card>
            )
        }
    }

    onChangeBrandCountry(e) {
        console.log("BrandCountryID:" + e.target.name + ":" + e.target.checked);
        this.props.actQuerySetBrandCountry(this.props.query, e.target.name, e.target.checked)
    }
    clearBrandCountryQuery() {
        if (this.props.query.brandCountries.length > 0) {
            this.props.actQuerySetBrandCountry(this.props.query,  -1, false)
        }
    }
    renderBrandCountry() {
        // Only display if > 1 value
        if (this.props.product.brandCountriesQuery && 
                Object.keys(this.props.product.brandCountriesQuery).length > 0) {
            const content = [];
            for (var prop in this.props.product.brandCountriesQuery) {
                if (Object.prototype.hasOwnProperty.call(this.props.product.brandCountriesQuery, prop)) {
                    content.push(
                        <React.Fragment key={this.props.product.brandCountriesQuery[""+prop].value.id + 1000}>
                        <Checkbox
                            key={this.props.product.brandCountriesQuery[""+prop].value.id}
                            name={""+this.props.product.brandCountriesQuery[""+prop].value.id}
                            onChange={this.onChangeBrandCountry}
                            checked={(this.props.query.brandCountries.length > 0 && 
                                this.props.query.brandCountries.indexOf(
                                    (""+this.props.product.brandCountriesQuery[""+prop].value.id)) >= 0)}
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
                <Card size="small" title="Xuat Xu Thuong Hieu" style={{marginTop: "10px"}}
                extra={<Tooltip title="Xoá Lọc"><Button shape="circle" type="primary"  size="small" onClick={this.clearBrandCountryQuery}>
                    <Icon type="undo" style={{fontSize:"20px", color:"white"}}/>
                </Button></Tooltip>}>
                    {content}
                </Card>
            )
        }
    }


    onSubmitPriceRange() {
        console.log("onSubmitPriceRange......")
        //curPriceName=-1 mean is using Slider
        console.log(this.state)
        let from = 0;
        let to = 0;
        if (this.state.curPriceName >= 0) {
            // using value from radio
            from = this.state.curPriceFrom;
            to = this.state.curPriceTo;
        } else {
            from = this.state.curPriceSliderFrom;
            to = this.state.curPriceSliderTo;
        }
        if (to >= from && to > 0) {
            // ONly query when To > From
            this.props.actQueryChangePriceRange(this.props.query, from, to)
        }
        
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
                    if (item.to >= item.from && item.to > 0) {
                        // ONly query when To > From
                        this.props.actQueryChangePriceRange(this.props.query, item.from, item.to)
                    }
                }
            })
        }
        
    }
    onChangePriceRangeSliderFrom(value) {
        this.setState({
            curPriceSliderFrom: value,
            curPriceName: -1,
            curPriceFrom: 0,
            curPriceTo: 1000000000,
        })
    }
    onChangePriceRangeSliderTo(value) {
        this.setState({
            curPriceSliderTo: value,
            curPriceName: -1,
            curPriceFrom: 0,
            curPriceTo: 1000000000,
        })
    }
    clearPriceRange() {
        this.setState({
            curPriceName: -1,
            curPriceFrom: 0,
            curPriceTo: 1000000000,
            curPriceSliderFrom: 0,
            curPriceSliderTo: 0
        })
        this.props.actQueryChangePriceRange(this.props.query, 0, 0)
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
                    <Radio value={item.name} key={index}>
                        {item.from + "-" + item.to}
                    </Radio>
                )
            })
            sliderFromStep = Math.floor((sliderFromMax - sliderFromMin) / 20);
            sliderToStep = Math.floor((sliderToMax - sliderToMin) / 20);
        }
        return (
            <Card size="small" title="Gia" style={{marginTop: "10px"}} 
            extra={<Tooltip title="Xoá Lọc"><Button shape="circle" type="primary"  size="small" onClick={this.clearPriceRange}>
                    <Icon type="undo" style={{fontSize:"20px", color:"white"}}/>
            </Button></Tooltip>}>
                <Radio.Group onChange={this.onChangePriceRangeRadio} value={this.state.curPriceName}>
                    {radioViews}
                </Radio.Group>
                <br />
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
    clearAttributeQuery(name) {
        var attributes = this.props.product.attributesQuery[""+name].attributes;
        var attIds = attributes.map (element => {
            return element.id;
        });
        // target.name = -1 mean clear all the arrays in third parameter
        if (attIds && attIds.length > 0) {
            this.props.actQuerySetAttribute(this.props.query, -1, attIds)
        }
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

                    // Only display if more than 1 attribute values
                    if (attributes && attributes.length > 0) {
                    //if (attributes && attributes.length > 1) {
                        attributes.forEach(attribute => {
                            subValue.push(
                                <React.Fragment key={attribute.id+1000}>
                                <Checkbox
                                    key={attribute.id}
                                    name={""+attribute.id}
                                    onChange={this.onChangeAttribute}
                                    checked={(this.props.query.attributes.length > 0 && 
                                        this.props.query.attributes.indexOf((""+attribute.id)) >= 0)}
                                >
                                    {attribute.name+"(" + attribute.count + ")"}
                                </Checkbox>
                                <br />
                                </React.Fragment>
                            )
                        })
                        content.push(
                            <Card size="small" title={prop} style={{marginTop: "10px"}} key={prop}
                            extra={<Tooltip title="Xoá Lọc"><Button shape="circle" type="primary"  size="small" key={prop}
                            onClick={this.clearAttributeQuery.bind(this, prop)}>
                                <Icon type="undo" style={{fontSize:"20px", color:"white"}}/>
                            </Button></Tooltip>}>
                                {subValue}
                            </Card>
                        )
                    }
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

export default withRouter(SideMenu);