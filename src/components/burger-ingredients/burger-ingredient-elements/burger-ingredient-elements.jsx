import React from "react";
import {dataProps} from "../../../utils/prop-types";

import BurgerIngredientElement from "../burger-ingredient-element/burger-ingredient-element";

import styles from "./burger-ingredient-elements.module.css";

const BurgerIngredientElements = ({id, headerText, data, onClick}) => {
    return (
        <div>
            <h2 id={id} className={`text text_type_main-medium mb-6`}>{headerText}</h2>
            <ul className={`${styles.content__ul} pl-4 pr-2`}>
                {
                    data.map(item => {
                        const handleOnClick = () => onClick(item);
                        return (
                            <li onClick={handleOnClick} className={`${styles.content__ul_item} pl-4 pr-4 mb-8`}
                                key={item._id}>
                                <BurgerIngredientElement imgPath={item.image}
                                                         price={item.price}
                                                         title={item.name}/>

                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

BurgerIngredientElements.propTypes = dataProps;

export default BurgerIngredientElements;