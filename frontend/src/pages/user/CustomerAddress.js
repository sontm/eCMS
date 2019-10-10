import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
import {actUserAddAddress, actUserGetAllAddress, actUserEditAddress,actUserSetAddressDefault} from '../../redux/UserReducer'
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
        this.props.actUserSetAddressDefault(element, this.props.user.userProfile.id)
    }
    handleRemove(element) {
        element.active = false;
        this.props.actUserEditAddress(element, this.props.user.userProfile.id)
    }
    // componentWillReceiveProps(nextProps) {
    //     var parsedQuery = queryString.parse(this.props.location.search);
    //     if (parsedQuery && parsedQuery.action=="add" && 
    //             this.props.user.address.length < nextProps.user.address.length) {
    //         // Add Address Done
    //         this.props.history.push("/customer/addressbook")
    //     }
    // }
    render() {
        
        var parsedQuery = queryString.parse(this.props.location.search);
        console.log("CustomerAddress Render:")
        console.log(parsedQuery)
        if (parsedQuery && parsedQuery.action=="add") {
            const AddAddressFormWrapper = Form.create()(AddAddressForm)
            return (
                <div>
                    <Row>
                        <Button type="link" onClick={this.props.history.goBack}>
                            {"<< Quay lại Địa Chỉ"}
                        </Button>
                    </Row>
                    <br />
                    <AddAddressFormWrapper {...this.props}/>
                </div>
            )
        } else {
            let currentEdit = null;
            if (parsedQuery && parsedQuery.action=="edit") {
                if (this.props.user.address.length > 0) { 
                    for (let l = 0; l < this.props.user.address.length; l++) {
                        if (this.props.user.address[l].id == parsedQuery.aid) {
                            currentEdit = this.props.user.address[l];
                            break;
                        }
                    }
                }
            }
            if (currentEdit) {
                const AddAddressFormWrapper = Form.create()(AddAddressForm)
                return (
                    <div>
                        <Row>
                        <Button type="link" onClick={this.props.history.goBack}>
                            {"<< Quay lại Địa Chỉ"}
                        </Button>
                        </Row>
                        <br />
                    
                    <AddAddressFormWrapper {...this.props} currentEdit={currentEdit}/>
                    </div>
                )
            } else {
                console.log(this.props.user.address)
                let addressView = [];
                if (this.props.user.address.length > 0) {
                    let defaultView = (
                        <div style={{display:"inline-block"}}>
                            <Icon type="check-circle" theme="twoTone" twoToneColor="#1890FF" />
                            {"  "}
                            <span style={{color: "#1890FF"}}>Địa Chỉ Mặc Đinh</span>
                        </div>
                    )
                    this.props.user.address.forEach(element => {
                        addressView.push(
                        <div><Row><Card size={element.isDefault ? "medium" : "small"} title={
                            <div><span>{element.fullName + "    "}</span>
                            {element.isDefault ? defaultView : ""}
                            </div>
                            }
                            extra={
                                <div>
                                    {!element.isDefault ? (
                                        <Button type="primary"
                                            onClick={e => {this.handleSetDefault(element)}}>Đặt Mặc Định</Button>) : ""}
                                    {" "}
                                    <Link to={"/customer/addressbook?action=edit&aid="+element.id}>
                                        <Button type="primary">Chỉnh Sửa</Button>
                                    </Link>
                                    {" "}
                                    <Button type="danger"
                                            onClick={e => {this.handleRemove(element)}}>Xoá</Button>
                                </div>
                            }
                            >
                            <Descriptions column={1}>
                                <Descriptions.Item label="Khách Hàng">{element.fullName}</Descriptions.Item>
                                <Descriptions.Item label="Địa Chỉ">
                                    {element.address 
                                    + (element.ward ? (", " + element.ward): "")
                                    + (element.district ? (", " + element.district): "")
                                    + (element.province ? (", " + element.province): "")
                                    }
                                </Descriptions.Item>
                                <Descriptions.Item label="Số Điện Thoại">{element.phone}</Descriptions.Item>
                            </Descriptions>
                        </Card></Row><br /></div>
                        )
                    });
                    
                }
                return (
                    <div>
                        <Link to={"/customer/addressbook?action=add"}>
                            <Button size="large" type="primary">Thêm Địa Chỉ Mới
                        </Button></Link>
                        <br /><br />
                        {addressView}
                    </div>
                );
            }
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
                if (this.props.currentEdit) {
                    values.id = this.props.currentEdit.id;
                    this.props.actUserEditAddress(values, this.props.user.userProfile.id, this.props.history)
                } else {
                    this.props.actUserAddAddress(values, this.props.user.userProfile.id, this.props.history)
                }
            }
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <FormItem label="Họ Tên">
                    {getFieldDecorator('fullName', {
                        rules: [{ required: true, message: 'Xin Hãy Nhập Tên!' }],
                        initialValue: this.props.currentEdit ? this.props.currentEdit.fullName : ""
                    })(
                    <Input 
                        name="fullName"
                        placeholder="Nội Dung Bắt Buộc" />
                    )}
                </FormItem>
                <FormItem label="Số Điện Thoại">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Xin Hãy Nhập Số Điện Thoại!' }],
                        initialValue: this.props.currentEdit ? this.props.currentEdit.phone : ""
                    })(
                    <Input 
                        name="phone" 
                        placeholder="Nội Dung Bắt Buộc" />
                    )}
                </FormItem>
                <FormItem label="Tỉnh/Thành Phố">
                    {getFieldDecorator('province', {
                        rules: [{ required: false}],
                        initialValue: this.props.currentEdit ? this.props.currentEdit.province : ""
                    })(
                    <Input 
                        name="province"/>
                    )}
                </FormItem>
                <FormItem label="Huyện/Thị Trấn">
                    {getFieldDecorator('district', {
                        rules: [{ required: false}],
                        initialValue: this.props.currentEdit ? this.props.currentEdit.district : ""
                    })(
                    <Input 
                        name="district"/>
                    )}
                </FormItem>
                <FormItem label="Xã/Phường">
                    {getFieldDecorator('ward', {
                        rules: [{ required: false}],
                        initialValue: this.props.currentEdit ? this.props.currentEdit.ward : ""
                    })(
                    <Input 
                        name="ward"/>
                    )}
                </FormItem>
                <FormItem label="Địa Chỉ">
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Xin Hãy Nhập Địa Chỉ!' }],
                        initialValue: this.props.currentEdit ? this.props.currentEdit.address : ""
                    })(
                    <Input 
                        name="address" 
                        placeholder="Nội Dung Bắt Buộc" />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large" 
                        className="profile-form-button">
                        {this.props.currentEdit ? "Chỉnh Sửa" : "Tạo Mới"}
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapActionsToProps = {
    actUserAddAddress, actUserGetAllAddress, actUserEditAddress,actUserSetAddressDefault
};
  
export default withRouter(connect(
    mapStateToProps,
    mapActionsToProps
)(CustomerAddress));

