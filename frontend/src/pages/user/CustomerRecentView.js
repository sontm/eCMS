import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';

import { Form, Input, Button, Icon, notification, Row, Col} from 'antd';
const FormItem = Form.Item;

class CustomerRecentView extends Component {
    componentDidMount() {
        console.log("CustomerRecentView DidMount")
    }
    render() {
        console.log("CustomerRecentView Render")
        return (
            <div className="customer-content">
                Hello From CustomerRecentView
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
)(CustomerRecentView));

