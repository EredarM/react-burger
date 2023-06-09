import {signIn} from "../../../utils/burger-api";
import {setCookie} from "../../../utils/сookie";

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';


const loginRequest = () => {
    return {
        type: LOGIN
    };
};

const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        data: data
    };
};

const loginError = (err) => {
    return {
        type: LOGIN_ERROR,
        error: err
    };
};

export const login = (email, password) => async (dispatch) => {
    dispatch(loginRequest());

    const postData = {
        "email": email,
        "password": password
    };
    try {
        const response = await signIn(postData);
        setCookie('accessToken', response.accessToken);
        setCookie('refreshToken', response.refreshToken);
        dispatch(loginSuccess(response.user));
    } catch (err) {
        dispatch(loginError(err));
        alert('Произошла ошибка при входе')
    }
};