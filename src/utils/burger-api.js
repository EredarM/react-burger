const NORMA_API = 'https://norma.nomoreparties.space/api';

export function getIngredients(dispatchCallBack) {
    return fetch(`${NORMA_API}/ingredients`)
        .then(checkResponse)
        .then(dispatchCallBack);
}

export function postIngredients(body, dispatchCallBack) {
    return fetch(`${NORMA_API}/orders`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(checkResponse)
        .then(dispatchCallBack);
}

const checkResponse = (res) => {
    return res.ok ?
        res.json()
        : res.json()
            .then((err) => Promise.reject(err));
};