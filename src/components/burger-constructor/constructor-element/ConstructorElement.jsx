import PropTypes from 'prop-types';

import ConstructorCartElement from "../constructor-cart-element/ConstructorCartElement";

import styles from "./ConstructorElement.module.css";

const ConstructorElement = (props) => {
    return (
        <div>
            <h2 className={`text text_type_main-medium mb-6`}>{props.headerText}</h2>
            <ul className={`${styles.content__ul} pl-4 pr-2`}>
                {
                    props.data.map(item => {
                        return (
                            <li className={`${styles.content__ul_item} pl-4 pr-4 mb-8`} key={item._id}>
                                <ConstructorCartElement imgPath={item.image} price={item.price} title={item.name}/>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

ConstructorElement.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
    })
}

export default ConstructorElement;