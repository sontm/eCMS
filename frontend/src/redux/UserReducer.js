import Backend from '../util/Backend';
import Helpers from '../util/Helpers'
import cloneDeep from 'lodash/cloneDeep';

import AppContant from '../util/AppConstant'

const USER_LOGIN_OK = 'USER_LOGIN_OK';
const USER_LOGIN_START = 'USER_LOGIN_START';
const USER_PROFILE_START = 'USER_PROFILE_START';
const USER_PROFILE_OK = 'USER_PROFILE_OK';
const USER_PROFILE_ERR = 'USER_PROFILE_ERR';

const USER_LOGOUT= 'USER_LOGOUT';

const initialState = {
    isLogined: false,
    isLoading: false,
    userProfile: null
};

export const actUserLogout = () => (dispatch) => {
    console.log("  actUserLogout")
    localStorage.removeItem(AppContant.LOCAL_CSRF_TOKEN)
    dispatch({
        type: USER_LOGOUT,
        payload:  ""
    });
}

export const actUserLogin = ({username, password}, history) => (dispatch) => {
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

export const actUserAddLoginWithFaceBook = (values, history) => (dispatch) => {
    console.log("  actUserAddLoginWithFaceBook")
    Backend.addLoginWithFacebook(values,
        response => {
            console.log("actUserAddLoginWithFaceBook Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            localStorage.setItem(AppContant.LOCAL_CSRF_TOKEN, response.data.csrf)
            dispatch({
                type: USER_LOGIN_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserAddLoginWithFaceBook error")
        }); 
}

export const actUserAddLoginWithGoogle = (values, history) => (dispatch) => {
    console.log("  actUserAddLoginWithGoogle")
    Backend.addLoginWithGoogle(values,
        response => {
            console.log("actUserAddLoginWithGoogle Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            localStorage.setItem(AppContant.LOCAL_CSRF_TOKEN, response.data.csrf)
            dispatch({
                type: USER_LOGIN_OK,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserAddLoginWithGoogle error")
        }); 
}

export const actUserGetProfile = () => (dispatch) => {
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
            console.log("actUserGetProfile error")
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
            userProfile: action.payload.user
        };
    case USER_PROFILE_OK:
        return {
            isLogined: true,
            isLoading: false,
            userProfile: action.payload
        };
    case USER_PROFILE_ERR:
        return {
            isLogined: false,
            isLoading: false,
            userProfile: null
        }
    case USER_LOGOUT:
        return {
            isLogined: false,
            isLoading: false,
            userProfile: null
        }
    default:
        return state;
    }
}
