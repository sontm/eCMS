import Backend from '../../util/Backend';
import Helpers from '../../util/Helpers'

export const PROD_QUERY_OK = 'PROD_QUERY_OK';
export const PROD_GETDETAIL_OK = 'PROD_GETDETAIL_OK';
export const PROD_QUERY_ERR = 'PROD_QUERY_ERR';
export const PROD_BRANDLIST_OK = 'PROD_BRANDLIST_OK';
export const PROD_BRANDCOUNTRYLIST_OK = 'PROD_BRANDCOUNTRYLIST_OK';

// level = 1 mean THirst Menu, 2 mean Second Menu, 3 mean Parent menu
export const actProductGetOfCategory = (cateId, level) => (dispatch) => {
    Backend.getAllProductOfCategory(cateId, level,
    response => {
        console.log("Get All Product of Category:" + cateId)
        console.log(response.data)
        dispatch({
            type: PROD_QUERY_OK,
            payload:  response.data
        });
        let brandList = Helpers.getBrandsQuery(response.data)
        dispatch({
            type: PROD_BRANDLIST_OK,
            payload:  brandList
        });

        let brandCountryList = Helpers.getBrandCountriesQuery(brandList)
        dispatch({
            type: PROD_BRANDCOUNTRYLIST_OK,
            payload:  brandCountryList
        });
        
    },
    error => {
        console.log("Get All Product error")
    }); 
}

export const actProductGetDetail = (prodId) => (dispatch) => {
    Backend.getProductDetail(prodId, 
    response => {
        console.log("Backend getProductDetail:" + prodId)
        console.log(response.data)
        dispatch({
            type: PROD_GETDETAIL_OK,
            payload:  response.data
        });
    },
    error => {
        console.log("Get All Product error")
    }); 
}
