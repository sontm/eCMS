import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { List, Row, Col, Icon,Slider, InputNumber, Input, Button, Card, Descriptions } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {STORAGE_CART_PROD} from '../../constants'
import './CartPage.css'

import {actUserGetCartItems, actUserUpdateCartItem, actUserPlaceOrder} from '../../redux/UserReducer'
import {actProductGetProductsInCart} from '../../redux/ProductActions'
import AppTouchSpin from '../../common/AppTouchSpin'


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
    if (text) {
        return text.split(',');
    }
    return [];
}
class CartPage extends Component {
    constructor(props) {
        super(props)

        this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this)
    }
    componentDidMount() {
        if (this.props.user.isLogined) {
            console.log("USER CART---------")
            // TOdo for item total
            this.props.actUserGetCartItems(this.props.user.userProfile.id)
        } else {
            console.log("STORAGE CART---------")
            console.log(localStorage.getItem(STORAGE_CART_PROD))
            let idArray = parseStringToArrayProductID(localStorage.getItem(STORAGE_CART_PROD))
            console.log(idArray)
            this.props.actProductGetProductsInCart(idArray)
        }
    }

    handleRemoveCartItem(itemId) {
        console.log("handleRemoveCartItem:" + itemId)
        if (this.props.user.isLogined) {
            console.log("USER CART---------")
            this.props.actUserUpdateCartItem(this.props.user.userProfile.id,
                itemId, 0, true)
        } else {
            console.log("STORAGE CART---------")
            // TODO
        }
    }
    render() {
        let itemTotal = 0;
        let finalTotal = 0;
        this.props.user.cartItems.forEach(item => {
            itemTotal += item.unitPrice;
            finalTotal += item.unitPrice;
        })
        return (
            <React.Fragment>
            <Row className="cart-product">
                <Col span={18}>
                <List
                    itemLayout="vertical"
                    dataSource={
                        this.props.user.isLogined ? this.props.user.cartItems: this.props.cart.products}
                    renderItem={item => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <Button type="link" onClick={e => {
                                this.handleRemoveCartItem(item.id)
                            }}>Xoá</Button>,
                            <Button type="link">Để Dành Mua Sau</Button>,
                            <div className="product-quantity">
                                <span>&nbsp;&nbsp;Số Lượng (Hộp):&nbsp;&nbsp;</span>
                                <AppTouchSpin value={1}/>
                            </div>
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
                        <Col span={10}>
                        <div className="product-price-old">
                            100000đ
                        </div>
                        
                        <div className="product-price-discount">
                            -27%
                        </div>
                        <div className="product-price">
                            {item.unitPrice}đ
                        </div>
                        
                        </Col>
                        <Col span={4}>

                        </Col>
                        <Col span={10}>
                        <div className="product-sumprice-item">
                            {" x 3 = " + item.unitPrice * 3 + "đ"}
                            <span>&nbsp;</span>
                        </div>
                        </Col>
                        </Row>
                        
                    </List.Item>
                    )}
                />
                </Col>

                <Col span={6}>
                    <Card size="med" title="Thanh Toan"
                            style={{marginLeft: "5px"}}>
                        <Descriptions column={1} bordered={false}>
                            <Descriptions.Item label="Tạm Tính">{itemTotal}</Descriptions.Item>
                            <Descriptions.Item label={
                                <span style={{color:"#1890FF", fontSize: "1.2em"}}>Thành Tiền</span>
                            }>
                                <span style={{color:"#1890FF", fontSize: "1.2em"}}>
                                {finalTotal}</span>
                            </Descriptions.Item>
                        </Descriptions>
                        <div style={{textAlign: "center"}}>
                            <Link to={"/checkout"}>
                            <Button type="primary" size="large">Tiến Hành Đặt Hàng</Button>
                            </Link>
                        </div>
                    </Card>
                </Col>
            </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    user: state.user
});
const mapActionsToProps = {
    actProductGetProductsInCart,
    actUserGetCartItems,
    actUserUpdateCartItem,
    actUserPlaceOrder
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(CartPage));
