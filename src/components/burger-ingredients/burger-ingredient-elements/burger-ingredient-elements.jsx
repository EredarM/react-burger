import React from "react";
import {dataProps} from "../../../utils/prop-types";

import BurgerIngredientElement from "../burger-ingredient-element/burger-ingredient-element";

import styles from "./burger-ingredient-elements.module.css";
import {useSelector} from "react-redux";

const BurgerIngredientElements = ({id, headerText, data, onClick}) => {
    const ingredients = useSelector(store => store.burgerConstructor);

    const ingredientByCount = React.useMemo(
        () => {
            const count = {};

            ingredients.ingredients.forEach(element => {
                if (!count[element.itemId]) {
                    count[element.itemId] = 0;
                }
                count[element.itemId]++;
            });

            if (ingredients.bun) {
                count[ingredients.bun.itemId] = 2;
            }
            return count;
        },
        [ingredients]
    );



    return (
        <>
            <h2 id={id} className={`text text_type_main-medium mb-6`}>{headerText}</h2>
            <ul className={`${styles.content__ul} pl-4 pr-4`}>
                {
                    data.map(item => {
                        const handleOnClick = () => onClick(item);
                        return (
                            <BurgerIngredientElement
                                key={item._id}
                                count={ingredientByCount[item._id]}
                                onClick={handleOnClick}
                                data={item}
                            />
                        );
                    })
                }
            </ul>
        </>
    );
}

BurgerIngredientElements.propTypes = dataProps;

export default BurgerIngredientElements;