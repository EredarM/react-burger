import React, {FormEvent, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {login} from "../../services/actions/user/login";
import {useForm} from "../../hooks/useForm";
import {forgotPasswordPath, registerPath, rootPath} from "../../utils/route-path";

import styles from './login-page.module.css';
import global from "../../index.module.css";


const LoginPage = () => {
    // @ts-ignore TODO to next sprint
    const {isAuthUser, loginRequestError} = useSelector(store => store.user);
    const {values, handleChange} = useForm({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const passRef = useRef<HTMLInputElement>(null);

    const onIconClick = () => {
        const attr = passRef.current?.type === 'text' ? 'password' : 'text';
        passRef.current?.setAttribute('type', attr);
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-ignore TODO to next sprint
        dispatch(login(values.email, values.password));
    };

    React.useEffect(
        () => {
            isAuthUser && navigate(rootPath, {
                replace: true,

            });
        },
        [isAuthUser, navigate]
    );

    return (
        <div className={`${global.container} ${styles.login__container}`}>
            <form className={`${styles.login__form}`} onSubmit={onSubmit}>
                <h1 className={`text text_type_main-large mb-6`}>Вход</h1>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => handleChange(e)}
                    value={values.email}
                    name={'email'}
                    error={false}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => handleChange(e)}
                    icon={'ShowIcon'}
                    onIconClick={onIconClick}
                    value={values.password}
                    name={'password'}
                    error={false}
                    size={'default'}
                    extraClass="mb-6"
                    ref={passRef}
                />
                {
                    loginRequestError
                    && <p className={`text text_type_main-small`}>{loginRequestError.message}</p>
                }
                <Button extraClass={`mb-20`} htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
                <div className={`text text_type_main-default mb-4 ${styles.login__info_container}`}>
                    <p>Вы - новый пользователь?</p>
                    <Link className={styles.login__link} to={registerPath}>Зарегистрироваться</Link>
                </div>
                <div className={`text text_type_main-default ${styles.login__info_container}`}>
                    <p>Забыли пароль?</p>
                    <Link className={styles.login__link} to={forgotPasswordPath}>Восстановить пароль</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;