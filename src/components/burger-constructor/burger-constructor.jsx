import React from "react";

import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {dataProps} from "../../utils/prop-types";

import styles from './burger-constructor.module.css';
import global from '../../index.module.css';


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
    const [orderModalData, setOrderModalData] = React.useState(false);

    const handleOpenOrderModal = () => setOrderModalData(true);

    const handleCloseOrderModal = () => setOrderModalData(false);

    return (
        <section className={`${styles.main__section_rigth} pt-25`}>
            <div className={global.section__scrollWrapper}>
                <ul className={`${styles.content__ul} pl-4 pr-4`}>
                    {
                        data.map((item, index) => {
                            return (
                                <li key={item._id} className={styles.content__li}>
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
            {orderModalData &&
                <Modal onClose={handleCloseOrderModal}>
                    <OrderDetails/>
                </Modal>
            }
        </section>
    );
}

BurgerConstructor.propTypes = dataProps;

export default BurgerConstructor;