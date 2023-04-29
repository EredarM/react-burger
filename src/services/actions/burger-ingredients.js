import {getIngredients} from "../../utils/burger-api";

export const GET_BURGER_INGREDIENTS = 'GET_BURGER_INGREDIENTS';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED';

const getBurgerIngredientsSuccess = (data) => {
    return {
        type: GET_BURGER_INGREDIENTS_SUCCESS,
        data: data
    }
}

const getBurgerIngredientsFailed = () => {
    return {
        type: GET_BURGER_INGREDIENTS_FAILED
    }
}

export const getBurgerIngredients = () => (dispatch) => {
    dispatch({
        type: GET_BURGER_INGREDIENTS
    });

    getIngredients(response => {
        if (response && response.success) {
            dispatch(getBurgerIngredientsSuccess(response.data));
        } else {
            dispatch(getBurgerIngredientsFailed());
        }
    })
        .catch(err => {
            dispatch(getBurgerIngredientsFailed());
            alert("Ошибка загрузка данных");
        });
}


