import {v4 as uuid} from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REORDER_INGREDIENTS = 'REORDER_INGREDIENTS';


export const addIngredient = (item) => {
    return {
        type: ADD_INGREDIENT,
        item: {
            uniqueId: uuid(),
            type: item.type,
            itemId: item.id
        }
    }
}

export const removeIngredient = (itemId) => {
    return {
        type: REMOVE_INGREDIENT,
        uniqueId: itemId
    }
}

export const reorderIngredients = (from, to) => {
    return {
        type: REORDER_INGREDIENTS,
        from: from,
        to: to
    }
}