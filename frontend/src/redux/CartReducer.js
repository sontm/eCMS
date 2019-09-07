import Backend from '../util/Backend';
import Helpers from '../util/Helpers'
import {PROD_GET_PRODS_INCART_OK} from './ProductActions'
import {STORAGE_CART_PROD} from '../constants'
const CART_ADD = 'CART_ADD';

const initialState = {
    products:[],
    savedProductsId:[]
};

export const actCartAddToCart = (productID) => (dispatch) => {
    console.log("actCartAddToCart:" + productID)
    dispatch({
        type: CART_ADD,
        payload: productID
    })
}



// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case CART_ADD:
        
        let newState = {
            ...state,
            savedProductsId: [...state.savedProductsId, action.payload]
        };
        localStorage.setItem(STORAGE_CART_PROD, newState.savedProductsId);
        return newState;
    case PROD_GET_PRODS_INCART_OK:
        return {
            ...state,
            products: action.payload
        };
    default:
        return state;
    }
}
