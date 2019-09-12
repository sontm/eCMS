import React, { Component } from 'react'
import { Card, Row, Col, Button } from 'antd';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {actCartAddToCart} from '../../redux/CartReducer'
import './ProductWrapper.css'
import helpers from '../../util/Helpers';

class ProductWrapper extends Component {
    constructor(props) {
        super(props);
        this.onAddToCart = this.onAddToCart.bind(this);
        this.onClickProductDetail = this.onClickProductDetail.bind(this);
    }

    onAddToCart(e) {
        console.log("onAddToCart:" + this.props.product.name)
        // Stop onLick of parent to go Product Detail
        e.stopPropagation()
        this.props.actCartAddToCart(this.props.product.id)
    }
    onClickProductDetail() {
        console.log("onClickProductDetail:" + this.props.product.name)
        this.props.history.push("/product/" + this.props.product.id);
    }

    // {"id":1,"desc":"Category Banh Mem giam gia 30% trong thang 9","from":"2019-09-01T16:42:06.000Z",
    //          "to":"2019-09-30T16:42:06.000Z","type":"discount","fixMoney":0,"percent":30,
    //     "applyCategoryId":11,"applyBrandId":0,"applyProductId":0,"img":"","coupon":null,"createdAt":"","updatedAt":""}
    renderDiscountInfos(discounts) {
        if (discounts && discounts.length >0) {
            let resultViewCoupon = [];
            let resultViewGift = [];
            discounts.forEach(d => {
                if (d.type == "coupon") {
                    resultViewCoupon.push(
                        <li>{d.desc}</li>
                    )
                } else if (d.type == "gift") {
                    resultViewGift.push(
                        <li>{d.desc}</li>
                    )
                }
            })
            return (
                <ul>
                    {[...resultViewCoupon, ...resultViewGift]}
                </ul>
            );
        }
    }
    render() {
        //{bestDiscount: 23, unit:"%|d", newPrice: 12, hasGift:true, coupon: null|"JP20", bestCoupon:"", couponUnit:"%|K",discounts[]}
        let discountInfo = helpers.parseDiscountInformation(this.props.product);
        console.log(discountInfo)
        return (
            <Card className="product-wrapper" onClick={this.onClickProductDetail}>
                {discountInfo.hasGift ? (
                    <div className="gift-banner"/>) : ("")}
                {discountInfo.bestDiscount > 0 ? (
                    <div className="discount-banner">
                    {helpers.convertPriceToShortAbbr(discountInfo.bestDiscount)}
                    </div>) 
                : ("")}
                {(discountInfo.coupon && discountInfo.hasGift) ? (
                    <div className="coupon-banner-belowgift">{discountInfo.coupon}</div>) : 
                    (discountInfo.coupon) ? <div className="coupon-banner">{discountInfo.coupon}</div> : ("")}
                
                <div className="image-thump">
                    <img src={"/"+this.props.product.imgThump} style={{width:"100%", height:"100%"}}/>
                </div>
                <div className="product-title">
                    {this.props.product.name}
                </div>
               
                <div className="product-price">
                    {discountInfo.newPrice}đ
                </div>
                <div className="product-price-old">
                    {discountInfo.bestDiscount > 0 ? 
                        this.props.product.unitPrice + "đ" : ""}
                </div>
                <div className="product-price-discount">
                    {discountInfo.bestDiscount > 0 ? ("-" + discountInfo.bestDiscount + discountInfo.unit): ""}
                </div>
                {this.renderDiscountInfos(discountInfo.discounts)}

                <div style={{height: "36px"}} />
                
                <Button type="primary" className="btn-addtocart" onClick={this.onAddToCart}>Add to Cart</Button>
                
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    
});
const mapActionsToProps = {
    actCartAddToCart
};

export default withRouter(connect(
    mapStateToProps,mapActionsToProps
)(ProductWrapper));
