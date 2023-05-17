import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderNavElement from "./header-nav-element/header-nav-element";

import styles from './app-header.module.css';
import global from '../../index.module.css';

const AppHeader = () => {
    return (
        <header className={`${styles.header}`}>
            <div className={`${global.container}`}>
                <nav className={`${styles.header__nav_container} pt-4 pb-4`}>
                    <ul className={styles.nav__ul_left}>
                        <li className='mr-2'>
                            <HeaderNavElement url={'/'} iconType={'burger'} text={'Конструктор'}/>
                        </li>
                        <li>
                            <HeaderNavElement url={'/order-list'} iconType={'order-list'} text={'Лента заказов'}/>
                        </li>
                    </ul>
                    <div>
                        <Logo/>
                    </div>
                    <ul className={styles.nav__ul_right}>
                        <li>
                            <HeaderNavElement url={'/profile'} iconType={'profile'} text={'Личный кабинет'}/>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default AppHeader;