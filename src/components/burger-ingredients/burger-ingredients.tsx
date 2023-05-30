import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useInView} from 'react-intersection-observer';
import {useLocation, useNavigate} from "react-router-dom";

import BurgerIngredientElements from "./burger-ingredient-elements/burger-ingredient-elements";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {addIngredientModalData, removeIngredientModalData} from "../../services/actions/ingredient-modal";

import styles from './burger-ingredients.module.css';
import global from '../../index.module.css';
import {BUN, MAIN, SAUCE} from "../../services/static/constant";
import {TIngredient} from "../../../declarations/types";


const BurgerIngredients = () => {
    const tabs = [
        {code: BUN, ruCode: 'Булки'},
        {code: SAUCE, ruCode: 'Соусы'},
        {code: MAIN, ruCode: 'Начинки'}
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // @ts-ignore TODO to next sprint
    const data = useSelector(store => store.burgerIngredients.data);

    // @ts-ignore TODO to next sprint
    const {modalData} = useSelector(store => store.ingredientModalReducer);

    const handleOpenModal = React.useCallback(
        (item: TIngredient) => {
            dispatch(addIngredientModalData(item));
            navigate(`/ingredients/${item._id}`, {
                state: {
                    baseUrl: location,
                    id: item._id
                },
            });
        },
        [dispatch, navigate, location]
    );

    const handleCloseModal = React.useCallback(
        () => {
            dispatch(removeIngredientModalData());
            navigate(`/`);
        },
        [dispatch, navigate]
    );

    const [currentTap, setCurrentTap] = React.useState<string>(BUN);

    const [bunRef, inBunView] = useInView();
    const [mainRef, inMainView] = useInView();
    const [sauceRef, inSauceView] = useInView();

    const handleTabClick = (e: string) => setCurrentTap(e);

    React.useEffect(
        () => {
            const target = document.querySelector(`#${currentTap}`);
            if (target) {
                target.scrollIntoView();
            }
        },
        [currentTap]
    );

    React.useEffect(() => {
            if (inBunView) {
                setCurrentTap(BUN)
            } else if (inSauceView) {
                setCurrentTap(SAUCE)
            } else if (inMainView) {
                setCurrentTap(MAIN)
            }
        },
        [inBunView, inSauceView, inMainView]
    );


    const buns = React.useMemo(
        // @ts-ignore TODO to next sprint
        () => data.filter(item => item.type === BUN),
        [data]
    );
    const mains = React.useMemo(
        // @ts-ignore TODO to next sprint
        () => data.filter(item => item.type === MAIN),
        [data]
    );
    const sauces = React.useMemo(
        // @ts-ignore TODO to next sprint
        () => data.filter(item => item.type === SAUCE),
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
                        id={BUN}
                        headerText={'Булки'}
                        data={buns}
                        onClick={handleOpenModal}/>
                </div>
                <div ref={sauceRef}>
                    <BurgerIngredientElements
                        id={SAUCE}
                        headerText={'Соусы'}
                        data={sauces}
                        onClick={handleOpenModal}/>
                </div>
                <div ref={mainRef}>
                    <BurgerIngredientElements
                        id={MAIN}
                        headerText={'Начинка'}
                        data={mains}
                        onClick={handleOpenModal}/>
                </div>
                {modalData && (
                    <Modal onClose={handleCloseModal} title={"Детали ингредиента"}>
                        <IngredientDetails/>
                    </Modal>
                )}
            </div>
        </section>
    );
}

export default BurgerIngredients;