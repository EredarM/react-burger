import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useInView} from 'react-intersection-observer';


import BurgerIngredientElements from "./burger-ingredient-elements/burger-ingredient-elements";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {addIngredientModalData, removeIngredientModalData} from "../../services/actions/ingredient-modal";

import styles from './burger-ingredients.module.css';
import global from '../../index.module.css';

const BurgerIngredients = () => {
    const tabs = [
        {code: 'bun', ruCode: 'Булки'},
        {code: 'sauce', ruCode: 'Соусы'},
        {code: 'main', ruCode: 'Начинки'}
    ];

    const dispatch = useDispatch();

    const data = useSelector(store => store.burgerIngredients.data);
    const {isOpen, modalData} = useSelector(store => store.ingredientModalReducer)

    const handleOpenModal = (item) => dispatch(addIngredientModalData(item));
    const handleCloseModal = () => dispatch(removeIngredientModalData());

    const [currentTap, setCurrentTap] = React.useState('bun');

    const [bunRef, inBunView] = useInView();
    const [mainRef, inMainView] = useInView();
    const [sauceRef, inSauceView] = useInView();

    const handleTabClick = (e) => setCurrentTap(e);

    React.useEffect(
        () => {
            const target = document.querySelector(`#${currentTap}`);
            target.scrollIntoView();
        },
        [currentTap]
    );

    React.useEffect(() => {
            if (inBunView) {
                setCurrentTap('bun')
            } else if (inSauceView) {
                setCurrentTap('sauce')
            } else if (inMainView) {
                setCurrentTap('main')
            }
        },
        [inBunView, inSauceView, inMainView]
    );


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
            <nav className={`mb-10`}>
                <ul className={`${styles.section__btnContainer}`}>
                    {
                        tabs.map(item => (
                            <li key={item.code}>
                                <Tab key={item.code} value={item.code} active={currentTap === item.code}
                                     onClick={handleTabClick}>
                                    {item.ruCode}
                                </Tab>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className={`${global.section__scrollWrapper} scroll`}>
                <div ref={bunRef}>
                    <BurgerIngredientElements
                        id={'bun'}
                        headerText={'Булки'}
                        data={buns}
                        onClick={handleOpenModal}/>
                </div>
                <div ref={sauceRef}>
                    <BurgerIngredientElements
                        id={'sauce'}
                        headerText={'Соусы'}
                        data={sauces}
                        onClick={handleOpenModal}/>
                </div>
                <div ref={mainRef}>
                    <BurgerIngredientElements
                        id={'main'}
                        headerText={'Начинка'}
                        data={mains}
                        onClick={handleOpenModal}/>
                </div>
                {isOpen && (
                    <Modal onClose={handleCloseModal} title={"Детали ингредиента"}>
                        <IngredientDetails name={modalData.name}
                                           carbohydrates={modalData.carbohydrates}
                                           proteins={modalData.proteins}
                                           fat={modalData.fat}
                                           calories={modalData.calories}
                                           image_large={modalData.image_large}/>
                    </Modal>
                )}
            </div>
        </section>
    );
}

export default BurgerIngredients;