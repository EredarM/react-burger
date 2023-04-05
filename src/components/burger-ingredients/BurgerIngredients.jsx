import React from "react";

import IngredientsElement from "./ingredients-element/IngredientsElement";

import styles from './BurgerIngredients.module.css';
import global from '../../index.module.css';

import data from '../../utils/data';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


class BurgerIngredients extends React.Component {
    getType = (currentIndex, dataLength) => {
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

    render() {
        return (
            <section className={`${styles.main__section_rigth} pt-25`}>
                <div className={global.section__scrollWrapper}>
                    <ul className={`${styles.content__ul} pl-4 pr-4`}>
                        {
                            data.map((item, index) => {
                                return (
                                    <li key={item._id}>
                                        {
                                            <IngredientsElement
                                                type={this.getType(index, data.length)}
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
                            className={`text text_type_digits-medium`}>{data.map(item => item.price).reduce((sum, currentValue) => sum + currentValue, 0)}</span>
                        <CurrencyIcon type={'primary'}/>
                    </div>
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>

            </section>
        );
    }
}

export default BurgerIngredients;