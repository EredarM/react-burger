import {signUp} from "../../../utils/burger-api";
import {setCookie} from "../../../utils/сookie";

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';


const registerRequest = () => {
    return {
        type: REGISTER
    };
};

const registerSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        data: data
    };
};

const registerError = (error) => {
    return {
        type: REGISTER_ERROR,
        error: error
    };
};

export const register = (email, password, name) => async (dispatch) => {
    dispatch(registerRequest());

    const postData = {
        "email": email,
        "password": password,
        "name": name
    };

    try {
        const response = await signUp(postData);
        setCookie('accessToken', response.accessToken);
        setCookie('refreshToken', response.refreshToken);
        dispatch(registerSuccess(response.user));
    } catch (err) {
        dispatch(registerError(err));
        alert("Ошибка регистрации");
    }
};