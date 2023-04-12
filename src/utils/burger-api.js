const NORMA_API = 'https://norma.nomoreparties.space/api';

export function getIngredients() {
    return fetch(`${NORMA_API}/ingredients`)
        .then(checkResponse);
}

const checkResponse = (res) => {
    return res.ok ?
        res.json()
        : res.json()
            .then((err) => Promise.reject(err));
};