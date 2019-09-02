import {
    CATE_GET_OK,CATE_GET_ERR
  } from '../actions/CategoryActions'

const initialState = {
    categories: [],
};

// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case CATE_GET_OK:
        return {
            ...state,
            categories: action.payload
        };
    case CATE_GET_ERR:
        return {
            ...state,
            categories: []
        };
    default:
        return state;
    }
  }

  
