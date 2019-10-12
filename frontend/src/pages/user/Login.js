import React, { Component } from 'react';
import './Login.css';
import { Link,withRouter } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
import { actUserLogin } from '../../redux/UserReducer';

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;


class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} {...this.props}/>
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
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
                this.props.actUserLogin(values, this.props.history, this.props.location.state.from.pathname)
            }
        });
    }

    render() {
        console.log("Login Page..............")
        console.log(this)
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username or email!' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="username" 
                        placeholder="Username/Email/Phone" />    
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
  });
  
const mapActionsToProps = {
    actUserLogin
};
  
export default withRouter(connect(
    mapStateToProps,
    mapActionsToProps
)(Login));
