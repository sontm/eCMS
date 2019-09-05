import React, { Component } from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Row, Col, Button } from 'antd';
import ReactImageMagnify from 'react-image-magnify';

import { actProductGetDetail } from '../../redux/actions/ProductActions';
import { breakLineCRLF } from '../../util/Helpers';
import './ProductDetailPage.css'

class ProductDetailPage extends Component {
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
    }

    componentDidMount() {
        console.log("  >>DID MOUNT ProductDetailPage:" + this.props.match.params.id)
        this.props.actProductGetDetail(this.props.match.params.id);
    }
    // componentDidUpdate() {
    //     console.log("  >>DID UPdate ProductDetailPage:" + this.props.match.params.id)
    //     if (this.previousCategoryId != this.props.match.params.id) {
    //         console.log("    >>>> actProductGetOfCategory")
    //         this.props.actProductGetOfCategory(this.props.match.params.id);
    //     }
    //     this.previousCategoryId = this.props.match.params.id;
    // }
    render() {
        console.log("ProductDetailPage render:" + this.props.match.params.id)
        if (this.props.product && this.props.product.productDetail) {
        return (
            <React.Fragment>
                <Row style={{background: "white"}}>
                <div className="product-detail">
                    <Col span={2}>
                        <img src={"/"+this.props.product.productDetail.img1} style={{width:"100%", height:"100%"}}/>
                    </Col>

                    <Col span={7}>
                    <div className="image-main">
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'SmallImage',
                                isFluidWidth: true,
                                src: "/"+this.props.product.productDetail.img1,
                                srcSet: this.srcSet,
                                sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                            },
                            largeImage: {
                                src: "/"+this.props.product.productDetail.img1,
                                width: 1000,
                                height: 1000
                            },
                            enlargedImageContainerDimensions: {
                                width: '200%',
                                height: '120%'
                            },
                            isHintEnabled: true,
                            shouldHideHintAfterFirstActivation: false
                        }} 
                        hoverDelayInMs={50} fadeDurationInMs={100} pressDuration={150}
                        hintTextMouse={"Rê Chuột Để Phóng To"} 
                        hintTextTouch={"Chạm Để Phóng To"}
                        enlargedImageContainerClassName="image-main-magnify"
                        />
                        {/* <img src={"/"+this.props.product.productDetail.img1} style={{width:"100%", height:"100%"}}/> */}
                    </div>
                    </Col>
                    <Col span={11}>
                        <div className="product-title">
                        {this.props.product.productDetail.name}
                        </div>
                        <div className="product-brand">
                            by {this.props.product.productDetail.brandId}
                        </div>
                        <hr />
                        <div className="product-price">
                            {this.props.product.productDetail.unitPrice}đ
                        </div>
                        <div className="product-price-discount">
                        Tiet Kiem: 27%
                        </div>
                        <div className="product-price-old">
                        Gia Goc: 100000d
                        </div>
                        <hr />
                        
                        <div className="product-desc-medium">
                        {breakLineCRLF(this.props.product.productDetail.descMedium)}
                        </div>

                        Phan Anh San Pham Khong Chinh Xac
                    </Col>
                    <Col span={4}>

                    </Col>
                </div>
                </Row>
            </React.Fragment>
        )
        } else {
            return (
                <div>No Data</div>
            )
        }
    }
}


const mapStateToProps = (state) => ({
    //user: state.user
    category: state.category,
    product: state.product
  });
  const mapActionsToProps = {
    actProductGetDetail
  };
  
  export default withRouter(connect(
    mapStateToProps,mapActionsToProps
  )(ProductDetailPage));
