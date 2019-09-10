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
    render() {
        //{bestDiscount: 23, unit:"%|d", newPrice: 12}
        let bestDiscount = helpers.parseDiscountInformation(this.props.product);
        return (
            <Card className="product-wrapper" onClick={this.onClickProductDetail}>
                <div className="image-thump">
                    <img src={"/"+this.props.product.imgThump} style={{width:"100%", height:"100%"}}/>
                </div>
                <div className="product-title">
                    {this.props.product.name}
                </div>
               
                <div className="product-price">
                    {bestDiscount.newPrice}đ
                </div>
                <div className="product-price-old">
                    {bestDiscount.bestDiscount > 0 ? 
                        this.props.product.unitPrice + "đ" : ""}
                </div>
                <div className="product-price-discount">
                    {bestDiscount.bestDiscount > 0 ? ("-" + bestDiscount.bestDiscount + bestDiscount.unit): ""}
                </div>

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
