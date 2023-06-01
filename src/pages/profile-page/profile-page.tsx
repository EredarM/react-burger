import React, {FC, ReactNode} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {logout} from "../../services/actions/user/logout";
import {loginPath, logoutPath, profileOrdersPath, profilePath} from "../../utils/route-path";

import styles from './profile-page.module.css';
import global from "../../index.module.css";


const ProfilePage: FC<{element: ReactNode}> = ({element}) => {
    // @ts-ignore TODO to next sprint
    const {isAuthUser} = useSelector(store => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setActive = ({isActive}: {isActive: boolean}) => {
        const extraClasses = `text text_type_main-medium ${styles.item__link}`;
        return (isActive ? `${styles.item__link_active} ` : "text_color_inactive ") + extraClasses;
    };

    const onLogoutClick = () => {
        // @ts-ignore TODO to next sprint
        dispatch(logout());
    };

    React.useEffect(
        () => {
            !isAuthUser && navigate(loginPath, {
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
                            <NavLink to={profilePath} className={setActive} end>Профиль</NavLink>
                        </li>
                        <li className={styles.nav__item}>
                            <NavLink to={profileOrdersPath} className={setActive}>История заказов</NavLink>
                        </li>
                        <li className={styles.nav__item}>
                            <NavLink to={logoutPath} onClick={onLogoutClick} className={setActive}>Выход</NavLink>
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