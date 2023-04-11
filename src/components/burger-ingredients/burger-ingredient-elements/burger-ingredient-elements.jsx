import React from "react";
import PropTypes from 'prop-types';

import BurgerIngredientElement from "../burger-ingredient-element/burger-ingredient-element";

import styles from "./burger-ingredient-elements.module.css";


const BurgerIngredientElements = (props) => {
    return (
        <div>
            <h2 id={props.id} className={`text text_type_main-medium mb-6`}>{props.headerText}</h2>
            <ul className={`${styles.content__ul} pl-4 pr-2`}>
                {
                    props.data.map(item => {
                        const handleOnClick = () => props.onClick(item);
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

BurgerIngredientElements.propTypes = {
    onClick: PropTypes.func.isRequired,
    headerText: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,

            image_large: PropTypes.string.isRequired,
            calories: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired
        }).isRequired
    )
}

export default BurgerIngredientElements;