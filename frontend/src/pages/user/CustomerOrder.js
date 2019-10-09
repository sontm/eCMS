import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';
import Backend from '../../util/Backend'
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
                    <Col span={10}>
                    {addressView}
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>
                    {priceView}
                    </Col>
                    </Row>
                    <br />
                    <Row>
                    <Card size="medium" title="Shipment 1, 2019/09/09">
                        <Table dataSource={tblDataCurrent} pagination={false} size="small"
                            columns={columnsCurrent} rowKey="id"/>
                    </Card>
                    </Row>
                </div>
            );
        } else if (this.props.user.orders.length > 0) {
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
            
            
            return (
                <div className="customer-content-nopadding">
                    <Table dataSource={tblData} pagination={
                        {pageSize: 5,showTotal:(total) => (`Total ${total} items`)}}
                        columns={columns} rowKey="orderNumber"/>
                </div>
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

