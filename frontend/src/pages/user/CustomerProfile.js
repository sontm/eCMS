import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';

import { Form, Input, Button, Icon, notification, Row, Col, Alert} from 'antd';
const FormItem = Form.Item;

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
class CustomerProfile extends Component {
    componentDidMount() {
        console.log("CustomerProfile DidMount")
    }
    handleSubmit() {

    }
    render() {
        console.log("CustomerProfile render")
        let infoView = "";
        let disableEdit = true;
        if (this.props.user.userProfile && this.props.user.userProfile.userType == "facebook") {
            infoView = <Alert message="Tài Khoản Liên Kết Facebook" type="info" showIcon/>;
        } else if (this.props.user.userProfile && this.props.user.userProfile.userType == "google") {
            infoView = <Alert message="Tài Khoản Liên Kết Google" type="info" showIcon/>;
        } else if (this.props.user.userProfile) {
            disableEdit = false;
        }
        return (
            <div className="customer-content">

            <br />
            <Row>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>{infoView}</Col>
            </Row>
            <br />

            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="profile-form">
                <FormItem label="Họ Tên">
                    <Input 
                        name="fullName"
                        value={this.props.user.userProfile ? this.props.user.userProfile.fullName : ""}
                        placeholder="Họ Tên" />
                </FormItem>
                <FormItem label="Số Điện Thoại">
                    <Input 
                        name="phone" 
                        value={this.props.user.userProfile ? this.props.user.userProfile.phone : ""}
                        placeholder="Số Điện Thoại" />
                </FormItem>
                <FormItem label="Thư Điện Tử">
                    <Input 
                        name="email" 
                        value={this.props.user.userProfile ? this.props.user.userProfile.email : ""}
                        placeholder="Thư Điện Tử" />
                </FormItem>

                {disableEdit ? "" :
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large" 
                        className="profile-form-button">Cập Nhập</Button>
                </FormItem>
                }
            </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
  
const mapActionsToProps = {

};
  
export default withRouter(connect(
    mapStateToProps,
    mapActionsToProps
)(CustomerProfile));

