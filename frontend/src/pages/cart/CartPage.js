import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { List, Row, Col, Icon,Slider, InputNumber, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {STORAGE_CART_PROD} from '../../constants'
import './CartPage.css'

import {actProductGetProductsInCart} from '../../redux/ProductActions'

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);

// Example of Result Product
// [
//     {"id":2,"name":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) Trang",
//         "descShort":"","descMedium":"","descLong":"",
//         "unitPrice":10000,"stockNum":1000,"active":true,"imgThump":"images/products/BanhKeo/p2_1.jpg",
//         "img1":"images/products/BanhKeo/p2_1.jpg","img2":null,"img3":null,"img4":null,"img5":null,"img6":null,
//         "firstCategoryId":11,"secondCategoryId":4,"thirdCategoryId":1,"brandId":3,"parentProductId":null,
//         "productAttributeId":null,"createdAt":"","updatedAt":"",
        
//         "brands":
//             {"id":3,"name":"Orang Tua","imgLogo":null,"countryId":5,"active":true,
//             "createdAt":"2019-09-04T13:53:53.555Z","updatedAt":"2019-09-04T13:53:53.555Z",
                
//             "countries":{"id":5,"name":"Trung Quốc","code":"cn","createdAt":"","updatedAt":""}
//             },

//         "attributes":[{"id":2,"name":"Trắng","value":null,"attributeGroupId":1,"createdAt":"","updatedAt":"",
//             "attributeGroups":{"id":1,"name":"Màu Sắc","createdAt":"","updatedAt":""}
//         }]
//     }
// ]

// from "1,2,3" to [1,2,3]
function parseStringToArrayProductID(text) {
    return text.split(',');
}
class CartPage extends Component {
    componentDidMount() {
        console.log("STORAGE CART---------")
        console.log(localStorage.getItem(STORAGE_CART_PROD))
        let idArray = parseStringToArrayProductID(localStorage.getItem(STORAGE_CART_PROD))
        console.log(idArray)
        this.props.actProductGetProductsInCart(idArray)
    }
    render() {
        
        return (
            <React.Fragment>
            <Row className="cart-product">
                <Col span={18}>
                <List
                    itemLayout="vertical"
                    dataSource={this.props.cart.products}
                    renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <span>{item.unitPrice}đ</span>,
                            <span>10000đ</span>,
                            <span>-20%</span>,
                        ]}
                        extra={
                        <img
                            width={150}
                            alt="logo"
                            src={item.imgThump}
                        />
                        }
                    >
                        <List.Item.Meta
                            title={item.name}
                            description={
                                <div>
                                    <span>&nbsp;&nbsp;{"Nhãn Hiệu:"}&nbsp;</span>
                                    <Link to={"/brand/" + item.brands.id}>{item.brands.name}</Link>
                                </div>}
                        />
                        
                        <Row>
                            <Col span={3}>
                                <span style={{float:"right", marginRight:"10px"}}>Số Lương:</span>
                            </Col>
                            <Col span={5}>
                            <Slider
                                min={1}
                                max={20}
                                onChange={this.onChange}
                                value={typeof 1 === 'number' ? 1 : 0}
                            />
                            </Col>
                            <Col span={4}>
                            <InputNumber
                                min={1}
                                max={20}
                                style={{ marginLeft: 16 }}
                                value={5}
                                onChange={this.onChange}
                            />
                            </Col>
                            <Col span={2}>
                                <Button type="link">Xoá</Button>
                            </Col>
                            <Col span={4}>
                                <Button type="link">Để Dành Mua Sau</Button>
                            </Col>
                        </Row>
                    </List.Item>
                    )}
                />
                </Col>

                <Col span={6}>

                </Col>
            </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart
});
const mapActionsToProps = {
    actProductGetProductsInCart
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(CartPage));
