import React from 'react';

import doneImg from '../../static/images/done.svg';
import styles from './order-details.module.css';

const OrderDetails = () => {

    return (
        <div className={styles.modal__wrapper}>
            <h2 className={`mb-8 text text_type_digits-large ${styles.title_shadow}`}>034536</h2>
            <p className={`mb-15 text text_type_main-medium`}>идентификатор заказа</p>
            <img className={`mb-15`} src={doneImg} alt='done'/>
            <p className={`mb-2 text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`mb-30 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной
                станции</p>
        </div>
    )
};

export default OrderDetails;