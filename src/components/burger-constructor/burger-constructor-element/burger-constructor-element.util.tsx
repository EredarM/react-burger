import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const getElement = (
    type: string,
    imgPath: string,
    price: number,
    title: string,
    removeOnClick: () => void) => {
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
                    handleClose={removeOnClick}
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
            result = (
                <></>
            );
    }
    return result;
}