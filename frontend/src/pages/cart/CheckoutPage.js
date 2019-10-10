import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { List, Row, Col, Icon,Slider, InputNumber, Input, Button, Card, Descriptions } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {STORAGE_CART_PROD} from '../../constants'
import './CartPage.css'

import {actUserGetCartItems, actUserGetAllAddress, actUserPlaceOrder,actUserSetCheckoutAddress} from '../../redux/UserReducer'
import {actProductGetProductsInCart} from '../../redux/ProductActions'
import AppTouchSpin from '../../common/AppTouchSpin'


class CheckoutPage extends Component {
    constructor(props) {
        super(props)

        this.placeOrder = this.placeOrder.bind(this)

    }
    componentDidMount() {
        console.log("CheckoutPage DidMount")
        if (this.props.user.userProfile) {
            this.props.actUserGetAllAddress(this.props.user.userProfile.id)
        }
    }
    componentDidUpdate() {
        // Set initial Shipping Address
        if (this.props.user.address.length > 0) {
            for (let l = 0; l < this.props.user.address.length; l++) {
                if (this.props.user.address[l].isDefault) {
                    if (this.props.user.checkoutAddressId == 0) {
                        this.props.actUserSetCheckoutAddress(this.props.user.address[l].id)
                        break;
                    }
                }
            }
            
        }
    }
    placeOrder() {
        if (this.props.user.isLogined) {
            console.log(this.props.user.cartItems)
            this.props.actUserPlaceOrder(this.props.user.cartItems, this.props.user.userProfile)
        } else {
            alert("please login")
        }
    }

    render() {
        console.log("CHeckoutPage, Cart Items:")
        console.log(this.props.user.cartItems)
        let addressView = [];
        if (this.props.user.address.length > 0) {
            // Sort address which selected address to Front
            let sortedAddress = [...this.props.user.address];
            let selectedAdd = null;
            for (let l = 0; l < sortedAddress.length; l++) {
                if (sortedAddress[l].id == this.props.user.checkoutAddressId ) {
                    selectedAdd = sortedAddress[l];
                    break;
                }
            }
            if (selectedAdd) {
                // Move to First
                sortedAddress.splice(sortedAddress.indexOf(selectedAdd), 1);
                sortedAddress.unshift(selectedAdd);
            }

            let defaultView = (
                <div style={{display:"inline-block"}}>
                    <Icon type="check-circle" theme="twoTone" twoToneColor="#1890FF" />
                    {"  "}
                    <span style={{color: "#1890FF"}}>Sẽ Giao Đến Địa Chỉ Này</span>
                </div>
            )
            sortedAddress.forEach(element => {
                addressView.push(
                <div><Row><Card size="small" title={
                    <div><span>{element.fullName + "    "}</span>
                    {element.id == this.props.user.checkoutAddressId ? defaultView : ""}
                    </div>
                    }
                    extra={element.id != this.props.user.checkoutAddressId ? 
                    (<Button type="primary" size="small"
                            onClick={e => {this.props.actUserSetCheckoutAddress(element.id)}}>
                        Giao Đến Địa Chỉ Này
                    </Button>) : ""}
                    >
                    <Descriptions column={1} size="small">
                        <Descriptions.Item label="Khách Hàng">{element.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Địa Chỉ">
                            {element.address 
                            + (element.ward ? (", " + element.ward): "")
                            + (element.district ? (", " + element.district): "")
                            + (element.province ? (", " + element.province): "")
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="Số Điện Thoại">{element.phone}</Descriptions.Item>
                    </Descriptions>
                    
                </Card></Row><br /></div>
                )
            });
            
        }
        let orderItemViews=[];
        if (this.props.user.cartItems.length > 0) {
            let itemTotal = 0;
            let finalTotal = 0;
            this.props.user.cartItems.forEach(item => {
                itemTotal += item.unitPrice;
                orderItemViews.push(
                    <Row>
                        <Col span={18}>
                            <Link to={"/product/"+item.id}>
                                {item.name}
                            </Link>
                        </Col>
                        <Col span={6}>
                            {"x "+1 + " = " + item.unitPrice + "VND"}
                        </Col>
                    </Row>
                )
            })
            finalTotal = itemTotal;
            orderItemViews.push(
                <React.Fragment>
                <br/>
                <hr />
                <Descriptions column={1} bordered={true} size="small">
                    <Descriptions.Item label="Tạm Tính">{itemTotal}</Descriptions.Item>
                    <Descriptions.Item label="Phí Vận Chuyển">0 D</Descriptions.Item>
                    <Descriptions.Item label={
                        <span style={{color:"#1890FF", fontSize: "1.2em"}}>Thành Tiền</span>
                    }>
                        <span style={{color:"#1890FF", fontSize: "1.2em"}}>
                        {finalTotal}</span>
                    </Descriptions.Item>
                </Descriptions>
                </React.Fragment>
            )
        }
        return (
            <div>
                <Row>
                <Col span={12}>
                    <Card title="Xác Nhận Địa Chỉ" style={{marginRight: "5px"}}>
                    {addressView}
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Xác Nhận Đơn Hàng" 
                        extra={
                            <Link to={"/cart"}>
                                <Button type="primary" size="small">Chỉnh Sửa</Button>
                            </Link>
                        }>

                        {orderItemViews}
                    </Card>
                </Col>
                </Row>
                <br/>
                <Row style={{textAlign: "center"}}>
                    <Button type="primary" size="large" onClick={this.placeOrder}
                        style={{width: "350px", height:"70px", fontSize:"1.5em"}}>Đặt Mua</Button>
                </Row>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    user: state.user
});
const mapActionsToProps = {
    actUserGetCartItems,
    actUserGetAllAddress,
    actUserPlaceOrder,
    actUserSetCheckoutAddress
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(CheckoutPage));
