import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientElements from "./burger-ingredient-elements/burger-ingredient-elements";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import styles from './burger-ingredients.module.css';
import global from '../../index.module.css';

const BurgerIngredientNav = ({tabs}) => {
    const [current, setCurrent] = React.useState('bun');

    const handleTabClick = (e) => setCurrent(e);

    React.useEffect(
        () => {
            const target = document.querySelector(`#${current}`);
            target.scrollIntoView();
        },
        [current]
    );

    return (
        <nav className={`mb-10`}>
            <ul className={`${styles.section__btnContainer}`}>
                {
                    tabs.map(item => (
                        <li key={item.code} className={`${styles.section__btnContainer_item}`}>
                            <Tab key={item.code} value={item.code} active={current === item.code}
                                 onClick={handleTabClick}>
                                {item.ruCode}
                            </Tab>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
}

const BurgerIngredients = ({data}) => {
    const tabs = [
        {code: 'bun', ruCode: 'Булки'},
        {code: 'sauce', ruCode: 'Соусы'},
        {code: 'main', ruCode: 'Начинки'}
    ];

    const [ingredientModalData, setIngredientModalData] = React.useState(null);

    const handleOpenModal = (item) => {
        setIngredientModalData({
            name: item.name,
            image_large: item.image_large,
            calories: item.calories,
            proteins: item.proteins,
            fat: item.fat,
            carbohydrates: item.carbohydrates
        })
    };
    const handleCloseModal = () => setIngredientModalData(null);

    const buns = React.useMemo(
        () => data.filter(item => item.type === 'bun'),
        [data]
    );
    const mains = React.useMemo(
        () => data.filter(item => item.type === 'main'),
        [data]
    );
    const sauces = React.useMemo(
        () => data.filter(item => item.type === 'sauce'),
        [data]
    );

    return (
        <section className={`${styles.main__section_left} pt-10`}>
            <h1 className={'text text_type_main-large mb-5'}>Соберите бургер</h1>
            <BurgerIngredientNav tabs={tabs}/>
            <div className={`${global.section__scrollWrapper} scroll`}>
                <BurgerIngredientElements id={'bun'} headerText={'Булки'} data={buns} onClick={handleOpenModal}/>
                <BurgerIngredientElements id={'sauce'} headerText={'Соусы'} data={sauces} onClick={handleOpenModal}/>
                <BurgerIngredientElements id={'main'} headerText={'Начинка'} data={mains} onClick={handleOpenModal}/>
                {ingredientModalData && (
                    <Modal onClose={handleCloseModal} title={"Детали ингредиента"}>
                        <IngredientDetails name={ingredientModalData.name}
                                           carbohydrates={ingredientModalData.carbohydrates}
                                           proteins={ingredientModalData.proteins}
                                           fat={ingredientModalData.fat}
                                           calories={ingredientModalData.calories}
                                           image_large={ingredientModalData.image_large}/>
                    </Modal>
                )}
            </div>
        </section>
    );
}

export default BurgerIngredients;