import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

import axios from 'axios';
import axiosDefaults from 'axios/lib/defaults';

require('dotenv').config()

class Backend {
    constructor() {
    }
    createHeader() {
        //if(Cookies.get('XSRF-TOKEN')) {
        if (localStorage.getItem("xsrfToken")) {
            var headers = {
                            'Content-Type': 'application/json',
                            'Authorization': 'X-XSRF-TOKEN ' + localStorage.getItem("xsrfToken")
                        };
        } else {
            var headers = {'Content-Type': 'application/json'};
        }
        return headers;
    }

    getAllCategoriesName(onOK, onError) {
        axios.get("/categories",
            { headers: this.createHeader()})
            .then((response) => {onOK(response);})
            .catch((error) => {onError(error);});
    }

    getAllProductOfCategory(cateId, level, onOK, onError) {
        axios.get("/products/OfCategory/" + cateId + "?lvl=" + level,
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
}

const backend = new Backend();
export default backend;