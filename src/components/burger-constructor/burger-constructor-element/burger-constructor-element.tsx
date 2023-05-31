import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import React, {FC} from "react";

import {removeIngredient, reorderIngredients} from "../../../services/actions/burger-constructor";
import {getElement} from './burger-constructor-element.util';
import {IConstructorElement, TDragItem} from "../../../../declarations/types";

//TODO хз как это пофиксить
// @ts-ignore
import dotImg from "../../../static/images/Vector.svg";
import styles from "../burger-constructor.module.css";


const BurgerConstructorElement: FC<IConstructorElement> = ({id, index, type, imgPath, price, title}): JSX.Element => {
    const dispatch = useDispatch();
    const handleRemoveItem = () => dispatch(removeIngredient(id));

    const dndRef = React.useRef<HTMLLIElement>(null);

    const [, dropTargetRef] = useDrop({
        accept: 'ingredient_order',
        hover(item: TDragItem) {
            const dragItemIndex = item.index;
            const currentItemIndex = index;

            if (dragItemIndex === currentItemIndex) {
                return;
            }

            dispatch(reorderIngredients(dragItemIndex, currentItemIndex));
            if (currentItemIndex) {
                item.index = currentItemIndex;
            }
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

    const isIngredient: boolean = type === 'middle';

    if (isIngredient) {
        dropTargetRef(dndRef);
        dragRef(dndRef);
    }

    const opacity: number = isDragging ? 0 : 1;

    return (
        <li className={`${styles.content__li}`} style={{opacity}} ref={dndRef}>
            {isIngredient && (<img src={dotImg} className={styles.content__li__img} alt='dot'/>)}
            {getElement(type, imgPath, price, title, handleRemoveItem)}
        </li>
    );
}

export default BurgerConstructorElement;