import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

import axios from 'axios';
import axiosDefaults from 'axios/lib/defaults';

import AppContant from './AppConstant'

require('dotenv').config()

class Backend {
    constructor() {
    }
    createHeader() {
        //if(Cookies.get('XSRF-TOKEN')) {
        if (localStorage.getItem(AppContant.LOCAL_CSRF_TOKEN)) {
            var headers = {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Credentials':true,
                            'Authorization': 'CSRF-TOKEN ' + localStorage.getItem(AppContant.LOCAL_CSRF_TOKEN)
                        };
        } else {
            var headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials':true
            };
        }
        return headers;
    }

    // USER---------------------------------------
    login({username, password}, onOK, onError) {
        axios.post("/login",
            JSON.stringify({'username': username, 'password': password}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    addLoginWithFacebook(values, onOK, onError) {
        axios.post("/login/facebook",
            JSON.stringify(values),
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    addLoginWithGoogle(values, onOK, onError) {
        axios.post("/login/google",
            JSON.stringify(values),
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    getUserProfile(onOK, onError) {
        axios.get("/users/profile",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    // Recent Views, Favorite, Cart---------------------------------------
    addUserRecentViews(userId, productId, onOK, onError) {
        axios.post("/users/recentViews",
            JSON.stringify({'userId': userId, 'productId': productId}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    getUserRecentViews(userId, onOK, onError) {
        axios.get("/users/recentViews/" + userId,
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    addUserFavorites(userId, productId, onOK, onError) {
        axios.post("/users/favorites",
            JSON.stringify({'userId': userId, 'productId': productId}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    getUserFavorites(userId, onOK, onError) {
        axios.get("/users/favorites/" + userId,
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    addUserCartItem(userId, productId, quantity, onOK, onError) {
        axios.post("/users/cart",
            JSON.stringify({'userId': userId, 'productId': productId, 'quantity': quantity}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    getUserCartItems(userId, onOK, onError) {
        axios.get("/users/cart/" + userId,
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    deleteUserCartItem(userId, productId, onOK, onError) {
        axios.post("/users/cart/removeItem",
            JSON.stringify({'userId': userId, 'productId': productId}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }



    placeOrder(products, userProfile, onOK, onError) {
        axios.post("/users/order/place",
            JSON.stringify({'products': products, 'customer': userProfile}),
           // { headers: this.createHeader(), withCredentials: true})
            { headers: this.createHeader(),})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    getUserOrders(userId, onOK, onError) {
        axios.get("/users/order/" + userId,
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    // Category-Brands---------------------------------------
    getAllCategoriesName(onOK, onError) {
        axios.get("/categories",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    getAllBrandsName(onOK, onError) {
        axios.get("/brands",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }


    getProductDetail(prodId, onOK, onError) {
        axios.get("/products/" + prodId,
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    // POST
    queryProducts(queryParams, onOK, onError) {
        axios.post("/products/query",
            JSON.stringify(queryParams),
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
    // POST
    getSomeProducts(queryParams, onOK, onError) {
        axios.post("/products/get",
            JSON.stringify(queryParams),
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }


    // Discount------------
    // Best Discount for Home
    getBestDiscountHome(onOK, onError) {
        axios.get("/discounts/best",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    // Brand-------------
    getProductsOfBrand(id, onOK, onError) {
        axios.get("/brand/" + id,
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    // Search-------------
    searchProduct(keyword, onOK, onError) {
        axios.get("/search/" + keyword,
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }
}

const backend = new Backend();
export default backend;