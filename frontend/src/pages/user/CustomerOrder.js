import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';
import Backend from '../../util/Backend'
import ProductWrapper from '../category/ProductWrapper'
// Redux stuff
import { connect } from 'react-redux';
import {actUserGetOrders} from '../../redux/UserReducer'
import { Form, Input, Button, Icon, notification, Row, Col, Collapse, Table,Descriptions, Card } from 'antd';
const FormItem = Form.Item;
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;

const queryString = require('query-string');


class CustomerOrder extends Component {
    componentDidMount() {
        console.log("CustomerOrder DidMount")
        if (this.props.user.userProfile) {
            this.props.actUserGetOrders(this.props.user.userProfile.id)
        }
    }
    componentDidUpdate() {

    }


    onSelectOrder() {
        
    }

    render() {
        console.log("CustomerOrder Render")
        var parsedQuery = queryString.parse(this.props.location.search);
        console.log(parsedQuery)
        if (parsedQuery && parsedQuery.ordernumber && this.props.user.orders.length > 0) {
            // THis is Order Detail
            let currentOrder = null;
            for (let l = 0; l < this.props.user.orders.length; l++) {
                if (this.props.user.orders[l].orderNumber == parsedQuery.ordernumber) {
                    currentOrder = this.props.user.orders[l];
                    break;
                }
            }
            let addressView = (
                <Card size="small" title="Address">
                <Descriptions column={1}>
                    <Descriptions.Item label="UserName">{currentOrder.custFullName}</Descriptions.Item>
                    <Descriptions.Item label="Telephone">{currentOrder.custPhone}</Descriptions.Item>
                    <Descriptions.Item label="Huyen">{currentOrder.custDistrict}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {currentOrder.custAddress}
                    </Descriptions.Item>
                </Descriptions>
                </Card>
            );
            let priceView = (
                <Card size="small" title="Price">
                <Descriptions column={1}>
                    <Descriptions.Item label="Item Total">{currentOrder.itemTotal}</Descriptions.Item>
                    <Descriptions.Item label="Phi Van Chuyen">{currentOrder.shipTotal}</Descriptions.Item>
                    <Descriptions.Item label="Giam Gia">
                        -{currentOrder.finalTotal -currentOrder.itemTotal-currentOrder.shipTotal}}</Descriptions.Item>
                    <Descriptions.Item label="Final">{currentOrder.finalTotal}</Descriptions.Item>
                </Descriptions>
                </Card>
            );

            if (window.innerWidth < 768) {
                // Mobile UI
                var orderMobileViews = [];
                currentOrder.orderItems.forEach(element => {
                    orderMobileViews.push(
                        <Col xs={12} sm={12} md={12} lg={8} xl={6} xxl={6} key={element.id}>
                            <ProductWrapper product={element} showLinkToProduct={true}/>
                        </Col>  
                    )
                })
                
            } else {
                let tblDataCurrent = currentOrder.orderItems;
                let columnsCurrent = [
                {
                    title: '',
                    dataIndex: 'imgThump',
                    render: (text, record) => (
                        <img src={"/"+record.imgThump} style={{width:"100px", height:"130px"}}/>
                    )
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    render: (text, record) => (
                        <div>
                        <Link to={"/product/" + record.productId}>
                            {record.name}
                        </Link> <br/>
                        <span>{record.descShort}</span><br/>
                        {record.attributes.map(att => (
                            <span>{att.attributeGroupName + ": " + att.name}</span>
                        ))}
                        </div>
                    )
                },
                {
                    title: 'Price',
                    dataIndex: 'unitPrice',
                    render: (text, record) => (
                        <span>{record.unitPrice}</span>
                    )
                },
                {
                    title: 'So Long',
                    dataIndex: 'quantity'
                },
                {
                    title: 'Discount',
                    key: 'unitDiscountMoney',
                    render: (text, record) =>
                        (
                            <span>{record.unitDiscountMoney}</span>
                    )
                },
                {
                    title: 'Total',
                    dataIndex: 'finalTotal'
                }
                ];
                var tableView = (
                    <Table dataSource={tblDataCurrent} pagination={false} size="small"
                            columns={columnsCurrent} rowKey="id"/>
                )
            }
            return (
                <div className="customer-content">
                    <Row>
                        <Link to={"/customer/orders"}>
                            <Button type="link">
                                {"<< Quay lại Đơn Hàng Của Tôi"}
                            </Button>
                        </Link>
                    </Row>
                    <br />
                    <Row>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11} xxl={11}>
                    {addressView}
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={2} xl={2} xxl={2}></Col>
                    <Col xs={24} sm={24} md={24} lg={11} xl={11} xxl={11}>
                    {priceView}
                    </Col>
                    </Row>
                    <br />
                    <Row>
                    <Card size="medium" title="Shipment 1, 2019/09/09">
                        {tableView}
                        {orderMobileViews}
                    </Card>
                    </Row>
                </div>
            );
        } else if (this.props.user.orders.length > 0) {
            if (window.innerWidth < 768) {
                // This is Mobile UI
                var orderDescView = [];
                this.props.user.orders.forEach( item => {
                    orderDescView.push(
                        <React.Fragment>
                        <Descriptions size="small" column={1} title={
                            <Link to={"/customer/orders?ordernumber=" + item.orderNumber}>
                                {item.orderNumber}
                            </Link>}>
                            <Descriptions.Item label="Place Date">
                                {new Date(item.placeDate).toLocaleDateString()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Total">{item.finalTotal}</Descriptions.Item>
                            <Descriptions.Item label="Status">{item.status}</Descriptions.Item>
                            <Descriptions.Item label="Products">
                                <ul>
                                    {item.orderItems.map(i => {
                                        return <li>{i.name}</li>
                                    })}
                                </ul>
                            </Descriptions.Item>
                        </Descriptions>
                        <hr />
                        </React.Fragment>
                    )
                })
            } else {
                let orderListView = [];
                let tblData = this.props.user.orders;
                let columns = [
                    {
                        title: 'Order Number',
                        dataIndex: 'orderNumber',
                        render: (text, record) => (
                            <Link to={"/customer/orders?ordernumber=" + record.orderNumber}>
                                {record.orderNumber}
                            </Link>
                        )
                    },
                    {
                        title: 'Place Date',
                        dataIndex: 'placeDate',
                        render: (text, record) => {
                            return (
                            <span>{new Date(record.placeDate).toLocaleDateString()}</span>
                        )}
                    },
                    {
                        title: 'Products',
                        key: 'orderItems',
                        render: (text, record) =>
                            (
                                <ul>
                                    {record.orderItems.map(item => {
                                        return <li>{item.name}</li>
                                    })}
                                </ul>
                        )
                    },
                    {
                        title: 'Total',
                        dataIndex: 'finalTotal'
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status'
                    }
                ];
                var tableView = (
                    <Table dataSource={tblData} pagination={
                        {pageSize: 5,showTotal:(total) => (`Total ${total} items`)}}
                        columns={columns} rowKey="orderNumber"
                        size={window.innerWidth < 768 ? "small" : "middle"}
                        />
                )
            }
            
            
            return (
                <React.Fragment>
                    {window.innerWidth < 768 ? (
                        <Link to ={"/customer/default"}>
                            <Button type="link" style={{paddingLeft: "0"}}>
                            {"<< Quay lại Tài Khoản"}
                        </Button></Link>) : ("")}
                < br/>
                <h2 style={{textAlign: "center"}}>Đơn Hàng Của Tôi</h2>
                <div className="customer-content-nopadding">
                    {tableView}
                    {orderDescView}
                </div>
                </React.Fragment>
            );
        } else {
            return (
                <div className="customer-content">
                    No Data
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapActionsToProps = {
    actUserGetOrders
};
  
export default withRouter(connect(
    mapStateToProps,
    mapActionsToProps
)(CustomerOrder));

