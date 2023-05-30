import {REGISTER, REGISTER_ERROR, REGISTER_SUCCESS} from "../actions/user/register";
import {LOGIN, LOGIN_ERROR, LOGIN_SUCCESS} from "../actions/user/login";
import {LOGOUT} from "../actions/user/logout";
import {
    USER,
    USER_AUTH,
    USER_ERROR,
    USER_SUCCESS,
    USER_UNAUTH,
    USER_UPDATE, USER_UPDATE_ERROR,
    USER_UPDATE_SUCCESS
} from "../actions/user/user";

const initialState = {
    isAuthUser: false,
    isAuthUserChecked: false,

    userData: null,

    userRequest: false,
    userRequestSuccess: false,
    userRequestFailed: false,
    userRequestError: null,

    loginRequest: false,
    loginRequestError: null,

    userUpdateRequest: false,
    userUpdateRequestError: null,

    registerRequest: false,
    registerRequestError: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTH: {
            return {
                ...state,
                isAuthUser: true,
                isAuthUserChecked: true
            }
        }
        case USER_UNAUTH: {
            return {
                ...state,
                isAuthUser: false,
                isAuthUserChecked: true
            }
        }
        case USER: {
            return {
                ...state,
                userRequest: true,
                userRequestFailed: false,
                userRequestError: null
            };
        }
        case USER_SUCCESS: {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    email: action.data.email,
                    name: action.data.name,
                },
                userRequest: false,
                userRequestSuccess: true
            };
        }
        case USER_ERROR: {
            return {
                ...state,
                userRequest: false,
                userRequestFailed: true,
                userRequestError: action.error
            };
        }
        case USER_UPDATE: {
            return {
                ...state,
                userUpdateRequest: true
            }
        }
        case USER_UPDATE_SUCCESS: {
            return {
                ...state,
                userData: {
                    ...state.userData,
                    email: action.data.email,
                    name: action.data.name,
                },
                userUpdateRequest: false,
            }
        }
        case USER_UPDATE_ERROR: {
            return {
                ...state,
                userUpdateRequest: false,
                userUpdateRequestError: action.error
            }
        }
        case LOGIN: {
            return {
                ...state,
                loginRequest: true,
                loginRequestError: null
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                userData: {
                    email: action.data.email,
                    name: action.data.name,
                },
                loginRequest: false,
                isAuthUser: true
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginRequest: false,
                loginRequestError: action.error,
                isAuthUser: false
            };
        }
        case REGISTER: {
            return {
                ...state,
                registerRequest: true,
                registerRequestError: null
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                userData: {
                    email: action.data.email,
                    name: action.data.name,
                },
                registerRequest: false,
                isAuthUser: true
            };
        }
        case REGISTER_ERROR: {
            return {
                ...state,
                registerRequest: false,
                registerRequestError: action.error,
                isAuthUser: false
            };
        }
        case LOGOUT: {
            return {
                ...state,
                userData: null,
                isAuthUser: false,
                isAuthUserChecked: false
            };
        }
        default: {
            return state;
        }
    }
};