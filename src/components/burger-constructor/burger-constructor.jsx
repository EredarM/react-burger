import React from "react";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {addOrderModalData, removeOrderModalData} from "../../services/actions/order-modal";
import {addIngredient} from "../../services/actions/burger-constructor";

import styles from './burger-constructor.module.css';
import global from '../../index.module.css';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const {isOpen} = useSelector(state => state.orderModalReducer)

    const {bun, ingredients} = useSelector(store => store.burgerConstructor);
    const ingredientsData = useSelector(store => store.burgerIngredients.data);

    const ingredientsRender = React.useMemo(
        () => ingredients.map(item => ({
            id: item.uniqueId,
            data: ingredientsData.find(i => i._id === item.itemId)
        })),
        [ingredients]
    );

    const bunRender = React.useMemo(
        () => ingredientsData.find(i => i._id === bun.itemId),
        [bun]
    );

    const handleOpenOrderModal = () => dispatch(addOrderModalData());
    const handleCloseOrderModal = () => dispatch(removeOrderModalData());

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch(addIngredient(item));
        }
    });

    return (
        <section className={`${styles.main__section_rigth} pt-25`}>
            <div className={global.section__scrollWrapper}>
                <ul ref={dropTarget} className={`${styles.content__ul} pl-10 pr-4`}>
                    {
                        bunRender &&
                        (
                            <BurgerConstructorElement
                                id={bunRender._id}
                                type={'start'}
                                imgPath={bunRender.image}
                                price={bunRender.price}
                                title={bunRender.name}/>
                        )
                    }
                    {
                        ingredientsRender.map((item, index) => {
                            return (
                                <BurgerConstructorElement
                                    id={item.id}
                                    key={item.id}
                                    index={index}
                                    type={'middle'}
                                    imgPath={item.data.image}
                                    price={item.data.price}
                                    title={item.data.name}/>
                            );
                        })
                    }
                    {
                        bunRender &&
                        (
                            <BurgerConstructorElement
                                id={bunRender._id}
                                type={'end'}
                                imgPath={bunRender.image}
                                price={bunRender.price}
                                title={bunRender.name}/>
                        )
                    }
                </ul>
            </div>
            <div className={styles.bottom}>
                <div className={`${styles.bottom__priceWrapper} mb-1`}>
                        <span
                            className={`text text_type_digits-medium`}>
                            {ingredientsRender.map(item => item.data.price).reduce((sum, currentValue) => sum + currentValue, 0)}
                        </span>
                    <CurrencyIcon type={'primary'}/>
                </div>
                <Button onClick={handleOpenOrderModal} htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
            {isOpen &&
                <Modal onClose={handleCloseOrderModal}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    );
}

export default BurgerConstructor;