import styles from './ingredient-details.module.css';
import {useSelector} from "react-redux";

const IngredientDetails = () => {

    const {
        image_large,
        name,
        calories,
        proteins,
        fat,
        carbohydrates
        // @ts-ignore TODO to next sprint
    } = useSelector(store => store.ingredientModalReducer.modalData);

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

export default IngredientDetails;