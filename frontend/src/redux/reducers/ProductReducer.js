import {
    PROD_QUERY_OK,PROD_QUERY_ERR, PROD_GETDETAIL_OK
  } from '../actions/ProductActions'

const initialState = {
    productsQuery: [],
    productDetail: null,
};


// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case PROD_QUERY_OK:
        return {
            ...state,
            productsQuery: action.payload
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

  
