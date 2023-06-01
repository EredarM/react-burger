import React, {FC} from "react";
import {useSelector} from "react-redux";

import BurgerIngredientElement from "../burger-ingredient-element/burger-ingredient-element";
import {IIngredientElements} from "../../../../declarations/types";

import styles from "./burger-ingredient-elements.module.css";


const BurgerIngredientElements: FC<IIngredientElements> = ({id, headerText, data, onClick}) => {
    // @ts-ignore TODO to next sprint
    const ingredients = useSelector(store => store.burgerConstructor);

    const ingredientByCount = React.useMemo(
        () => {
            const count = {};
            // @ts-ignore TODO to next sprint
            ingredients.ingredients.forEach(element => {
                // @ts-ignore TODO to next sprint
                if (!count[element.itemId]) {
                    // @ts-ignore TODO to next sprint
                    count[element.itemId] = 0;
                }
                // @ts-ignore TODO to next sprint
                count[element.itemId]++;
            });

            if (ingredients.bun) {
                // @ts-ignore TODO to next sprint
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
                                // @ts-ignore TODO to next sprint
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

export default BurgerIngredientElements;