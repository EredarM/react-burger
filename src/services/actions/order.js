import {postIngredients} from "../../utils/burger-api";

export const ADD_ORDER = 'ADD_ORDER';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_ERROR = 'ADD_ORDER_ERROR';
export const REMOVE_ORDER_MODAL = 'REMOVE_ORDER_MODAL';


const addOrderSuccess = (data) => {
    return {
        type: ADD_ORDER_SUCCESS,
        data: data
    }
}

const addOrderFailed = () => {
    return {
        type: ADD_ORDER_ERROR,
    }
}

export const addOrderModalData = (bun, ingredients) => async (dispatch) => {
    dispatch({
        type: ADD_ORDER
    });

    const bunId = bun._id;
    const ingredientIds = ingredients.map(item => item.data._id);

    const postData = {
        'ingredients' : [...ingredientIds, bunId]
    };

    try {
        const response = await postIngredients(postData);
        dispatch(addOrderSuccess(response));
    } catch (err) {
        dispatch(addOrderFailed());
        alert("Ошибка заказа");
    }
};

export const removeOrderModalData = () => {
    return {
        type: REMOVE_ORDER_MODAL,
    };
};