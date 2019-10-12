import Backend from '../util/Backend';
import {levelingCategory} from '../util/Helpers'

const CATE_GET_OK = 'CATE_GET_OK';
const CATE_GET_ERR = 'CATE_GET_ERR';
const BRAND_GET_OK = 'BRAND_GET_OK';

    //categoriesLevel:  "BanhKeo":{
  //       "id": 1,
  //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
  //     },
const initialState = {
    categories: [],
    categoriesLevel:{},
    brands: [],
    brandsColumnize: [],
};

export const actCategoryGet = () => (dispatch) => {
    Backend.getAllCategoriesName(
    response => {
        console.log("Get All Category")
        console.log(response.data)
        dispatch({
            type: CATE_GET_OK,
            payload:  response.data
        });
    },
    error => {
        console.log("Get All Category error")
    }); 
}
export const actBrandsGet = () => (dispatch) => {
    Backend.getAllBrandsName(
    response => {
        console.log("actBrandsGet")
        console.log(response.data)
        dispatch({
            type: BRAND_GET_OK,
            payload:  response.data
        });
    },
    error => {
        console.log("actBrandsGet error")
    }); 
}

//from [{}] => [[{}], [{}]]
function columnizeBrand(brands) {
    // TODO
    // Now divide equivalents 2 columns
    let column1=[];
    let column2=[];

    if (brands && brands.length) {
        brands.forEach((element, idx) => {
            if (idx % 2 == 0) {
                column1.push(element)
            } else {
                column2.push(element)
            }
        });
    }
    return [column1, column2];
}

// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case CATE_GET_OK:
        let levelCategory = levelingCategory(action.payload)
        return {
            ...state,
            categories: action.payload,
            categoriesLevel:levelCategory
        };
    case BRAND_GET_OK:
        return {
            ...state,
            brands: action.payload,
            brandsColumnize: columnizeBrand(action.payload)
        };
    case CATE_GET_ERR:
        return {
            ...state,
            categories: [],
            categoriesLevel:{}
        };
    default:
        return state;
    }
  }

  
