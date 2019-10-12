import React, { Component } from 'react'
import { Row, Col, Card} from 'antd';

import HotDiscountHome from './HotDiscountHome';
import RecentViewHome from './RecentViewHome';
import FavoriteHome from './FavoriteHome';
import './HomePage.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
//https://www.npmjs.com/package/react-responsive-carousel
var Carousel = require('react-responsive-carousel').Carousel;



export default class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="homepage-container">
                <div className="home-first-impression-space">
                <Row>
                <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
                <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                    <Carousel showArrows={window.innerWidth <= 768 ? false : true} infiniteLoop={true} autoPlay={true} 
                            showThumbs={false} showStatus={false} stopOnHover={false}
                            swipeable={true} useKeyboardArrows={true}>
                        <div>
                            <img src="/images/home/carousel/carousel-1.jpg" className="my-img-carousel"/>
                        </div>
                        <div>
                            <img src="/images/home/carousel/carousel-2.jpg" className="my-img-carousel"/>
                        </div>
                        <div>
                            <img src="/images/home/carousel/carousel-3.jpg" className="my-img-carousel"/>
                        </div>
                        <div>
                            <img src="/images/home/carousel/carousel-4.jpg" className="my-img-carousel"/>
                        </div>
                    </Carousel>
                </Col>
                </Row>
                </div>

                <div className="empty-space-20px" />
                <Card title="Hot Deals" bordered={false}>
                    <HotDiscountHome />
                </Card>

                <div className="empty-space-20px" />
                <FavoriteHome />

                <div className="empty-space-20px" />
                <Card title="San Pham Ban Da Xem" bordered={false}>
                    <RecentViewHome />
                </Card>
                </div>
            </React.Fragment>
        )
    }
}
