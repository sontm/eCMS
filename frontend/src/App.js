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
import CartPage from './pages/cart/CartPage'
import BrandPage from './pages/brand/BrandPage'
import SearchPage from './pages/search/SearchPage'
import CategoryList from './pages/category/CategoryList'
import BrandList from './pages/brand/BrandList'

import CheckoutPage from './pages/cart/CheckoutPage'

import CustomerPage from './pages/user/CustomerPage'
import Login from './pages/user/Login'

// Redux stuff
import { connect } from 'react-redux';
import store from './redux/store';
import { ACCESS_TOKEN } from './constants';

import AppHeader from './common/AppHeader';
import AppFooter from './common/AppFooter';
import AuthenticationRoute from './common/AuthenticationRoute'

import NotFound from './common/NotFound';
import LoadingIndicator from './common/LoadingIndicator';
import PrivateRoute from './common/PrivateRoute';

import { Layout, notification, Menu, BackTop } from 'antd';
import { Row, Col } from 'antd';
import {actUserGetProfile, actUserGetCartItems} from './redux/UserReducer'
require('dotenv').config()

const { Content, Header, Sider, Footer } = Layout;
const {SubMenu} = Menu;

// Using env or any variable need have previx REACT_APP_
console.log("APIURL:" + process.env.REACT_APP_API_URL)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// IMPORTANT: set this to send Cookie in request
axios.defaults.withCredentials = true;

store.dispatch(actUserGetProfile());

class App extends Component {
  constructor(props) {
    super(props);

    notification.config({
      placement: 'bottomRight',
      bottom: 20,
      duration: 5,
    });    
  }

  componentDidMount() {
  }
  componentDidUpdate() {
    // If user have just Logined and not Inital Fetch data, Fetch
    console.log("-------------Loaded Module, ThisLocation:" + this.props.location.pathname)
    if (!this.mHasJustLogin && this.props.user.isLogined) {
      // TODO, Copy Cart from LocalStorage to DB here
      this.props.actUserGetCartItems(this.props.user.userProfile.id)

      // Reload Previous Path
      //this.props.history.push(this.mPrevLocationPath)
      this.mHasJustLogin = true
    }
    
    if (this.mHasJustLogin && !this.props.user.isLogined) {
      // User have just LogOut
      this.mHasJustLogin = false
      console.log("&&&&&&&&&& User Have just LogOut")
    }
  }

  // To Remember History, Back when User Login
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.location.pathname != "/login" && this.props.location.pathname != "/register" &&
  //       nextProps.location !== this.props.location) {
  //     console.log("---------------LastLocation:" + this.props.location.pathname)
  //     // if location is not Logiin or Register
  //     this.mPrevLocationPath = this.props.location.pathname
  //   }
  // }

  render() {
    if(this.props.user.isLoading) {
      console.log("****** User is NOT READY");
      return <LoadingIndicator />
    }
    return (
        <Layout>
          <AppHeader />
          <Layout className="app-container">
            
            <Content>
              <Switch>      
                <Route exact path="/" component={HomePage} />
                <Route path="/category/:id/:lvl" component={ProductListPage} />
                <Route path="/categorylist" component={CategoryList} />
                <Route path="/product/:id" component={ProductDetailPage} />
                <Route path="/brand/:id" component={BrandPage} />
                <Route path="/brandlist" component={BrandList} />
                
                <Route path="/cart" component={CartPage} />
                
                <Route path="/login" component={Login} />
                <Route path="/search/:keyword" component={SearchPage} />
                
                <PrivateRoute path="/checkout" component={CheckoutPage} authenticated={this.props.user.isLogined}/>

                <PrivateRoute path="/customer/:info" component={CustomerPage} authenticated={this.props.user.isLogined}/>

                <Route component={NotFound}></Route>
              </Switch>
            </Content>
          </Layout>
          
          {window.innerWidth <= 768 ? "" : (<Footer style={{ textAlign: 'center', minHeight:"200px", marginTop:"20px"}}>
            <AppFooter />
          </Footer>)}
          <BackTop />
        </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  //actGetCurrentUser
  actUserGetCartItems
};

export default withRouter(connect(
  mapStateToProps,
  mapActionsToProps
)(App));
