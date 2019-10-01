import Backend from '../util/Backend';
import Helpers from '../util/Helpers'
import cloneDeep from 'lodash/cloneDeep';

import AppContant from '../util/AppConstant'

const USER_LOGIN_OK = 'USER_LOGIN_OK';
const USER_LOGIN_START = 'USER_LOGIN_START';
const USER_PROFILE_START = 'USER_PROFILE_START';
const USER_PROFILE_OK = 'USER_PROFILE_OK';
const USER_PROFILE_ERR = 'USER_PROFILE_ERR';

const USER_GET_RECENTVIEWS = 'USER_GET_RECENTVIEWS';
const USER_GET_FAVORITES = 'USER_GET_FAVORITES';
const USER_GET_CARTITEMS = 'USER_GET_CARTITEMS';
const USER_UPDATE_CARTITEM = 'USER_UPDATE_CARTITEM';

const USER_LOGOUT= 'USER_LOGOUT';

// userProfile
    // id, userId(FB, Google, username), email,phone,fullName,pictureUrl,userType(local, facebook, google),accessToken
const initialState = {
    isLogined: false,
    isLoading: false,
    isFirstFetched: false,
    userProfile: null,
    recentViews:[],
    favorites: [],
    cartItems: []
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
            dispatch({
                type: USER_PROFILE_ERR
            });
        });
}


export const actUserAddRecentViews = (userId, productId) => (dispatch) => {
    console.log("  actUserAddRecentViews:" + userId + ",productId:" + productId)
    Backend.addUserRecentViews(userId, productId,
        response => {
            console.log("actUserAddRecentViews Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
        },
        error => {
            console.log("actUserAddRecentViews error")
        }); 
}
export const actUserGetRecentViews = (userId) => (dispatch) => {
    console.log("  actUserGetRecentViews")
    Backend.getUserRecentViews(userId,
        response => {
            console.log("actUserGetRecentViews Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: USER_GET_RECENTVIEWS,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserGetProfile error")
        }); 
}



export const actUserAddFavorites = (userId, productId) => (dispatch) => {
    console.log("  actUserAddFavorites:" + userId + ",productId:" + productId)
    Backend.addUserFavorites(userId, productId,
        response => {
            console.log("actUserAddFavorites Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
        },
        error => {
            console.log("actUserAddFavorites error")
        }); 
}
export const actUserGetFavorites = (userId) => (dispatch) => {
    console.log("  actUserGetFavorites")
    Backend.getUserFavorites(userId,
        response => {
            console.log("actUserGetFavorites Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: USER_GET_FAVORITES,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserGetFavorites error")
        }); 
}




export const actUserUpdateCartItem = (userId, productId, quantity, isRemoved = false) => (dispatch) => {
    console.log("  actUserUpdateCartItem:" + userId + ",productId:" + productId, ",quantity:" + quantity)
    if (!isRemoved) {
        Backend.addUserCartItem(userId, productId,quantity,
            response => {
                console.log("addUserCartItem Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)
                dispatch({
                    type: USER_UPDATE_CARTITEM,
                    payload:  response.data
                });
            },
            error => {
                console.log("addUserCartItem error")
            }); 
    } else {
        Backend.deleteUserCartItem(userId, productId,
            response => {
                console.log("deleteUserCartItem Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)
                dispatch({
                    type: USER_UPDATE_CARTITEM,
                    payload:  response.data
                });
            },
            error => {
                console.log("deleteUserCartItem error")
            }); 
    }
}
export const actUserGetCartItems = (userId) => (dispatch) => {
    console.log("  actUserGetCartItems")
    Backend.getUserCartItems(userId,
        response => {
            console.log("actUserGetCartItems Done&&&&&&&&&&&&&&&&&&&&&&&&6")
            console.log(response.data)
            dispatch({
                type: USER_GET_CARTITEMS,
                payload:  response.data
            });
        },
        error => {
            console.log("actUserGetCartItems error")
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
            ...state,
            isLogined: true,
            isLoading: false,
            userProfile: action.payload.user
        };
    case USER_PROFILE_OK:
        return {
            ...state,
            isLogined: true,
            isLoading: false,
            userProfile: action.payload
        };
    case USER_PROFILE_ERR:
        return {
            ...state,
            isLogined: false,
            isLoading: false,
            userProfile: null
        }
    case USER_LOGOUT:
        return {
            ...state,
            isLogined: false,
            isLoading: false,
            userProfile: null
        }
    
    case USER_GET_RECENTVIEWS:
        return {
            ...state,
            recentViews: action.payload
        }
    case USER_GET_FAVORITES:
        return {
            ...state,
            favorites: action.payload
        }
    case USER_GET_CARTITEMS:
    case USER_UPDATE_CARTITEM:
        return {
            ...state,
            cartItems: action.payload
        }
    default:
        return state;
    }
}
