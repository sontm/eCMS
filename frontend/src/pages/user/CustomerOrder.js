import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';
import Backend from '../../util/Backend'
// Redux stuff
import { connect } from 'react-redux';
import {actUserGetOrders} from '../../redux/UserReducer'
import { Form, Input, Button, Icon, notification, Row, Col} from 'antd';
const FormItem = Form.Item;

class CustomerOrder extends Component {
    componentDidMount() {
        console.log("CustomerOrder DidMount")
        if (this.props.user.userProfile) {
            this.props.actUserGetOrders(this.props.user.userProfile.id)
        }
    }
    componentDidUpdate() {

    }
    render() {
        console.log("CustomerOrder Render")
        return (
            <div className="customer-content">
                Hello From Order
            </div>
        );
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

