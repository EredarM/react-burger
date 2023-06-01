import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import styles from './ingredient-info.module.css';
import React from "react";

const IngredientInfo = () => {
    const params = useParams();
    // @ts-ignore TODO to next sprint
    const ingredientsData = useSelector(store => store.burgerIngredients.data);

    const ingredient = React.useMemo(
        // @ts-ignore TODO to next sprint
        () => ingredientsData.find(item => item._id === params.id),
        [ingredientsData, params]
    );

    return (
        ingredient &&
        <div className={`${styles.content__main_wrapper} mt-8`}>
            <div className={`${styles.content__wrapper}`}>
                <img src={ingredient.image_large} className={`mb-4`} alt='Ингридиент'/>
                <p className={`mb-8 text text_type_main-medium`}>{ingredient.name}</p>
                <ul className={`${styles.content__info_list} mb-15`}>
                    <li className={`${styles.content__info_item} mr-5`}>
                        <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                        <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.calories}</p>
                    </li>
                    <li className={`${styles.content__info_item} mr-5`}>
                        <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
                        <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</p>
                    </li>
                    <li className={`${styles.content__info_item} mr-5`}>
                        <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
                        <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.fat}</p>
                    </li>
                    <li className={`${styles.content__info_item} mr-5`}>
                        <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                        <p className={`text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default IngredientInfo;