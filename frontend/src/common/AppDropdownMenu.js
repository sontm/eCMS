import React, { Component } from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppDropdownMenu.css';
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
import { Row, Col, Button,Badge } from 'antd';

// "BanhKeo":{
//       "id": 1,
//       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
//     },
// "BanhKeo":{
//       "id": 1,
//       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
//     },
export default class AppDropdownMenu extends Component {
    constructor(props) {
        super(props); 

        this.onClickParentMenuItem = this.onClickParentMenuItem.bind(this)
    }

    onClickParentMenuItem(e) {
        // To prevent User click through
        e.preventDefault()

        // Disappear the Popout
        this.props.onParentMenuClick()
    }
    render = () => {
        let {config} = this.props;
        let parentMenus = [];
        for (var prop in config) {
          if (Object.prototype.hasOwnProperty.call(config, prop)) {
            // do stuff
            parentMenus.push(
                <li onMouseOver={this.props.onParentMenuHover} onMouseLeave={this.props.onParentMenuOut}
                    onClick={this.onClickParentMenuItem}
                  className={this.props.hoveredParent == prop ? "parent-menu-li-hovering" : ""}>
                  <Link to={"/category/" + config["" +prop].id + "?lvl=3"}>
                    {prop}
                    <div className="right-arrow"></div>
                  </Link>
                </li>)
          }
        }
        let allCols = [];
        let curSubmenuItems = config["" + this.props.hoveredParent];
        if (curSubmenuItems) {
          for (var propSub in curSubmenuItems) {
            // One Sub menu. i.e Banh
            if (propSub != "id") {
              let subMenus = [];
              if (Object.prototype.hasOwnProperty.call(curSubmenuItems, propSub)) {
                // {id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]}
                let subItems = curSubmenuItems[propSub]
                if (subItems && subItems.subs && subItems.subs.length > 0) {
                  subItems.subs.forEach((item, idx) => {
                    // Each Childrent Sub Menus
                    subMenus.push(
                      <li key={item.id} onClick={this.onClickParentMenuItem}>
                      <Link to={"/category/" + item.id + "?lvl=1"}>
                        {item.name}
                      </Link>
                      </li>           
                    )
                  });
                }
                allCols.push (<Col span={6}>
                  <span style={{fontWeight:"bold"}}>
                  <div onClick={this.onClickParentMenuItem}>
                    <Link to={"/category/" + curSubmenuItems["" +propSub].id + "?lvl=2"}>
                    {propSub}
                    </Link>
                  </div>
                  </span>
                  <ul className="sub-menu">
                  {subMenus}
                  </ul>
                </Col>);
              }
            }
          }
        }
        return (
          <React.Fragment>
            
            <Row className={this.props.hoveredMenuList ? "flyout-container-display" : "flyout-container-hidden"}
              onMouseLeave={this.props.onMenuContainerOut}>
              <Col span={4} className="parent-menu-container-left">
                <ul className="parent-menu">
                  {parentMenus}
                </ul>
              </Col>
    
              <Col span={20} className={this.props.hoveredParent != "" ? "parent-menu-container-right" 
                  : "parent-menu-container-right-hidden"} ><Row>
                {allCols}
              </Row></Col>
            </Row>
          </React.Fragment>);
    }
}