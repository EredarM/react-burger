import {
    GET_BURGER_INGREDIENTS,
    GET_BURGER_INGREDIENTS_SUCCESS,
    GET_BURGER_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';

const initialState = {
    burgerIngredientsRequest: false,
    burgerIngredientsRequestSuccess: false,
    burgerIngredientsFailed: false,
    data: []
};

export const burgerIngredientReducer = (state= initialState, action) => {
    switch (action.type) {
        case GET_BURGER_INGREDIENTS:
            return {
                ...state,
                burgerIngredientsRequest: true,
                burgerIngredientsFailed: false
            };
        case GET_BURGER_INGREDIENTS_SUCCESS:
            return {
                ...state,
                data: action.data,
                burgerIngredientsRequest: false,
                burgerIngredientsRequestSuccess: true
            };
        case GET_BURGER_INGREDIENTS_FAILED:
            return {
                ...state,
                burgerIngredientsRequest: false,
                burgerIngredientsFailed: true
            };
        default: {
            return state;
        }
    }
};














