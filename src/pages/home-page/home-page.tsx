import React from "react";
import {useSelector} from 'react-redux';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

import styles from "./home.module.css";
import global from "../../index.module.css";

const HomePage = () => {
    // @ts-ignore TODO to next sprint
    const {burgerIngredientsRequestSuccess} = useSelector(store => store.burgerIngredients);

    return (
        <>
            {
                burgerIngredientsRequestSuccess && (
                    <div className={`${global.container} ${styles.main__wrapper}`}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </DndProvider>
                    </div>
                )
            }
        </>
    );
}

export default HomePage;
