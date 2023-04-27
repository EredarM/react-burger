export const ADD_INGREDIENT_MODAL = 'ADD_INGREDIENT_MODAL';
export const REMOVE_INGREDIENT_MODAL = 'REMOVE_INGREDIENT_MODAL';

export const addIngredientModalData = (item) => {
    return {
        type: ADD_INGREDIENT_MODAL,

        name: item.name,
        image_large: item.image_large,
        calories: item.calories,
        proteins: item.proteins,
        fat: item.fat,
        carbohydrates: item.carbohydrates
    };
};

export const removeIngredientModalData = () => {
    return {
        type: REMOVE_INGREDIENT_MODAL,
    };
};