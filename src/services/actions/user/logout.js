import {signOut} from "../../../utils/burger-api";
import {deleteCookie, getCookie} from "../../../utils/сookie";

export const LOGOUT = 'LOGOUT';

const logoutSuccess = () => {
    return {
        type: LOGOUT,
    };
};

export const logout = () => (dispatch) => {
    const postData = {
        token: getCookie('refreshToken')
    };

    signOut(postData)
        .then(() => {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            dispatch(logoutSuccess());
        })
        .catch(() => {
            alert('Произошла ошибка при выходе')
        });
};