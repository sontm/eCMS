import React, { Component } from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Row, Col, Button, Icon } from 'antd';
import ReactImageMagnify from 'react-image-magnify';

import { actProductGetDetail } from '../../redux/ProductActions';

import {actCartAddToCart} from '../../redux/CartReducer'
import {actUserUpdateCartItem} from '../../redux/UserReducer'

import {actUserAddRecentViews, actUserAddFavorites} from '../../redux/UserReducer'
import helpers from '../../util/Helpers';
import { breakLineCRLF } from '../../util/Helpers';
import AppTouchSpin from '../../common/AppTouchSpin'
import ProductDetailImageList from '../../common/ProductDetailImageList'

import AppConstant from '../../util/AppConstant'

import './ProductDetailPage.css'
// import "react-image-gallery/styles/css/image-gallery.css";
import Carousel, { Modal, ModalGateway } from 'react-images';

const IMAGE_PATH_PREFIX = "/";
function parseImagesFromProduct2(product) {
    let result = [];
    if (product) {
        if (product.img1 && product.img1.length > 0) {
            result.push({src: IMAGE_PATH_PREFIX+product.img1, thumb:IMAGE_PATH_PREFIX+product.img1})
        }
        if (product.img2 && product.img2.length > 0) {
            result.push({src: IMAGE_PATH_PREFIX+product.img2, thumb:IMAGE_PATH_PREFIX+product.img2})
        }
        if (product.img3 && product.img3.length > 0) {
            result.push({src: IMAGE_PATH_PREFIX+product.img3, thumb:IMAGE_PATH_PREFIX+product.img3})
        }
        if (product.img4 && product.img4.length > 0) {
            result.push({src: IMAGE_PATH_PREFIX+product.img4, thumb:IMAGE_PATH_PREFIX+product.img4})
        }
        if (product.img5 && product.img5.length > 0) {
            result.push({src: IMAGE_PATH_PREFIX+product.img5, thumb:IMAGE_PATH_PREFIX+product.img5})
        }
        if (product.img6 && product.img6.length > 0) {
            result.push({src: IMAGE_PATH_PREFIX+product.img6, thumb:IMAGE_PATH_PREFIX+product.img6})
        }
    }
    return result;
}
function onClickThumbnail2(classThis) {
    console.log("onClickThumbnail2:")
    console.log(this)
    console.log(classThis)
}
class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.onAddToCart = this.onAddToCart.bind(this);
        this.onClickProductDetail = this.onClickProductDetail.bind(this);
        this.onCloseModelImages = this.onCloseModelImages.bind(this);
        this.onAddToFav = this.onAddToFav.bind(this);

        this.onClickThumbnail = this.onClickThumbnail.bind(this)
        this.state ={
            curSelectImage: "",
            isOpenModelImages: false,
            isShowMore : false
        }

        this.prevProductDetail = null;
    }
    onAddToFav(e) {
        if (this.props.user.isLogined) {
            this.props.actUserAddFavorites(this.props.user.userProfile.id, this.props.match.params.id);
        } else {
            // TODO, Force to Login ???
        }
    }
    onAddToCart(e) {
        console.log("onAddToCart:" + this.props.name)
        // Stop onLick of parent to go Product Detail
        e.stopPropagation()
        if (this.props.user.isLogined) {
            this.props.actUserUpdateCartItem(this.props.user.userProfile.id,this.props.product.productDetail.id, 1)
        } else {
            this.props.actCartAddToCart(this.props.product.productDetail.id)
        }
    }
    
    
    onClickThumbnail(classThis) {
        console.log("onClickThumbnail:")
        console.log(this)
        console.log(classThis)
    }
    componentDidMount() {
        console.log("  >>DID MOUNT ProductDetailPage:" + this.props.match.params.id)
        this.props.actProductGetDetail(this.props.match.params.id);
        if (this.props.user.isLogined) {
            this.props.actUserAddRecentViews(this.props.user.userProfile.id, this.props.match.params.id);
        } else {
            AppConstant.addProductToRecentView(this.props.match.params.id);
        }
    }
    componentDidUpdate() {
        // When have just Receive Product Detail
        if (this.props.product && this.props.product.productDetail && !this.prevProductDetail) {
            if (this.props.product.productDetail.img1) {
                this.setState({
                    curSelectImage: IMAGE_PATH_PREFIX+this.props.product.productDetail.img1
                })
            }
        }

        this.prevProductDetail = this.props.product.productDetail;
    }
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
    onClickProductDetail(fromIdx) {
        console.log("onClickProductDetail")
        if (fromIdx) {
            this.setState({
                isOpenModelImages: true,
                isShowMore: true
            })
        } else {
            this.setState({
                isOpenModelImages: true,
                isShowMore: false
            })
        }
        
    }
    onCloseModelImages () {
        console.log("onCloseModelImages")
        this.setState({
            isOpenModelImages: false,
            isShowMore: false
        })
    }
    onClickThumbnail(item) {
        console.log("onClickThumbnail")
        console.log(item)
        this.setState({
            curSelectImage: item.src
        })
    }
