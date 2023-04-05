import React from "react";

import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";

import global from '../../index.module.css';
import styles from './MainConstructor.module.css';

class MainConstructor extends React.Component {
    render() {
        return (
            <main className={`${styles.main} pb-10`}>
                <div className={`${global.container} ${styles.main__wrapper}`}>
                    <BurgerConstructor/>
                    <BurgerIngredients/>
                </div>
            </main>
        );
    }
}

export default MainConstructor;