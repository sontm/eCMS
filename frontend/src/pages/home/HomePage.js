import React, { Component } from 'react'
import { Carousel, Row, Col, Card} from 'antd';

import HotDiscountHome from './HotDiscountHome';
import RecentViewHome from './RecentViewHome';

import './HomePage.css';

export default class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="homepage-container">
                <div className="home-first-impression-space">
                <Row>
                <Col span={4}></Col>
                <Col span={20}>
                    <Carousel autoplay>
                        <div>
                            <img src="/images/home/carousel/carousel-1.jpg" style={{maxWidth: "100%",height:"100%"}}/>
                        </div>
                        <div>
                            <img src="/images/home/carousel/carousel-2.jpg" style={{maxWidth: "100%",height:"100%"}}/>
                        </div>
                        <div>
                            <img src="/images/home/carousel/carousel-3.jpg" style={{maxWidth: "100%",height:"100%"}}/>
                        </div>
                        <div>
                            <img src="/images/home/carousel/carousel-4.jpg" style={{maxWidth: "100%",height:"100%"}}/>
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
                <Card title="San Pham Yeu Thich" bordered={false}>
                    <p>Hot Deals Here</p>
                </Card>

                <div className="empty-space-20px" />
                <Card title="San Pham Ban Da Xem" bordered={false}>
                    <RecentViewHome />
                </Card>
                </div>
            </React.Fragment>
        )
    }
}
