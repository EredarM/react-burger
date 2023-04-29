import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    REORDER_INGREDIENTS
} from '../actions/burger-constructor';
import {BUN} from "../static/constant";

const initialState = {
    ingredients: [],
    bun: null
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            if (action.item.type === BUN) {
                return {
                    ...state,
                    bun: {
                        uniqueId: action.item.uniqueId,
                        itemId: action.item.itemId
                    }
                }
            }

            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter(element => element.itemId !== action.itemId),
                    {
                        uniqueId: action.item.uniqueId,
                        itemId: action.item.itemId
                    }
                ]
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uniqueId !== action.uniqueId)
            }
        case REORDER_INGREDIENTS:
            const ingredients = [...state.ingredients];
            ingredients.splice(
                action.to,
                0,
                ingredients.splice(
                    action.from,
                    1
                )[0]
            )
            return {
                ...state,
                ingredients: ingredients
            };
        default:
            return state;
    }
};