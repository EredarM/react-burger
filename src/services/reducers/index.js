import {combineReducers} from "redux";
import {burgerIngredientReducer} from "./burger-ingredients";
import {burgerConstructorReducer} from "./burger-constructor";
import {ingredientModalReducer} from "./ingredient-modal";
import {orderModalReducer} from "./order-modal";


export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientReducer,
    ingredientModalReducer: ingredientModalReducer,
    orderModalReducer: orderModalReducer,
    burgerConstructor: burgerConstructorReducer
});