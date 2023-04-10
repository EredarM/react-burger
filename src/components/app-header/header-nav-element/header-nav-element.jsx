import PropTypes from 'prop-types';

import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './header-nav-element.module.css';

const getIcon = (iconType) => {
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
            result = '';
    }
    return result;
}

const HeaderNavElement = (props) => {
    const {iconType, text} = props;
    return (
        <a href={'#'} className={`${styles.nav__element} text text_type_main-default pl-5 pr-5`}>
            {getIcon(iconType)}
            {text}
        </a>
    );
}

HeaderNavElement.propTypes = {
    iconType: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default HeaderNavElement;