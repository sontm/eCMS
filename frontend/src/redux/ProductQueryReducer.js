import Backend from '../util/Backend';
import Helpers from '../util/Helpers'
import {actProductGetOfCategory} from './ProductActions'

const QUERY_CHANGE_CATEGORY = 'QUERY_CHANGE_CATEGORY';
const QUERY_CHANGE_BRAND = 'QUERY_CHANGE_BRAND';
const QUERY_CHANGE_BRANDCOUNTRY = 'QUERY_CHANGE_BRANDCOUNTRY';
const QUERY_CHANGE_ATTRIBUTE = 'QUERY_CHANGE_ATTRIBUTE';
const QUERY_CHANGE_PRICE = 'QUERY_CHANGE_PRICE';

const initialState = {
    category:{}, // {id, level}
    brands:[], // list of brand ID, if empty mean All
    brandCountries:[], // list of ID
    attributes:[], // list of ID,
    priceRange:{} // {name: 1, from: m to:}; name is start from 1, just the Range in Query
};

// level 1,2,3 for First Second and Third Level
export const actQueryChangeCategory = (prevQueryProps, id, level) => (dispatch) => {
    console.log("%%%%%%%%%%%%%%%%actQueryChangeCategory:" + id)
    
    dispatch({
        type: QUERY_CHANGE_CATEGORY,
        payload:  {id:id, level: level}
    });
    prevQueryProps.category = {id:id, level: level};
    console.log(prevQueryProps)
    actProductGetOfCategory({isFirstQuery:true}, prevQueryProps, dispatch);
}

export const actQueryChangePriceRange = (prevQueryProps, from, to) => (dispatch) => {
    console.log("%%%%%%%%%%%%%%%%actQueryChangePriceRange:" + from + "->" + to)

    dispatch({
        type: QUERY_CHANGE_PRICE,
        payload:  {from:from, to: to}
    });
    prevQueryProps.priceRange = {from:from, to: to};
    console.log(prevQueryProps)
    actProductGetOfCategory({}, prevQueryProps, dispatch);
}

// id -1 mean Clear
export const actQuerySetBrand = (prevQueryProps, id, isCheck) => (dispatch) => {
    console.log("%%%%%%%%%%%%%%%% actQuerySetBrand:")
    let newBrands = [...prevQueryProps.brands];

    if (id == -1) {
        newBrands = [];
    } else if (isCheck) {
        // Include Brand
        if (newBrands.indexOf(id) <= -1) {
            newBrands.push(id);
        }
    } else {
        // Exclude Brand
        if (newBrands.indexOf(id) > -1) {
            newBrands.splice(newBrands.indexOf(id), 1);
        }
    }
    dispatch({
        type: QUERY_CHANGE_BRAND,
        payload:  newBrands
    });

    // Then Start Query Here
    prevQueryProps.brands = newBrands;
    console.log(prevQueryProps)
    actProductGetOfCategory({}, prevQueryProps, dispatch);
}

// id = -1 mean isCHeck is array of ID, need to remove all
export const actQuerySetAttribute = (prevQueryProps, id, isCheck) => (dispatch) => {
    console.log("%%%%%%%%%%%%%%%% actQuerySetAttribute:")
    let newAttributes = [...prevQueryProps.attributes];

    if (id == -1) {
        isCheck.forEach(id => {
            if (newAttributes.indexOf(""+id) > -1) {
                newAttributes.splice(newAttributes.indexOf(""+id), 1);
            }
        })
    } else if (isCheck) {
        // Include
        if (newAttributes.indexOf(id) <= -1) {
            newAttributes.push(id);
        }
    } else {
        // Exclude
        if (newAttributes.indexOf(id) > -1) {
            newAttributes.splice(newAttributes.indexOf(id), 1);
        }
    }
    dispatch({
        type: QUERY_CHANGE_ATTRIBUTE,
        payload:  newAttributes
    });

    prevQueryProps.attributes = newAttributes;
    console.log(prevQueryProps)
    actProductGetOfCategory({}, prevQueryProps, dispatch);
}

// id -1 mean clear
export const actQuerySetBrandCountry = (prevQueryProps, id, isCheck) => (dispatch) => {
    console.log("%%%%%%%%%%%%%%%% actQuerySetBrandCountry:")
    let newBrandCountriess = [...prevQueryProps.brandCountries];

    if (id == -1) {
        newBrandCountriess = [];
    } else if (isCheck) {
        // Include Brand
        if (newBrandCountriess.indexOf(id) <= -1) {
            newBrandCountriess.push(id);
        }
    } else {
        // Exclude Brand
        if (newBrandCountriess.indexOf(id) > -1) {
            newBrandCountriess.splice(newBrandCountriess.indexOf(id), 1);
        }
    }
    dispatch({
        type: QUERY_CHANGE_BRANDCOUNTRY,
        payload:  newBrandCountriess
    });

    prevQueryProps.brandCountries = newBrandCountriess;
    console.log(prevQueryProps)
    actProductGetOfCategory({}, prevQueryProps, dispatch);
}



// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case QUERY_CHANGE_BRAND:
        return {
            ...state,
            brands: action.payload
        };
    case QUERY_CHANGE_BRANDCOUNTRY:
        return {
            ...state,
            brandCountries: action.payload
        };
    case QUERY_CHANGE_ATTRIBUTE:
        return {
            ...state,
            attributes: action.payload
        };
    case QUERY_CHANGE_CATEGORY:
        console.log("QUERY_CHANGE_CATEGORY")
        return {
            ...state,
            category: action.payload
        };
    default:
        return state;
    }
}
