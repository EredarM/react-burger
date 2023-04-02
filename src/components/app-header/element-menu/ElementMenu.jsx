import React from "react";

import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ElementMenu.module.css';

class ElementMenu extends React.Component {
    getIcon = (iconType) => {
        let result;
        switch (iconType) {
            case 'burger':
                result = (<BurgerIcon type={'primary'}/>);
                break;
            case 'order-list':
                result = (<ListIcon type={'primary'}/>);
                break;
            case 'profile':
                result = (<ProfileIcon type={'primary'}/>);
                break;
            default:
                throw '';
        }
        return result;
    }

    render() {
        const {iconType, text} = this.props;
        return (
            <span className={`${styles.element} pl-5 pr-5`}>
                {this.getIcon(iconType)}
                {text}
            </span>
        );
    }
}

export default ElementMenu;