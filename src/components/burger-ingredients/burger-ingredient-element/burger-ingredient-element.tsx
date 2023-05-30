import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";

import styles from './burger-ingredient-element.module.css';
import {FC} from "react";

const BurgerIngredientElement: FC<IIngredientElement> = ({onClick, data, count}) => {
    const {_id, type, image, price, name} = data;

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {
            id: _id,
            type: type
        }
    });

    return (
        <li ref={dragRef} onClick={onClick} className={`${styles.content__ul_item} pl-4 pr-4 mb-8`}>
            {
                count &&
                (<span className={`${styles.item__span} text text_type_digits-default`}>{count}</span>)
            }
            <img className={`${styles.item__img} mb-1`} src={image}
                 alt={'Изображение ингредиента бургера'}/>
            <div className={`${styles.item__priceWrapper} mb-1`}>
                <span className={`text text_type_digits-default`}>{price}</span>
                <CurrencyIcon type={'primary'}/>
            </div>
            <p className={`${styles.item__title} text text_type_main-default`}>{name}</p>
        </li>
    );
}

export default BurgerIngredientElement;