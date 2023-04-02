import {Logo} from '@ya.praktikum/react-developer-burger-ui-components'
import ElementMenu from "./element-menu/ElementMenu";

import styles from './AppHeader.module.css';
import global from '../../index.module.css';

function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={`${global.container} ${styles.header__nav} pt-4 pb-4`}>
                <ul className={styles.nav__ul_left}>
                    <li className='mr-2'>
                        <ElementMenu iconType={'burger'} text={'Конструктор'}/>
                    </li>
                    <li>
                        <ElementMenu iconType={'order-list'} text={'Лента заказов'}/>
                    </li>
                </ul>
                <div>
                    <Logo/>
                </div>
                <ul className={styles.nav__ul_right}>
                    <li>
                        <ElementMenu iconType={'profile'} text={'Личный кабинет'}/>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;