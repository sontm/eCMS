import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { actCategoryGet } from '../redux/actions/CategoryActions';
import { Card } from 'antd';
import { Checkbox } from 'antd';

const { Search } = Input;
const Sider = Layout.Sider;
const {SubMenu} = Menu;

class SideMenu extends Component {
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

    // "BanhKeo":{
  //       "id": 1,
  //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
  //     },
    renderSelectCategory() {
        if (this.props.category && this.props.category.categoriesLevel) {
            
            const curID = 6;
            let menuToDisplay = {};
            // First, find which part current Category is in
            // prop is "BanhKeo"
            for (var prop in this.props.category.categoriesLevel) {
                if (Object.prototype.hasOwnProperty.call(this.props.category.categoriesLevel, prop)) {
                    // do stuff
                    let curMenu = this.props.category.categoriesLevel["" +prop];
                    if (curMenu.id == curID) {
                        // This is First Menu
                        menuToDisplay[""+prop] = curMenu;
                    } else {
                        for (var propSub in curMenu) {
                            if (Object.prototype.hasOwnProperty.call(curMenu, propSub)) {
                                if (propSub != "id") {
                                    let curSubMenu = curMenu[""+propSub];
                                    if (curSubMenu.id == curID) {
                                        // This is Second Menu
                                        menuToDisplay[""+prop] = curMenu;
                                    } else {
                                        // Search in all THird Menu
                                        if (curSubMenu.subs && curSubMenu.subs.length > 0) {
                                            curSubMenu.subs.forEach(element => {
                                                if (element.id == curID) {
                                                    // THis is Third Menu
                                                    menuToDisplay[""+prop] = curMenu;
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

            // "BanhKeo":{
            //       "id": 1,
            //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
            //     },
            const subMenusFirst = [];
            const subMenusSecond = [];
            console.log("hihihiiiiiiiiiiiiii")
            console.log(menuToDisplay)
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
                                                    <Menu.Item key={element.id}>
                                                        {element.name}
                                                    </Menu.Item>
                                                );
                                            });
                                        }
                                        subMenusSecond.push(
                                            <SubMenu
                                            key={curItem.id}
                                            title={propD2}>
                                                {subMenuItems}
                                            </SubMenu>
                                        );
                                    }
                                }
                            }

                            subMenusFirst.push(
                                <SubMenu
                                key={curItem.id}
                                title={propD}>
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
            return (
            <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    {subMenusFirst}

                </Menu>
            );
        }
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
    renderBrandCountry() {
        if (this.props.product.brandCountriesQuery) {
            const content = [];
            for (var prop in this.props.product.brandCountriesQuery) {
                if (Object.prototype.hasOwnProperty.call(this.props.product.brandCountriesQuery, prop)) {
                    content.push(
                        <React.Fragment>
                        <Checkbox
    
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
    renderPriceRange() {
        return (
            <Card size="small" title="Gia" style={{marginTop: "10px"}}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        )
    }
    render() {
        console.log(this.props.category)
        return (
            <React.Fragment>
            {this.renderSelectCategory()}
            {this.renderBrand()}
            {this.renderBrandCountry()}
            {this.renderPriceRange()}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    category: state.category,
    product: state.product
});
const mapActionsToProps = {
    actCategoryGet
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(SideMenu));