import Backend from '../util/Backend';
import Helpers from '../util/Helpers'
import {actProductGetOfCategory} from './ProductActions'

const QUERY_CHANGE_CATEGORY = 'QUERY_CHANGE_CATEGORY';
const QUERY_CHANGE_BRAND = 'QUERY_CHANGE_BRAND';
const QUERY_CHANGE_BRANDCOUNTRY = 'QUERY_CHANGE_BRANDCOUNTRY';
const QUERY_CHANGE_ATTRIBUTE = 'QUERY_CHANGE_ATTRIBUTE';

const initialState = {
    category:{}, // {id, level}
    brands:[], // list of brand ID, if empty mean All
    brandCountries:[], // list of ID
    attributes:[] // list of ID
};

// level 1,2,3 for First Second and Third Level
export const actQueryChangeCategory = (prevQueryProps, id, level) => (dispatch) => {
    console.log("actQueryChangeCategory:" + id)

    dispatch({
        type: QUERY_CHANGE_CATEGORY,
        payload:  {id:id, level: level}
    });
    prevQueryProps.category = {id:id, level: level};

    actProductGetOfCategory({isFirstQuery:true}, prevQueryProps, dispatch);
}

export const actQuerySetBrand = (prevQueryProps, id, isCheck) => (dispatch) => {
    let newBrands = [...prevQueryProps.brands];

    if (isCheck) {
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
    console.log("  ENd Dispatch QUERY_CHANGE_BRAND")

    // Then Start Query Here
    console.log("Start   Query Product with BrandCOuntry:")
    prevQueryProps.brands = newBrands;
    console.log(prevQueryProps)
    actProductGetOfCategory({}, prevQueryProps, dispatch);
}
export const actQuerySetAttribute = (prevQueryProps, id, isCheck) => (dispatch) => {
    let newAttributes = [...prevQueryProps.attributes];

    if (isCheck) {
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
    console.log("  ENd Dispatch QUERY_CHANGE_BRANDCOUNTRY")

    // Then Start Query Here
    console.log("Start   Query Product with Attribute:")
    prevQueryProps.attributes = newAttributes;
    console.log(prevQueryProps)
    actProductGetOfCategory({}, prevQueryProps, dispatch);
}

export const actQuerySetBrandCountry = (prevQueryProps, id, isCheck) => (dispatch) => {
    let newBrandCountriess = [...prevQueryProps.brandCountries];

    if (isCheck) {
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
    console.log("  ENd Dispatch QUERY_CHANGE_BRANDCOUNTRY")

    // Then Start Query Here
    console.log("Start   Query Product:")
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
