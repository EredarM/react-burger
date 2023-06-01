import {getCookie, setCookie} from "./сookie";
import {
    JWT_EXPIRED_ERROR,
    LOGIN_ERROR,
    LOGIN_ERROR_RU,
    REGISTER_ERROR,
    REGISTER_ERROR_RU,
    TOKEN_REFRESH_ERROR,
    TOKEN_REFRESH_ERROR_RU,
    UNKNOWN_ERROR_RU
} from "../services/static/constant-error";
import {
    IUpdateUser,
    TForgotPasswordUser,
    TLogoutUser,
    TRegisterUser,
    TResetPasswordUser,
    TUpdateUser,
    TUser
} from "../../declarations/types";

const NORMA_API = 'https://norma.nomoreparties.space/api';

const INGREDIENTS_API = '/ingredients';
const USER_API = '/auth/user';

const ORDER_API = '/orders';
const LOGIN_API = '/auth/login';
const REGISTER_API = '/auth/register';
const LOGOUT_API = '/auth/logout';
const TOKEN_API = '/auth/token';
const FORGOT_PASSWORD_API = '/password-reset';
const RESET_PASSWORD_API = '/password-reset/reset';


export async function getIngredients() {
    return request(INGREDIENTS_API);
}

export async function fetchUser(): Promise<IUpdateUser> {
    function fetchUserRequest(authToken: string): Promise<Response> {
        return fetch(`${NORMA_API}${USER_API}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                Authorization: authToken,
            },
        });
    }

    const accessToken = getCookie('accessToken');
    return await securityRequest(fetchUserRequest, accessToken);
}

export async function patchUser(body: TUpdateUser): Promise<IUpdateUser> {
    function patchUserRequest(authToken: string): Promise<Response> {
        return fetch(`${NORMA_API}${USER_API}`, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
            body: JSON.stringify(body)
        });
    }

    const accessToken = getCookie('accessToken');
    return await securityRequest(patchUserRequest, accessToken);
}

export async function postIngredients(body: Array<number>) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return request(ORDER_API, options);
}

export async function signIn(body: TUser) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return request(LOGIN_API, options);
}

export async function signUp(body: TRegisterUser) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return request(REGISTER_API, options);
}

export async function signOut(body: TLogoutUser) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return request(LOGOUT_API, options);
}

export async function forgotPasswordRequest(body: TForgotPasswordUser) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return request(FORGOT_PASSWORD_API, options);
}

export async function resetPasswordRequest(body: TResetPasswordUser) {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    return request(RESET_PASSWORD_API, options);
}

async function refreshTokenRequest() {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    };
    return request(TOKEN_API, options);
}

async function securityRequest(
    fetchCallback: (authToken: string) => Promise<Response>,
    authToken?: string
): Promise<any> {
    if (!authToken) {
        throw Error('Отсутствуют данные авторизации');
    }

    try {
        const result = await fetchCallback(authToken);
        const data = await checkResponse(result);
        return extractResponse(data);
    } catch (err) {
        if (err !== JWT_EXPIRED_ERROR) {
            return err;
        }
        const responseToken = await refreshTokenRequest();

        setCookie('accessToken', responseToken.accessToken);
        setCookie('refreshToken', responseToken.refreshToken);

        const newAuthToken = getCookie('accessToken');
        if (newAuthToken) {
            return securityRequest(fetchCallback, newAuthToken);
        }
        return Promise.reject(err);
    }
}

const request = async (endpoint: string, options?: any): Promise<any> => {
    return await fetch(`${NORMA_API}${endpoint}`, options)
        .then(checkResponse)
        .then(extractResponse);
};

const checkResponse = (res: Response): Promise<string> => {
    return res.ok ?
        res.json()
        : res.json().then((err) => {
            let result;
            switch (err.message) {
                case LOGIN_ERROR:
                    result = Promise.reject(LOGIN_ERROR_RU);
                    break;
                case REGISTER_ERROR:
                    result = Promise.reject(REGISTER_ERROR_RU);
                    break;
                case TOKEN_REFRESH_ERROR:
                    result = Promise.reject(TOKEN_REFRESH_ERROR_RU);
                    break;
                case JWT_EXPIRED_ERROR:
                    result = Promise.reject(JWT_EXPIRED_ERROR);
                    break;
                default:
                    result = Promise.reject(`${UNKNOWN_ERROR_RU}: ${JSON.stringify(err)}`);
                    break;
            }
            return result;
        });
};
const extractResponse = (response: { success: string } & any) => {
    return response?.success ? response : Promise.reject(response);
};