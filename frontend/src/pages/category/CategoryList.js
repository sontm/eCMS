import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {actQueryChangeCategory} from '../../redux/ProductQueryReducer'
import { actCategoryGet } from '../../redux/SiteInfoReducer';
import {actQuerySetBrand, actQuerySetAttribute, actQuerySetBrandCountry, actQueryChangePriceRange} from '../../redux/ProductQueryReducer'

import './ProductListPage.css';

import { Row, Col, Radio, Button, Icon, Input, Select, Card } from 'antd';

class ProductListPage extends Component {
    constructor(props) {
        super(props)
    }

    // Note when Refresh by URL, there is no parsedQuery.lvl
    componentDidMount() {
        //var parsedQuery = queryString.parse(this.props.location.search);
        if (this.props.siteInfo.categories.length <= 0 ) {
            this.props.actCategoryGet();
        }
    }

        //categoriesLevel:  "BanhKeo":{
  //       "id": 1,
  //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
  //     },
    render() {
        let cateViews = [];
        // if (this.props.siteInfo.categories.length > 0) {
        //     this.props.siteInfo.categories.forEach(element => {
        //         //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
        //         cateViews.push(
        //             <Col xs={8} sm={8} md={6} lg={6} xl={4} xxl={4} key={element.id}
        //                 style={{textAlign:"center", overflowWrap:"break-word"}}>
                        
        //                 <Link to={"/category/" + element.id + "/3"}>
        //                 <div className="category-list-item">
        //                     <span>{element.name}
        //                     </span>
        //                 </div>
        //                 </Link>
        //             </Col>)
        //     });
        // }
        let secondCateView = [];
       
        if (this.props.siteInfo && this.props.siteInfo.categoriesLevel) {
            for (var prop in this.props.siteInfo.categoriesLevel) {
                if (Object.prototype.hasOwnProperty.call(this.props.siteInfo.categoriesLevel, prop)) {
                    let curFirstLevelMenu = this.props.siteInfo.categoriesLevel["" +prop];
                    for (var propSub in curFirstLevelMenu) {
                        if (Object.prototype.hasOwnProperty.call(curFirstLevelMenu, propSub)) {
                            if (propSub != "id") {
                                let curSecondLevelMenu = curFirstLevelMenu[""+propSub];
                                // Search in all THird Menu
                                let thirdCateView = [];
                                if (curSecondLevelMenu.subs && curSecondLevelMenu.subs.length > 0) {
                                    curSecondLevelMenu.subs.forEach(element => {
                                        thirdCateView.push(
                                            <Col xs={8} sm={8} md={6} lg={6} xl={4} xxl={4} key={element.id}
                                                style={{textAlign:"center", overflowWrap:"break-word"}}>
                                                <Link to={"/category/" + element.id + "/1"}>
                                                    <div className="category-list-item">
                                                    <span>{element.name}
                                                    </span>
                                                    </div>
                                                </Link>
                                            </Col>
                                        )
                                    });

                                    secondCateView.push(
                                        <React.Fragment key={propSub}>
                                        <Card title={propSub}>
                                            <Row>
                                            {thirdCateView}
                                            </Row>
                                        </Card><br/>
                                        </React.Fragment>
                                        
                                    )
                                }
                                
                            }
                        }
                    }
                }
            }
        }
        return (
            <React.Fragment>
                {secondCateView}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    siteInfo: state.siteInfo
});
const mapActionsToProps = {
    actCategoryGet,actQueryChangeCategory
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(ProductListPage));
