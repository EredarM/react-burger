import {useDispatch} from "react-redux";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

import {dataProps2} from "../../../utils/prop-types";
import {removeIngredient, reorderIngredients} from "../../../services/actions/burger-constructor";
import styles from "../burger-constructor.module.css";
import {useDrag, useDrop} from "react-dnd";
import React from "react";
import dotImg from "../../../static/images/Vector.svg";


const getElement = (type, imgPath, price, title, removeOnClick) => {
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
            result = '';
    }
    return result;
}

const BurgerConstructorElement = ({id, index, type, imgPath, price, title}) => {
    const dispatch = useDispatch();
    const handleRemoveItem = () => dispatch(removeIngredient(id));

    const dndRef = React.useRef();

    const [, dropTargetRef] = useDrop({
        accept: 'ingredient_order',
        hover(item) {
            const dragItemIndex = item.index;
            const currentItemIndex = index;

            if (dragItemIndex === currentItemIndex) {
                return;
            }

            dispatch(reorderIngredients(dragItemIndex, currentItemIndex));
            item.index = currentItemIndex;
        }
    });


    const [{isDragging}, dragRef] = useDrag({
        type: 'ingredient_order',
        item: {
            id: id,
            index: index
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const isIngredient = type === 'middle';

    if (isIngredient) {
        dropTargetRef(dndRef);
        dragRef(dndRef);
    }

    const opacity = isDragging ? 0 : 1;

    return (
        <li className={`${styles.content__li}`} style={{opacity}} ref={dndRef}>
            {isIngredient && (<img src={dotImg} className={styles.content__li__img} alt='dot'/>)}
            {getElement(type, imgPath, price, title, handleRemoveItem)}
        </li>
    );
}

BurgerConstructorElement.propTypes = dataProps2;

export default BurgerConstructorElement;