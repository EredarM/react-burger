import {signOut} from "../../../utils/burger-api";
import {deleteCookie, getCookie} from "../../../utils/сookie";

export const LOGOUT = 'LOGOUT';

const logoutSuccess = () => {
    return {
        type: LOGOUT,
    };
};

export const logout = () => async (dispatch) => {
    const postData = {
        token: getCookie('refreshToken')
    };
    try {
        await signOut(postData)
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch(logoutSuccess());
    } catch (err) {
        alert('Произошла ошибка при выходе')
    }
};