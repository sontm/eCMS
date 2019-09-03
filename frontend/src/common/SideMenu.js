import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { actCategoryGet } from '../redux/actions/CategoryActions';
import { Card } from 'antd';

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

    renderSelectCategory() {
        if (this.props.category && this.props.category.categories) {
            const subMenus = [];
            this.props.category.categories.forEach((item, idx) => {
                subMenus.push(
                    <Menu.Item key={item.id}>
                        {item.name}
                    </Menu.Item>)            
                });
            return (
            <Menu
                    onClick={this.handleClick}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <Icon type="appstore" />
                        <span>San Pham</span>
                        </span>
                    }>
                        {subMenus}
                    </SubMenu>

                </Menu>
            );
        }
    }
    renderBrand() {
        return (
            <Card size="small" title="Thuong Hieu" style={{marginTop: "10px"}}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        )
    }
    renderBrandCountry() {
        return (
            <Card size="small" title="Xuat Xu Thuong Hieu" style={{marginTop: "10px"}}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        )
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
    category: state.category
});
const mapActionsToProps = {
    actCategoryGet
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(SideMenu));