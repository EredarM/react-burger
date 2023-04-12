import {dataProps2} from "../../../utils/prop-types";

import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

const getElement = (type, imgPath, price, title) => {
    let result;
    switch (type) {
        case 'start':
            result = (
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={title.concat(' (верх)')}
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
                    text={title.concat(' (низ)')}
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

const BurgerConstructorElement = ({type, imgPath, price, title}) => {
    return (
        <>
            {getElement(type, imgPath, price, title)}
        </>
    );
}

BurgerConstructorElement.propTypes = dataProps2;

export default BurgerConstructorElement;