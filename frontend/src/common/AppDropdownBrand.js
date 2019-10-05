import React, { Component } from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppDropdownBrand.css';
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
import { Row, Col, Button,Badge } from 'antd';

// brands: [{
//     id, name, imgUrl
// }]
export default class AppDropdownBrand extends Component {
    constructor(props) {
        super(props); 

        this.onClickBrandMenuItem = this.onClickBrandMenuItem.bind(this)
    }

    onClickBrandMenuItem(e) {
        // To prevent User click through
        e.preventDefault()

        // Disappear the Popout
        this.props.onBrandMenuClick()
    }


    // Array of sub-array. Each sub-array is a column on Menu
    // brands: [
    //  [{
    //     id, name, imgUrl
    //  }]
    //]
    render = () => {
      // If homepage, this.props.location.pathname is "/"
        let {brands} = this.props;
        let allCols = [];
        if (brands && brands.length > 0) {
            brands.forEach((subBrands,idx) => {
                if (subBrands.length > 0) {
                    let subMenus = [];
                    subBrands.forEach(item => {
                        subMenus.push(
                            <li key={item.id} onClick={this.onClickBrandMenuItem}>
                                <Link to={"/brand/" + item.id}>
                                {item.name}
                                </Link>
                            </li>           
                          )
                    })
                    allCols.push (
                    <Col span={6} key={idx}>
                        <ul className="sub-menu-brand">
                        {subMenus}
                        </ul>
                    </Col>);
                }
            })
        }
        return (
          <React.Fragment>
            
            <Row className={this.props.hoveredBrandMenu ? "flyout-container-display-brand" : 
                "flyout-container-hidden-brand"}
                    onMouseOver={this.props.onBrandContainerHover} 
                    onMouseLeave={this.props.onBrandContainerOut}>
              <Col span={4}>
              </Col>
              <Col span={20} className={this.props.hoveredParent != "" ? "brand-menu-container-right" 
                  : "brand-menu-container-right-hidden"}>
                <Row>
                    {allCols}
                </Row>
              </Col>
            </Row>
          </React.Fragment>);
    }
}
