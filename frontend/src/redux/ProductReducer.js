import {
    PROD_QUERY_OK,PROD_QUERY_ERR, PROD_GETDETAIL_OK, PROD_BRANDLIST_OK,PROD_BRANDCOUNTRYLIST_OK,
    PROD_ATTRIBUTE_QUERY_OK, PROD_FILTER
  } from './ProductActions'
import Helpers from '../util/Helpers'

const initialState = {
    productsQuery: [],
    productsQueryFiltered: [],
    brandsQuery:{},
    brandCountriesQuery:{},
    attributesQuery:{},
    productDetail: null,
    filter:"popular", // popular, new, discount, lowprice, highprice
};


// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case PROD_QUERY_OK:
        return {
            ...state,
            productsQuery: action.payload,
            productsQueryFiltered: action.payload
        };
    case PROD_FILTER:
        return {
            ...state,
            productsQueryFiltered: action.payload.result,
            filter: action.payload.filter
        };
    case PROD_BRANDLIST_OK:
        return {
            ...state,
            brandsQuery: action.payload
        };
    case PROD_BRANDCOUNTRYLIST_OK:
        return {
            ...state,
            brandCountriesQuery: action.payload
        };
    case PROD_ATTRIBUTE_QUERY_OK:
        return {
            ...state,
            attributesQuery: action.payload
        };
    case PROD_GETDETAIL_OK:
        console.log("Prod detail")
        console.log(action.payload)
        return {
            ...state,
            productDetail: action.payload
        };
    case PROD_QUERY_ERR:
        return {
            ...state,
            productsQuery: []
        };
    default:
        return state;
    }
}

  
