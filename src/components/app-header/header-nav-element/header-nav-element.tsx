import {NavLink} from "react-router-dom";
import {FC} from "react";
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './header-nav-element.module.css';

const getIcon = (iconType: string): JSX.Element => {
    let result: JSX.Element;
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
            result = <></>;
    }
    return result;
};

const HeaderNavElement: FC<IHeaderNavElement> = ({iconType, text, url}) => {
    const setActive = ({isActive}: {isActive: boolean}): string => {
        const extraClasses = `text text_type_main-default pl-5 pr-5 ${styles.item__link}`;
        return (isActive ? `${styles.item__link_active} ` : "text_color_inactive ") + extraClasses;
    };

    return (
        <NavLink to={`${url}`} className={setActive}>
            {getIcon(iconType)}
            {text}
        </NavLink>
    );
};

export default HeaderNavElement;