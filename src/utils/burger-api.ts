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
    TForgotPasswordUser,
    TLogoutUser,
    TRegisterUser,
    TResetPasswordUser,
    TUpdateUser,
    IUpdateUser,
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
    const result = await fetch(`${NORMA_API}${INGREDIENTS_API}`);
    const data = await checkResponse(result);
    return extractResponse(data);
}

export async function fetchUser(): Promise<TUpdateUser> {
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
    return await securityFetch(fetchUserRequest, accessToken);
}

export async function patchUser(body: IUpdateUser): Promise<TUpdateUser> {
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
    return await securityFetch(patchUserRequest, accessToken);
}

export async function postIngredients(body: Array<number>) {
    const result = await fetch(`${NORMA_API}${ORDER_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await checkResponse(result);
    return extractResponse(data);
}

export async function signIn(body: TUser) {
    const result = await fetch(`${NORMA_API}${LOGIN_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await checkResponse(result);
    return extractResponse(data);
}

export async function signUp(body: TRegisterUser) {
    const result = await fetch(`${NORMA_API}${REGISTER_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await checkResponse(result);
    return extractResponse(data);
}

export async function signOut(body: TLogoutUser) {
    const result = await fetch(`${NORMA_API}${LOGOUT_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await checkResponse(result);
    return extractResponse(data);
}

export async function forgotPasswordRequest(body: TForgotPasswordUser) {
    const result = await fetch(`${NORMA_API}${FORGOT_PASSWORD_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await checkResponse(result);
    return extractResponse(data)
}

export async function resetPasswordRequest(body: TResetPasswordUser) {
    const result = await fetch(`${NORMA_API}${RESET_PASSWORD_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const data = await checkResponse(result);
    return extractResponse(data)
}

async function refreshTokenRequest() {
    const result = await fetch(`${NORMA_API}${TOKEN_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    });
    const data = await checkResponse(result);
    return extractResponse(data);
}

async function securityFetch(
    fetchCallback: (authToken: string) => Promise<Response>,
    authToken?: string
): Promise<any> {
    if (!authToken) {
        throw Error('Отсутствуют данные авторизации');
    }

    try {
        const result = await fetchCallback(authToken);
        const data = await checkResponse(result);
        const x = extractResponse(data);
        console.log(x)
        return x;
    } catch (err) {
        if (err !== JWT_EXPIRED_ERROR) {
            return err;
        }
        const responseToken = await refreshTokenRequest();

        setCookie('accessToken', responseToken.accessToken);
        setCookie('refreshToken', responseToken.refreshToken);

        const newAuthToken = getCookie('accessToken');
        if (newAuthToken) {
            return securityFetch(fetchCallback, newAuthToken);
        }
        return Promise.reject(err);
    }
}

const checkResponse = (res: Response): Promise<string> => {
    return res.ok ?
        res.json()
        : res.json().then((err) => {
            let result;
            console.log(err)
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