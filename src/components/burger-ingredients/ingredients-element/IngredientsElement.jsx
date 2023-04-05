import React from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

class IngredientsElement extends React.Component {

    getElement = (type, imgPath, price, title) => {
        let result;
        switch (type) {
            case 'start':
                result = (
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={title}
                        price={price}
                        thumbnail={imgPath}
                    />
                );
                break;
            case 'middle':
                result = (
                    <ConstructorElement
                        text={title}
                        price={price}
                        thumbnail={imgPath}
                    />
                );
                break;
            case 'end':
                result = (
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={title}
                        price={price}
                        thumbnail={imgPath}
                    />
                );
                break;
            default:
                result = '';
        }
        return result;
    }

    render() {
        const {type, imgPath, price, title} = this.props;

        return (
            <>
                {this.getElement(type, imgPath, price, title)}
            </>
        );
    }
}

export default IngredientsElement;