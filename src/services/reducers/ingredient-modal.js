import {
    ADD_INGREDIENT_MODAL,
    REMOVE_INGREDIENT_MODAL
} from "../actions/ingredient-modal";

const initialState = {
    isOpen: false,
    modalData: {
        name: null,
        image_large: null,
        calories: null,
        proteins: null,
        fat: null,
        carbohydrates: null
    }
}

export const ingredientModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_MODAL:
            return {
                isOpen: true,
                modalData: {
                    name: action.name,
                    image_large: action.image_large,
                    calories: action.calories,
                    proteins: action.proteins,
                    fat: action.fat,
                    carbohydrates: action.carbohydrates
                }
            };
        case REMOVE_INGREDIENT_MODAL:
            return {
                isOpen: false,
                modalData: {}
            };
        default: {
            return state;
        }

    }
};