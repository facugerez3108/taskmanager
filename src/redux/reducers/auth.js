import { SIGNIN_SUCCES, SIGNIN_FAIL, SIGNUP_SUCCES, SIGNUP_FAIL, AUTHENTICATED_SUCCESS, 
    AUTHENTICATED_FAIL, SET_AUTH_LOADING, REMOVE_AUTH_LOADING, ACTIVATION_SUCCESS, ACTIVATION_FAIL, LOGOUT, USER_LOAD_SUCCESS,
     USER_LOAD_FAIL, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_CONFIRM_FAIL, REFRESH_SUCCESS, REFRESH_FAIL} from "../actions/types";
import Cookies from "js-cookie";

const initalState = {
    token: Cookies.get('token'),
    refresh: Cookies.get('refresh'),
    isAuthenticated: false,
    loading: false,
    user: null,
}

export default function Auth (state = initalState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false,
            }
        case USER_LOAD_SUCCESS:
            return {
                ...state,
                user: payload,
            }
        case USER_LOAD_FAIL:
            return {
                ...state,
                user: false,
            }
        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
            }
        case AUTHENTICATED_FAIL:
            Cookies.remove('token');
            Cookies.remove('refresh');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                refresh: null,
            }
        case SIGNIN_SUCCES:
            Cookies.set('token', payload.token);
            Cookies.set('refresh', payload.refresh);    
            return{
                ...state,
                isAuthenticated: true,
                token: Cookies.get('token'),
                refresh: Cookies.get('refresh'),
            }
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_FAIL:
        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_CONFIRM_FAIL:
            return{
                ...state
            }
        case REFRESH_SUCCESS:
            Cookies.set('refresh', payload.token);
            return{
                ...state,
                token: Cookies.get('refresh'),
            }
        case SIGNUP_SUCCES:
        case SIGNUP_FAIL:
            Cookies.remove('token');
            Cookies.remove('refresh');
            return{
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                refresh: null,
            }
        case SIGNIN_FAIL:
        case REFRESH_FAIL:
        case LOGOUT:
            Cookies.remove('Authorization');
            return {
                ...state,
                user: null,
                token: null,
                refresh: null,
            }


        default: return state;
    }
}
