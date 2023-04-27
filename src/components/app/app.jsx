import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getBurgerIngredients} from "../../services/actions/burger-ingredients";

import styles from "./app.module.css";
import global from "../../index.module.css";

const App = () => {
    const dispatch = useDispatch();
    const {burgerIngredientsRequestSuccess} = useSelector(store => store.burgerIngredients);
    React.useEffect(
        () => {
            dispatch(getBurgerIngredients())
        },
        []
    );

    return (
        <>
            <AppHeader/>
            {
                burgerIngredientsRequestSuccess && (
                    <main className={`${styles.main} pb-10`}>
                        <div className={`${global.container} ${styles.main__wrapper}`}>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients/>
                                <BurgerConstructor/>
                            </DndProvider>
                        </div>
                    </main>
                )
            }
        </>
    );
}

export default App;
