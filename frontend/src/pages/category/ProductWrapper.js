import React, { Component } from 'react'
import { Card, Row, Col, Button } from 'antd';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './ProductWrapper.css'

class ProductWrapper extends Component {
    constructor(props) {
        super(props);
        this.onAddToCart = this.onAddToCart.bind(this);
        this.onClickProductDetail = this.onClickProductDetail.bind(this);
    }

    onAddToCart(e) {
        console.log("onAddToCart:" + this.props.name)
        // Stop onLick of parent to go Product Detail
        e.stopPropagation()
    }
    onClickProductDetail() {
        console.log("onClickProductDetail:" + this.props.name)
        this.props.history.push("/product/" + this.props.id);
    }
    render() {
        return (
            <Card className="product-wrapper" onClick={this.onClickProductDetail}>
                <div className="image-thump">
                    <img src={"/"+this.props.imgThump} style={{width:"100%", height:"100%"}}/>
                </div>
                <div className="product-title">
                    {this.props.name}
                </div>
               
                <div className="product-price">
                    {this.props.unitPrice}đ
                </div>
                <div className="product-price-old">
                    100000đ
                </div>
                <div className="product-price-discount">
                    -27%
                </div>

                <Button type="primary" className="btn-addtocart" onClick={this.onAddToCart}>Add to Cart</Button>
            </Card>
        )
    }
}

export default withRouter(ProductWrapper);