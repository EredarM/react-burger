import PropTypes from 'prop-types';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './ConstructorCartElement.module.css';

const ConstructorCartElement = (props) => {
    return (
        <>
            <img className={`${styles.item__img} mb-1`} src={props.imgPath}
                 alt={'Изображение ингредиента бургера'}/>
            <div className={`${styles.item__priceWrapper} mb-1`}>
                <span className={`text text_type_digits-default`}>{props.price}</span>
                <CurrencyIcon type={'primary'}/>
            </div>
            <p className={`${styles.item__title} text text_type_main-default`}>{props.title}</p>
        </>
    );
}

ConstructorCartElement.propTypes = {
    imgPath: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string
}

export default ConstructorCartElement;