import React, { Component } from 'react';
import './CustomerPage.css';
import { Link,withRouter } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';

import { Form, Input, Button, Icon, notification, Row, Col} from 'antd';
const FormItem = Form.Item;

class CustomerFavorite extends Component {
    componentDidMount() {
        console.log("CustomerFavorite DidMount")
    }
    render() {
        console.log("CustomerFavorite Render")
        return (
            <div className="customer-content">
                Hello From CustomerFavorite
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
)(CustomerFavorite));

