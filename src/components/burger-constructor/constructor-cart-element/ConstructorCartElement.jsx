import React from "react";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './ConstructorCartElement.module.css';

class ConstructorCartElement extends React.Component {
    render() {
        return (
            <>
                <img className={`${styles.item__img} mb-1`} src={this.props.imgPath}
                     alt={'Изображение ингредиента бургера'}/>
                <div className={`${styles.item__priceWrapper} mb-1`}>
                    <span className={`text text_type_digits-default`}>{this.props.price}</span>
                    <CurrencyIcon type={'primary'}/>
                </div>
                <p className={`${styles.item__title} text text_type_main-default`}>{this.props.title}</p>
            </>
        );
    }
}

export default ConstructorCartElement;