//     [{"id":2,"name":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) Trang","descShort":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) desc Short","descMedium":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","descLong":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","unitPrice":10000,"stockNum":1000,"active":true,"imgThump":"images/products/BanhKeo/p2_1.jpg","img1":"images/products/BanhKeo/p2_1.jpg","img2":null,"img3":null,"img4":null,"img5":null,"img6":null,"firstCategoryId":11,"secondCategoryId":4,"thirdCategoryId":1,"brandId":3,"parentProductId":null,"productAttributeId":null,"createdAt":"2019-09-04T13:50:04.000Z","updatedAt":"2019-09-04T13:50:04.000Z",
// "categories":{"id":11,"name":"Bánh Mềm","desc":null,"active":true,"order":null,"parentCategoryId":4,"createdAt":"2019-09-04T16:36:41.713Z","updatedAt":"2019-09-04T16:36:41.713Z","cateDiscounts":[{"id":1,"desc":"Category Banh Mem giam gia 30% trong thang 9","from":"2019-09-01T16:42:06.000Z","to":"2019-09-30T16:42:06.000Z","type":"discount","fixMoney":0,"percent":30,"applyCategoryId":11,"applyBrandId":0,"applyProductId":0,"img":"","coupon":null,"createdAt":"2019-09-10T17:43:15.593Z","updatedAt":"2019-09-10T17:43:15.593Z"}]},
// "brands":{"id":3,"name":"Orang Tua","imgLogo":null,"countryId":5,"active":true,"createdAt":"2019-09-04T13:53:53.555Z","updatedAt":"2019-09-04T13:53:53.555Z",
// "countries":{"id":5,"name":"Trung Quốc","code":"cn","createdAt":"2019-09-06T16:42:06.333Z","updatedAt":"2019-09-06T16:42:06.333Z"},"brandDiscounts":[]},
// "attributes":[{"id":2,"name":"Trắng","value":null,"attributeGroupId":1,"createdAt":"2019-09-07T02:25:51.137Z","updatedAt":"2019-09-07T02:25:51.137Z","attributeGroups":{"id":1,"name":"Màu Sắc","createdAt":"2019-09-07T02:24:00.454Z","updatedAt":"2019-09-07T02:24:00.454Z"}}],"productDiscounts":[]}]

