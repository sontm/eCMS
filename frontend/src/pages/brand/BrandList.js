import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {actQueryChangeCategory} from '../../redux/ProductQueryReducer'
import { actBrandsGet } from '../../redux/SiteInfoReducer';

import './BrandPage.css';

import { Row, Col, Radio, Button, Icon, Input, Select, Card } from 'antd';

class BrandList extends Component {
    constructor(props) {
        super(props)
    }

    // Note when Refresh by URL, there is no parsedQuery.lvl
    componentDidMount() {
        //var parsedQuery = queryString.parse(this.props.location.search);
        if (this.props.siteInfo.brands.length <= 0 ) {
            this.props.actBrandsGet();
        }
    }

        //categoriesLevel:  "BanhKeo":{
  //       "id": 1,
  //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
  //     },
    render() {
        let brandViews = [];
        if (this.props.siteInfo.brands.length > 0) {
            this.props.siteInfo.brands.forEach(element => {
                //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
                brandViews.push(
                    <Col xs={8} sm={8} md={6} lg={6} xl={4} xxl={4} key={element.id}
                        style={{textAlign:"center", overflowWrap:"break-word"}}>
                        
                        <Link to={"/brand/" + element.id}>
                        <div className="brand-list-item">
                            <span>{element.name}
                            </span>
                        </div>
                        </Link>
                    </Col>)
            });
        }
        
        return (
            <React.Fragment>
            <Row style={{backgroundColor:"white"}}>
                {brandViews}
            </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    siteInfo: state.siteInfo
});
const mapActionsToProps = {
    actBrandsGet
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(BrandList));
