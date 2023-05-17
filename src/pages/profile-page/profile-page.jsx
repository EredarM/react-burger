import React from "react";

import styles from './profile-page.module.css';
import global from "../../index.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../services/actions/user/logout";


const ProfilePage = ({element}) => {
    const {isAuthUser} = useSelector(store => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setActive = ({isActive}) => {
        const extraClasses = `text text_type_main-medium ${styles.item__link}`;
        return (isActive ? `${styles.item__link_active} ` : "text_color_inactive ") + extraClasses;
    };

    const onLogoutClick = () => {
        dispatch(logout());
    };

    React.useEffect(
        () => {
            !isAuthUser && navigate('/login', {
                replace: true
            });
        },
        [isAuthUser, navigate]
    );

    return (
        <div className={`${global.container} ${styles.profile__container}`}>
            <div className={`mr-15 ${styles.nav__wrapper}`}>
                <nav className={`mb-20`}>
                    <ul className={styles.nav__ul}>
                        <li className={styles.nav__item}>
                            <NavLink to={'/profile'} className={setActive} end>Профиль</NavLink>
                        </li>
                        <li className={styles.nav__item}>
                            <NavLink to={'/profile/orders'} className={setActive}>История заказов</NavLink>
                        </li>
                        <li className={styles.nav__item}>
                            <NavLink to={'/logout'} onClick={onLogoutClick} className={setActive}>Выход</NavLink>
                        </li>
                    </ul>
                </nav>
                <p className={`text text_type_main-small ${styles.nav__wrapper_info}`}>
                    В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div>
            <div>
                {element}
            </div>
        </div>
    );
};

export default ProfilePage;