import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {dataProps2} from "../../../utils/prop-types";

import styles from './burger-ingredient-element.module.css';

const BurgerIngredientElement = ({imgPath, price, title}) => {
    return (
        <>
            <img className={`${styles.item__img} mb-1`} src={imgPath}
                 alt={'Изображение ингредиента бургера'}/>
            <div className={`${styles.item__priceWrapper} mb-1`}>
                <span className={`text text_type_digits-default`}>{price}</span>
                <CurrencyIcon type={'primary'}/>
            </div>
            <p className={`${styles.item__title} text text_type_main-default`}>{title}</p>
        </>
    );
}

BurgerIngredientElement.propTypes = dataProps2;

export default BurgerIngredientElement;