import PropTypes from "prop-types";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import styles from './burger-constructor.module.css';
import global from '../../index.module.css';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import React from "react";
import OrderDetails from "../order-details/order-details";

const getType = (currentIndex, dataLength) => {
    let result;
    if (currentIndex === 0) {
        result = 'start';
    } else if (currentIndex === dataLength - 1) {
        result = 'end';
    } else {
        result = 'middle';
    }
    return result;
}

const BurgerConstructor = ({data}) => {
    const [ingredientModalData, setIngredientModalData] = React.useState(null);
    const [orderModalData, setOrderModalData] = React.useState(false);

    const handleOpenIngredientModal = (item) => {
        setIngredientModalData({
            name: item.name,
            image_large: item.image_large,
            calories: item.calories,
            proteins: item.proteins,
            fat: item.fat,
            carbohydrates: item.carbohydrates
        });
    };

    const handleCloseIngredientModal = () => setIngredientModalData(null);

    const handleOpenOrderModal = () => setOrderModalData(true);

    const handleCloseOrderModal = () => setOrderModalData(false);

    return (
        <section className={`${styles.main__section_rigth} pt-25`}>
            <div className={global.section__scrollWrapper}>
                <ul className={`${styles.content__ul} pl-4 pr-4`}>
                    {
                        data.map((item, index) => {
                            const handleOnClick = () => handleOpenIngredientModal(item);
                            return (
                                <li onClick={handleOnClick} key={item._id} className={styles.content__li}>
                                    {
                                        <BurgerConstructorElement
                                            type={getType(index, data.length)}
                                            imgPath={item.image}
                                            price={item.price}
                                            title={item.name}/>
                                    }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <div className={styles.bottom}>
                <div className={`${styles.bottom__priceWrapper} mb-1`}>
                        <span
                            className={`text text_type_digits-medium`}>
                            {data.map(item => item.price).reduce((sum, currentValue) => sum + currentValue, 0)}
                        </span>
                    <CurrencyIcon type={'primary'}/>
                </div>
                <Button onClick={handleOpenOrderModal} htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
            {ingredientModalData &&
                <Modal onClose={handleCloseIngredientModal} title={"Детали ингредиента"}>
                    <IngredientDetails name={ingredientModalData.name}
                                       carbohydrates={ingredientModalData.carbohydrates}
                                       proteins={ingredientModalData.proteins}
                                       fat={ingredientModalData.fat}
                                       calories={ingredientModalData.calories}
                                       image_large={ingredientModalData.image_large}/>
                </Modal>
            }
            {orderModalData &&
                <Modal onClose={handleCloseOrderModal}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,

            image_large: PropTypes.string.isRequired,
            calories: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired
        }).isRequired
    )
}

export default BurgerConstructor;