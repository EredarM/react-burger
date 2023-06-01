import {fetchUser, patchUser} from "../../../utils/burger-api";
import {getCookie} from "../../../utils/сookie";

export const USER = 'USER';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';

export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';

export const USER_AUTH = 'USER_AUTH';
export const USER_UNAUTH = 'USER_UNAUTH';


const user = () => {
    return {
        type: USER
    };
};

const userSuccess = (data) => {
    return {
        type: USER_SUCCESS,
        data: data
    };
};

const userError = (data) => {
    return {
        type: USER_ERROR,
        error: data
    };
};

const userUpdate = () => {
    return {
        type: USER_UPDATE
    };
};

const userUpdateSuccess = (data) => {
    return {
        type: USER_UPDATE_SUCCESS,
        data: data
    };
};

const userUpdateError = (data) => {
    return {
        type: USER_UPDATE_ERROR,
        error: data
    };
};

const userAuth = () => {
    return {
        type: USER_AUTH
    };
};

const userUnauth = () => {
    return {
        type: USER_UNAUTH
    };
};

export const updateUser = (email, name, password) => async (dispatch) => {
    dispatch(userUpdate());

    const body = {
        email: email,
        name: name,
        password: password
    };

    try {
        const response = await patchUser(body);
        dispatch(userUpdateSuccess(response.user));
    } catch (err) {
        dispatch(userUpdateError(err));
        alert("Ошибка обновления данных пользователя");
    }
};

const getUser = () => async (dispatch) => {
    dispatch(user());
    try {
        const response = await fetchUser();
        dispatch(userSuccess(response.user));
        dispatch(userAuth());
    } catch (err) {
        dispatch(userError(err));
        alert("Ошибка получения данных пользователя");
    }
};

export const isUserAuth = () => (dispatch) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
        dispatch(getUser());
    } else {
        dispatch(userUnauth())
    }
};