import Backend from '../util/Backend';
import Helpers from '../util/Helpers'

export const PROD_QUERY_OK = 'PROD_QUERY_OK';
export const PROD_GET_PRODS_INCART_OK = 'PROD_GET_PRODS_INCART_OK';
export const PROD_FILTER = 'PROD_FILTER';
export const PROD_GETDETAIL_OK = 'PROD_GETDETAIL_OK';
export const PROD_QUERY_ERR = 'PROD_QUERY_ERR';
export const PROD_BRANDLIST_OK = 'PROD_BRANDLIST_OK';
export const PROD_BRANDCOUNTRYLIST_OK = 'PROD_BRANDCOUNTRYLIST_OK';
export const PROD_ATTRIBUTE_QUERY_OK = 'PROD_ATTRIBUTE_QUERY_OK';
export const PROD_PRICERANGE_QUERY_OK = 'PROD_PRICERANGE_QUERY_OK';

// level = 1 mean THirst Menu, 2 mean Second Menu, 3 mean Parent menu

// Example of Result Product
// [
    // [{
    //     "id":2,"name":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) Trang","descShort":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) desc Short","descMedium":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","descLong":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk)","unitPrice":10000,"stockNum":1000,"active":true,"imgThump":"images/products/BanhKeo/p2_1.jpg","img1":"images/products/BanhKeo/p2_1.jpg","img2":null,"img3":null,"img4":null,"img5":null,"img6":null,"firstCategoryId":11,"secondCategoryId":4,"thirdCategoryId":1,"brandId":3,"parentProductId":null,"productAttributeId":null,"createdAt":"","updatedAt":"",
    //     "categories":{"id":11,"name":"Bánh Mềm","desc":null,"active":true,"order":null,"parentCategoryId":4,"createdAt":"","updatedAt":"",
    //         "cateDiscounts":[]},
    //     "brands":{"id":3,"name":"Orang Tua","imgLogo":null,"countryId":5,"active":true,"createdAt":"","updatedAt":"",
    //         "countries":{"id":5,"name":"Trung Quốc","code":"cn","createdAt":"","updatedAt":""},
    //         "brandDiscounts":[]},
    //     "attributes":[{"id":2,"name":"Trắng","value":null,"attributeGroupId":1,"createdAt":"","updatedAt":"2019-09-07T02:25:51.137Z",
    //         "attributeGroups":{"id":1,"name":"Màu Sắc","createdAt":"2019-09-07T02:24:00.454Z","updatedAt":""}}],
    //     "productDiscounts":[]}]
export const actProductGetOfCategory = ({isFirstQuery=false} = {}, queryParams, dispatch) => {
    Backend.queryProducts(queryParams,
    response => {
        console.log("Query All Product Done&&&&&&&&&&&&&&&&&&&&&&&&6")
        console.log(response.data)
        dispatch({
            type: PROD_QUERY_OK,
            payload:  response.data
        });

        // Only Change Attribute List for First Query
        if (isFirstQuery) {
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
            
            let attributesQuery = Helpers.getAttributesQuery(response.data);
            dispatch({
                type: PROD_ATTRIBUTE_QUERY_OK,
                payload:  attributesQuery
            });
            
            let priceRangeQuery = Helpers.getPriceRanges(response.data)
            dispatch({
                type: PROD_PRICERANGE_QUERY_OK,
                payload:  priceRangeQuery
            });
        }
    },
    error => {
        console.log("Get All Product error")
    }); 
}

export const actProductGetProductsInCart = (productIds) => (dispatch) => {
    Backend.getSomeProducts({productIds:productIds},
    response => {
        console.log("Get Some Product Done&&&&&&&&&&&&&&&&&&&&&&&&6")
        console.log(response.data)
        dispatch({
            type: PROD_GET_PRODS_INCART_OK,
            payload:  response.data
        });
    },
    error => {
        console.log("Get All Product error")
    }); 
}

// popular, new, discount, lowprice, highprice
export const actProductFilter = (filter, searchname, products) => (dispatch) => {
    let productFilters = Helpers.filterProduct(filter, searchname, products);
    dispatch({
        type:PROD_FILTER,
        payload: {filter: filter, result :productFilters}
    })
}

export const actProductGetDetail = (prodId) => (dispatch) => {
    Backend.getProductDetail(prodId, 
    response => {
        console.log("Backend getProductDetail:" + prodId)
        console.log(response.data)
        if (response.data && response.data.length > 0) {
            dispatch({
                type: PROD_GETDETAIL_OK,
                payload:  response.data[0]
            });
        }
    },
    error => {
        console.log("Get All Product error")
    }); 
}
