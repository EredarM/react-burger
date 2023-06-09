import {combineReducers} from "redux";
import {burgerIngredientReducer} from "./burger-ingredients";
import {burgerConstructorReducer} from "./burger-constructor";
import {ingredientModalReducer} from "./ingredient-modal";
import {orderReducer} from "./order";
import {userReducer} from "./user";


export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientReducer,
    ingredientModalReducer: ingredientModalReducer,
    orderReducer: orderReducer,
    burgerConstructor: burgerConstructorReducer,
    user: userReducer
});