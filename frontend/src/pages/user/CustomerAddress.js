import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
import {actUserAddAddress, actUserGetAllAddress, actUserEditAddress} from '../../redux/UserReducer'
import { Form, Input, Button, Icon, notification, Row, Col,Descriptions, Card} from 'antd';
const FormItem = Form.Item;

const queryString = require('query-string');

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
      md: { span: 4 },
      lg: { span: 4 },
      xl: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
      md: { span: 16 },
      lg: { span: 12 },
      xl: { span: 12 },
    },
  };
const tailFormItemLayout = {
wrapperCol: {
    xs: {
        span: 24,
        offset: 0,
    },
    sm: {
        span: 16,
        offset: 6,
    },
    md: {
        span: 12,
        offset: 4,
    },
    lg: {
        span: 12,
        offset: 4,
    },
    xl: {
        span: 12,
        offset: 4,
    }
},
};

class CustomerAddress extends Component {
    componentDidMount() {
        console.log("CustomerAddress DidMount")
        if (this.props.user.userProfile) {
            this.props.actUserGetAllAddress(this.props.user.userProfile.id)
        }
    }
    handleSetDefault(element) {
        element.isDefault = true;
        this.props.actUserEditAddress(element, this.props.user.userProfile.id)
    }
    handleRemove(element) {
        element.active = false;
        this.props.actUserEditAddress(element, this.props.user.userProfile.id)
    }
    componentWillReceiveProps(nextProps) {
        var parsedQuery = queryString.parse(this.props.location.search);
        if (parsedQuery && parsedQuery.action=="add" && 
                this.props.user.address.length < nextProps.user.address.length) {
            // Add Address Done
            this.props.history.push("/customer/addressbook")
        }
    }
    render() {
        console.log("CustomerAddress Render")
        var parsedQuery = queryString.parse(this.props.location.search);
        if (parsedQuery && parsedQuery.action=="add") {
            const AddAddressFormWrapper = Form.create()(AddAddressForm)
            return (
                <AddAddressFormWrapper {...this.props}/>
            )
        } else {
            console.log(this.props.user.address)
            let addressView = [];
            if (this.props.user.address.length > 0) {
                let defaultView = (
                    <div style={{display:"inline-block"}}>
                        <Icon type="check-circle" theme="twoTone" twoToneColor="blue" />
                        {"  "}
                        <span style={{color: "blue"}}>Địa Chỉ Mặc Đinh</span>
                    </div>
                )
                this.props.user.address.forEach(element => {
                    addressView.push(
                    <div><Row><Card size="small" title={
                        <div><span>{element.fullName + "    "}</span>
                        {element.isDefault ? defaultView : ""}
                        </div>
                        }
                        extra={
                            <div>
                                {!element.isDefault ? (
                                    <Button size="small" type="primary"
                                        onClick={e => {this.handleSetDefault(element)}}>Dat Mac Dinh</Button>) : ""}
                                {" "}
                                <Button size="small" type="primary">Chinh Sua</Button>
                                {" "}
                                <Button size="small" type="danger"
                                        onClick={e => {this.handleRemove(element)}}>Xoa</Button>
                            </div>
                        }
                        >
                        <Descriptions column={1}>
                            <Descriptions.Item label="Customer">{element.fullName}</Descriptions.Item>
                            <Descriptions.Item label="Dia Chi">
                                {element.address 
                                + (element.ward ? (", " + element.ward): "")
                                + (element.district ? (", " + element.district): "")
                                + (element.province ? (", " + element.province): "")
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone">{element.phone}</Descriptions.Item>
                        </Descriptions>
                    </Card></Row><br /></div>
                    )
                });
                
            }
            return (
                <div>
                    <Link to={"/customer/addressbook?action=add"}>
                        <Button size="large" type="primary">Them Dia Chi Moi
                    </Button></Link>
                    <br /><br />
                    {addressView}
                </div>
            );
        }
    }
}

class AddAddressForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Handle Submit..")
                console.log(values)
                this.props.actUserAddAddress(values, this.props.user.userProfile.id)
            }
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <FormItem label="Họ Tên">
                    {getFieldDecorator('fullName', {
                        rules: [{ required: true, message: 'Please input your Name!' }],
                    })(
                    <Input 
                        name="fullName"
                        placeholder="Bat Buoc" />
                    )}
                </FormItem>
                <FormItem label="Số Điện Thoại">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your Phone!' }],
                    })(
                    <Input 
                        name="phone" 
                        placeholder="Bat Buoc" />
                    )}
                </FormItem>
                <FormItem label="Tinh/Thanh Pho">
                    {getFieldDecorator('province', {
                        rules: [{ required: false}],
                    })(
                    <Input 
                        name="province"/>
                    )}
                </FormItem>
                <FormItem label="Huyen/Thi Tran">
                    {getFieldDecorator('district', {
                        rules: [{ required: false}],
                    })(
                    <Input 
                        name="district"/>
                    )}
                </FormItem>
                <FormItem label="Xa/Phuong">
                    {getFieldDecorator('ward', {
                        rules: [{ required: false}],
                    })(
                    <Input 
                        name="ward"/>
                    )}
                </FormItem>
                <FormItem label="Dia Chi">
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your Address!' }],
                    })(
                    <Input 
                        name="address" 
                        placeholder="Bat Buoc" />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large" 
                        className="profile-form-button">Add New</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapActionsToProps = {
    actUserAddAddress, actUserGetAllAddress, actUserEditAddress
};
  
export default withRouter(connect(
    mapStateToProps,
    mapActionsToProps
)(CustomerAddress));

