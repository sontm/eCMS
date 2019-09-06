import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { actCategoryGet } from '../redux/actions/CategoryActions';
import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon, Input } from 'antd';
import { Row, Col } from 'antd';
const { Search } = Input;
const Header = Layout.Header;
const {SubMenu} = Menu;

// "BanhKeo":{
  //       "id": 1,
  //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
  //     },
class DropdownMenu extends React.Component {
  constructor(props) {
    super(props); 
  }
  
  
  render = () => {
    let {config} = this.props;
    let parentMenus = [];
    for (var prop in config) {
      if (Object.prototype.hasOwnProperty.call(config, prop)) {
        // do stuff
        parentMenus.push(
            <li onMouseOver={this.props.onParentMenuHover} onMouseLeave={this.props.onParentMenuOut}
              className={this.props.hoveredParent == prop ? "parent-menu-li-hovering" : ""}>
              <Link to={"/category/" + config["" +prop].id + "?lvl=3"}>
                {prop}
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
                subMenus.push(
                  <li key={item.id}>
                  <Link to={"/category/" + item.id + "?lvl=1"}>
                    {item.name}
                  </Link>
                  </li>           
                )
              });
            }
            allCols.push (<Col span={6}>
              <span style={{fontWeight:"bold"}}>
                <Link to={"/category/" + curSubmenuItems["" +propSub].id + "?lvl=2"}>
                {propSub}
                </Link>
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

class AppHeader extends Component {
    constructor(props) {
        super(props); 
        this.state = {
          hoveredMenuList: false,
          hoveredParent: ""
        };
        this.onMenuListHover = this.onMenuListHover.bind(this);   
        this.onMenuListOut = this.onMenuListOut.bind(this);
        this.onParentMenuHover = this.onParentMenuHover.bind(this);   
        this.onMenuContainerOut = this.onMenuContainerOut.bind(this); 
    }

    onMenuListHover() {
      this.setState({
        hoveredMenuList: true
      })
    }
    onMenuListOut() {
      // If is not SET any more, mean hover then right after that, will disappear
      setTimeout(() => {
        if (this.state.hoveredParent == "") {
          this.setState({
            hoveredMenuList: false,
            hoveredParent: ""
          })
        }
       }, 100);
      
    }
    onParentMenuHover(e) {
      console.log("onParentMenuHover")
      console.log(e)
      this.setState({
        hoveredParent: e.target.textContent.trim()
      })
    }
    onMenuContainerOut() {
      console.log("onMenuContainerOut")
      this.setState({
        hoveredMenuList: false,
        hoveredParent: ""
      })
    }

    componentDidMount() {
      console.log("  >>DID MOUNT AppHeader")
      if (this.props.category.categories.length <= 0 ) {
          console.log("    >>>> actCategoryGet")
          this.props.actCategoryGet();
      }
    }
    componentDidUpdate() {
        if (this.props.category.categories.length <= 0 ) {
            console.log("  >>DID UPDATE AppHeader")
            console.log("    >>>> actCategoryGet")
            this.props.actCategoryGet();
        }
    }
    render() {
        return (
            <Header>
            <React.Fragment>
            <Row>
              <Col span={4}>
              <div className="app-title" >
                <Link to="/" style={{paddingLeft: "20px"}}>Phu Phuong</Link>
              </div>
              </Col>

              <Col span={12}><Search
                placeholder="Search product, category..."
                enterButton="Tìm Kiếm"
                size="large"
                onSearch={value => console.log(value)}
              /></Col>
              
            </Row>
            <Row>
            <Col span={4}>
              <div onMouseOver={this.onMenuListHover} onMouseLeave={this.onMenuListOut}>
              <Icon type="menu" className="nav-icon"/>
              <span className="nav-menu-text" >Danh Mục Sản Phẩm</span>
              </div>
            </Col>
            </Row>
            <DropdownMenu config={this.props.category.categoriesLevel} onParentMenuOut={this.onParentMenuOut} onMenuContainerOut={this.onMenuContainerOut}
              onParentMenuHover={this.onParentMenuHover} hoveredParent={this.state.hoveredParent}
              hoveredMenuList={this.state.hoveredMenuList}
              />
            
            </React.Fragment>
          </Header>
        );
    }
}


const mapStateToProps = (state) => ({
  //user: state.user
  category: state.category
});
const mapActionsToProps = {
  actCategoryGet
};

export default withRouter(connect(
  mapStateToProps,mapActionsToProps
)(AppHeader));