import {getCookie, setCookie} from "./сookie";

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


export function getIngredients(dispatchCallBack) {
    return fetch(`${NORMA_API}${INGREDIENTS_API}`)
        .then(checkResponse)
        .then(dispatchCallBack);
}

export async function fetchUser() {
    function fetchUserRequest(authToken) {
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
    return securityFetch(fetchUserRequest, accessToken);
}

export async function patchUser(body) {
    function patchUserRequest(authToken, body) {
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
    return securityFetch(patchUserRequest, accessToken, body);
}

export function postIngredients(body) {
    return fetch(`${NORMA_API}${ORDER_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(checkResponse)
        .then(extractResponse);
}

export function signIn(body) {
    return fetch(`${NORMA_API}${LOGIN_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(checkResponse)
        .then(extractResponse);
}

export function signUp(body) {
    return fetch(`${NORMA_API}${REGISTER_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(checkResponse)
        .then(extractResponse);
}

export function signOut(body) {
    return fetch(`${NORMA_API}${LOGOUT_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(checkResponse);
}

export function forgotPasswordRequest(body) {
    return fetch(`${NORMA_API}${FORGOT_PASSWORD_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(checkResponse)
        .then(extractResponse);
}

export function resetPasswordRequest(body) {
    return fetch(`${NORMA_API}${RESET_PASSWORD_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(checkResponse)
        .then(extractResponse);
}

async function refreshTokenRequest() {
    fetch(`${NORMA_API}${TOKEN_API}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    })
        .then(checkResponse)
        .then(extractResponse)
        .then(response => {
            setCookie('accessToken', response.accessToken);
            setCookie('refreshToken', response.refreshToken);
        });
}

async function securityFetch(fetchCallback, authToken, body) {
    try {
        return await fetchCallback(authToken, body)
            .then(checkResponse)
            .then(extractResponse);
    } catch (err) {
        if (err.message === 'jwt expired') {
            await refreshTokenRequest();
        }
        const newAuthToken = getCookie('refreshToken')
        return await fetchCallback(newAuthToken, body)
            .then(checkResponse)
            .then(extractResponse);
    }
}

const checkResponse = (res) => {
    return res.ok ?
        res.json()
        : res.json()
            .then((err) => Promise.reject(err));
};

const extractResponse = (response) => {
    if (response?.success) {
        return response;
    } else {
        return Promise.reject(response);
    }
};