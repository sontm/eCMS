import {
    CATE_GET_OK,CATE_GET_ERR
  } from './CategoryActions'
import {levelingCategory} from '../util/Helpers'
const initialState = {
    categories: [],
    categoriesLevel:{}
};



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

  
