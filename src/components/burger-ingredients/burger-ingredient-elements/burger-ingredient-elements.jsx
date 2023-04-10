import PropTypes from 'prop-types';

import BurgerIngredientDetails from "../burger-ingredient-details/burger-ingredient-details";

import styles from "./burger-ingredient-elements.module.css";

const BurgerIngredientElements = (props) => {
    return (
        <div>
            <h2 className={`text text_type_main-medium mb-6`}>{props.headerText}</h2>
            <ul className={`${styles.content__ul} pl-4 pr-2`}>
                {
                    props.data.map(item => {
                        return (
                            <li className={`${styles.content__ul_item} pl-4 pr-4 mb-8`} key={item._id}>
                                <BurgerIngredientDetails imgPath={item.image} price={item.price} title={item.name}/>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

BurgerIngredientElements.propTypes = {
    headerText: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        }).isRequired
    )
}

export default BurgerIngredientElements;