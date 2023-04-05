import React from "react";

import ConstructorCartElement from "../constructor-cart-element/ConstructorCartElement";

import styles from "./ConstructorElement.module.css";

class ConstructorElement extends React.Component {
    render() {
        return (
            <div>
                <h2 className={`text text_type_main-medium mb-6`}>{this.props.headerText}</h2>
                <ul className={`${styles.content__ul} pl-4 pr-2`}>
                    {
                        this.props.data.map(item => {
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
}

export default ConstructorElement;