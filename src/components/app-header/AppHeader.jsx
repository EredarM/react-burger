import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderNavElement from "./header-nav-element/HeaderNavElement";

import styles from './AppHeader.module.css';
import global from '../../index.module.css';

const AppHeader = () => {
    return (
        <header className={`${styles.header}`}>
            <nav className={`pt-4 pb-4`}>
                <div className={`${styles.header__nav_container} ${global.header__container}`}>
                    <ul className={styles.nav__ul_left}>
                        <li className='mr-2'>
                            <HeaderNavElement iconType={'burger'} text={'Конструктор'}/>
                        </li>
                        <li>
                            <HeaderNavElement iconType={'order-list'} text={'Лента заказов'}/>
                        </li>
                    </ul>
                    <div>
                        <Logo/>
                    </div>
                    <ul className={styles.nav__ul_right}>
                        <li>
                            <HeaderNavElement iconType={'profile'} text={'Личный кабинет'}/>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default AppHeader;