import Backend from '../util/Backend';
import Helpers from '../util/Helpers'
import cloneDeep from 'lodash/cloneDeep';

import AppContant from '../util/AppConstant'

const USER_LOGIN_OK = 'USER_LOGIN_OK';
const USER_LOGIN_START = 'USER_LOGIN_START';
const USER_PROFILE_START = 'USER_PROFILE_START';
const USER_PROFILE_OK = 'USER_PROFILE_OK';
const USER_PROFILE_ERR = 'USER_PROFILE_ERR';

const initialState = {
    isLogined: false,
    isLoading: false,
    userid: null,
    userrole: null,
    token: ""
};

export const actUserLogin= ({username, password}, history) => (dispatch) => {
    console.log("  Do Login with:" + username + "," + password)
    dispatch({
        type: USER_LOGIN_START,
        payload:  ""
    });
    Backend.login({username, password},
        response => {
            console.log("actUserLogin Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            localStorage.setItem(AppContant.LOCAL_CSRF_TOKEN, response.data.csrf)
            dispatch({
                type: USER_LOGIN_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserLogin error")
        }); 
}
export const actUserGetProfile= () => (dispatch) => {
    console.log("  actUserGetProfile")
    dispatch({
        type: USER_PROFILE_START,
        payload:  ""
    });
    Backend.getUserProfile(
        response => {
            console.log("actUserGetProfile Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: USER_PROFILE_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserLogin error")
        }); 
}


// Note, in this Reducer, cannot Access state.user
export default function(state = initialState, action) {
    switch (action.type) {
    case USER_LOGIN_START:
    case USER_PROFILE_START:
        return {
            ...state,
            isLoading: true
        };
    case USER_LOGIN_OK:
        return {
            isLogined: true,
            isLoading: false,
            userid: action.payload.user.id,
            userrole: action.payload.user.role
        };
    case USER_PROFILE_OK:
        return {
            isLogined: true,
            isLoading: false,
            userid: action.payload.id,
            userrole: action.payload.role
        };
    case USER_PROFILE_ERR:
        return {
            isLogined: false,
            isLoading: false,
            userid: null,
            userrole: null,
            token: ""
        }
    default:
        return state;
    }
}
