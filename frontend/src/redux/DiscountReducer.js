import Backend from '../util/Backend';
import Helpers from '../util/Helpers'
import cloneDeep from 'lodash/cloneDeep';

const DISCOUNT_GET_BEST_HOME = 'DISCOUNT_GET_BEST_HOME';

const initialState = {
    best4Home:[]
};

// INput: "discount": {..., product :{...,}}
//   So, we have to add productDiscount from "discount" itself 
//  Processed: discount: {..., product :{..., productDiscount:[{discount...}]}}
export const actDiscountGetBestHome= () => (dispatch) => {
    Backend.getBestDiscountHome( 
        response => {
            console.log("Backend actDiscountGetBestHome:")
            console.log(response.data)
            if (response.data && response.data.length > 0) {
                response.data.forEach(element => {
                    if (element.product) {
                        let cloneParent = cloneDeep(element)
                        // Remove the product itself to prevent multiple include
                        delete cloneParent.product;

                        element.product.productDiscounts = [];
                        element.product.productDiscounts.push(cloneParent);
                    }
                });
                console.log(response.data)
                dispatch({
                    type: DISCOUNT_GET_BEST_HOME,
                    payload:  response.data
                });
            }
        },
        error => {
            console.log("Backend actDiscountGetBestHome error")
        }); 
}


// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case DISCOUNT_GET_BEST_HOME:
        return {
            ...state,
            best4Home: action.payload
        };
    
    default:
        return state;
    }
}
