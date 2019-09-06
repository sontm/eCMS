import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/home/HomePage'
import ProductListPage from './pages/category/ProductListPage'
import ProductDetailPage from './pages/product/ProductDetailPage'

// Redux stuff
import { connect } from 'react-redux';
import store from './redux/store';
import { ACCESS_TOKEN } from './constants';

import AppHeader from './common/AppHeader';
import NotFound from './common/NotFound';
import LoadingIndicator from './common/LoadingIndicator';
import PrivateRoute from './common/PrivateRoute';

import { Layout, notification, Menu } from 'antd';
import { Row, Col } from 'antd';
require('dotenv').config()

const { Content, Header, Sider, Footer } = Layout;
const {SubMenu} = Menu;

// console.log("URL:" + process.env.API_URL)
// TODO: WHy process.env not work
axios.defaults.baseURL = "http://localhost:5000/api";

//store.dispatch(actGetCurrentUser());

class App extends Component {
  constructor(props) {
    super(props);

    notification.config({
      placement: 'bottomRight',
      bottom: 20,
      duration: 2,
    });    
  }

  componentDidMount() {
  }

  render() {
    // if(this.props.user.isLoading) {
    //   console.log("****** User is NOT READY");
    //   return <LoadingIndicator />
    // }
    return (
        <Layout>
          <AppHeader />
          <Layout className="app-container">
            
            <Content>
              <Switch>      
                <Route exact path="/" component={HomePage} />
                <Route path="/category/:id" component={ProductListPage} />
                <Route path="/product/:id" component={ProductDetailPage} />
                <Route component={NotFound}></Route>
              </Switch>
            </Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>Phu Phuong ©2019</Footer>
        </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  //user: state.user
});

const mapActionsToProps = {
  //actGetCurrentUser
};

export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps
)(App));
