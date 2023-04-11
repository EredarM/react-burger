import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css';

const IngredientDetails = ({image_large, name, calories, proteins, fat, carbohydrates}) => {

    return (
        <div className={`${styles.modal__wrapper} mt-8`}>
            <img src={image_large} className={`mb-4`} alt='Ингридиент'/>
            <p className={`mb-8 text text_type_main-medium`}>{name}</p>
            <ul className={`${styles.modal__info_list} mb-15`}>
                <li className={`${styles.modal__info_item} mr-5`}>
                    <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                    <p className={`text text_type_digits-default text_color_inactive`}>{calories}</p>
                </li>
                <li className={`${styles.modal__info_item} mr-5`}>
                    <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
                    <p className={`text text_type_digits-default text_color_inactive`}>{proteins}</p>
                </li>
                <li className={`${styles.modal__info_item} mr-5`}>
                    <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
                    <p className={`text text_type_digits-default text_color_inactive`}>{fat}</p>
                </li>
                <li className={`${styles.modal__info_item} mr-5`}>
                    <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                    <p className={`text text_type_digits-default text_color_inactive`}>{carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
};

IngredientDetails.propTypes = {
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
}


export default IngredientDetails;