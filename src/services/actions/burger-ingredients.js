import {getIngredients} from "../../utils/burger-api";

export const GET_BURGER_INGREDIENTS = 'GET_BURGER_INGREDIENTS';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED';

const getBurgerIngredientsRequest = () => {
    return {
        type: GET_BURGER_INGREDIENTS
    };
};

const getBurgerIngredientsSuccess = (data) => {
    return {
        type: GET_BURGER_INGREDIENTS_SUCCESS,
        data: data
    }
};

const getBurgerIngredientsFailed = () => {
    return {
        type: GET_BURGER_INGREDIENTS_FAILED
    }
};

export const getBurgerIngredients = () => async (dispatch) => {
    dispatch(getBurgerIngredientsRequest());
    try {
        const ingredientsResponse = await getIngredients();
        dispatch(getBurgerIngredientsSuccess(ingredientsResponse.data));
    } catch (err) {
        dispatch(getBurgerIngredientsFailed());
        alert(`Ошибка загрузка данных: ${err}`);
    }
};


