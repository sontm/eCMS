import Backend from '../util/Backend';
import Helpers from '../util/Helpers'
import cloneDeep from 'lodash/cloneDeep';

const HOME_RECENT_VIEW = 'HOME_RECENT_VIEW';

const initialState = {
    recentViews:[]
};

export const actHomeGetRecentView= (productIds) => (dispatch) => {
    Backend.getSomeProducts({productIds:productIds},
        response => {
            console.log("actHomeGetRecentView Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: HOME_RECENT_VIEW,
                payload:  response.data
            });
        },
        error => {
            console.log("actHomeGetRecentView error")
        }); 
}


// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case HOME_RECENT_VIEW:
        return {
            ...state,
            recentViews: action.payload
        };
    
    default:
        return state;
    }
}