//this.props.product.productDetail.img1
    render() {
        console.log("ProductDetailPage render:" + this.props.match.params.id)
        if (this.props.product && this.props.product.productDetail) {
        let discountInfo = helpers.parseDiscountInformation(this.props.product.productDetail);
        let images = parseImagesFromProduct2(this.props.product.productDetail);
        let currentIndexImgCarousel = 0;
        images.forEach((item, idx) => {
            if (item.src == this.state.curSelectImage) {
                currentIndexImgCarousel = idx;
            }
        })
        const visibleNum = 5;
        return (
            <React.Fragment>
                <ModalGateway>
                    {this.state.isOpenModelImages ? (
                    <Modal onClose={this.onCloseModelImages} className="modal-product-images-fontmost">
                        <Carousel views={images} 
                        currentIndex={this.state.isShowMore ? visibleNum : currentIndexImgCarousel}/>
                    </Modal>
                    ) : null}
                </ModalGateway>
                <Row style={{background: "white"}}>
                <div className="product-detail">
                    <Col span={2}>
                        <ProductDetailImageList images={images} visibleNum={visibleNum}
                            thumbnailHeight={"80px"} onClick={this.onClickThumbnail}
                            onClickMore={this.onClickProductDetail}
                            />
                    </Col>
                    <Col span={8}>
                        <div onClick={this.onClickProductDetail} style={{paddingRight:"30px"}}>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'SmallImage',
                                isFluidWidth: true,
                                src: this.state.curSelectImage,
                                srcSet: this.srcSet,
                                sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                            },
                            largeImage: {
                                src: this.state.curSelectImage,
                                width: 1200,
                                height: 1000
                            },
                            enlargedImageContainerDimensions: {
                                width: '150%',
                                height: '100%'
                            },
                            isHintEnabled: true,
                            shouldHideHintAfterFirstActivation: false
                        }} 
                        hoverDelayInMs={50} fadeDurationInMs={100} pressDuration={150}
                        hintTextMouse={"Rê Chuột Để Phóng To"} 
                        hintTextTouch={"Chạm Để Phóng To"}
                        enlargedImageContainerClassName="image-main-magnify"
                        />
                        </div>
                    </Col>
                    <Col span={10}>
                        <div className="product-title">
                        {this.props.product.productDetail.name}
                        </div>
                        <div className="product-price-intro">
                            <span>Thương Hiệu:&nbsp;</span>
                            <span className="product-brand">
                            <Link to={"/brand/" + this.props.product.productDetail.brands.id}>
                                {this.props.product.productDetail.brands.name}
                            </Link></span>
                        </div>
                        <hr />
                        <div className="product-price">
                            {discountInfo.newPrice}đ
                        </div>
                        <div className="product-price-intro">
                            <span>Tiet Kiem:&nbsp;</span>
                            <span className="product-price-discount">
                            {discountInfo.bestDiscount > 0 ? ("-" + discountInfo.bestDiscount + discountInfo.unit): ""}
                            </span>
                        </div>
                        <div className="product-price-old">
                            <span>Gia Goc:&nbsp;</span>
                            {discountInfo.bestDiscount > 0 ? 
                                this.props.product.productDetail.unitPrice + "đ" : ""}
                        </div>
                        <hr />
                        
                        <div className="product-desc-medium">
                        {breakLineCRLF(this.props.product.productDetail.descMedium)}
                        </div>
                        
                        <hr />
                        {this.renderDiscountInfos(discountInfo.discounts)}

                        <Row>
                        <span>Số Lượng (Hộp):&nbsp;&nbsp;</span>
                        <AppTouchSpin value={1}/>

                        <Button size="large" type="primary" className="btn-addtocart" onClick={this.onAddToCart}>
                            CHỌN MUA
                        </Button>

                        <Button type="link" className="btn-addtofav" onClick={this.onAddToFav} title={"Them Vao Yeu Thich"}>
                            <Icon type="heart" />
                        </Button>
                        </Row>
                        <br />
                        <hr />
                        <Link to={"/reportIncorrect/" + this.props.product.productDetail.id}>
                        Phan Anh San Pham Khong Chinh Xac
                        </Link>
                    </Col>
                    <Col span={4}>
                        <Card size="small" title="Liên Hệ">
                            <p><Icon type="phone" style={{fontSize: "20px"}} /> Hotline đặt hàng:
                            <br/>
                            <a href="tel:18006963">
                            18006963
                            </a></p>
                            <p><Icon type="mail" style={{fontSize: "20px"}} /> Email: 
                            <br/>
                            <a href="mailto:hotro@phuphuong.vn?Subject=DatHang" target="_top">
                            hotro@phuphuong.vn
                            </a></p>
                        </Card>
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
    user: state.user,
    siteInfo: state.siteInfo,
    product: state.product
  });
  const mapActionsToProps = {
    actProductGetDetail,
    actCartAddToCart,
    actUserAddRecentViews,
    actUserAddFavorites,
    actUserUpdateCartItem
  };
  
  export default withRouter(connect(
    mapStateToProps,mapActionsToProps
  )(ProductDetailPage));
