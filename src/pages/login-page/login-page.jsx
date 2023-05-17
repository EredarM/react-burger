import React, {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {login} from "../../services/actions/user/login";

import styles from './login-page.module.css';
import global from "../../index.module.css";


const LoginPage = () => {
    const {isAuthUser, loginRequestError} = useSelector(store => store.user);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const passRef = useRef();

    const onChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const onIconClick = () => {
        const attr = passRef.current?.type === 'text' ? 'password' : 'text';
        passRef.current?.setAttribute('type', attr);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form.email, form.password));
    };

    React.useEffect(
        () => {
            isAuthUser && navigate('/', {
                replace: true
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
                    onChange={e => onChange(e)}
                    value={form.email}
                    name={'email'}
                    error={false}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => onChange(e)}
                    icon={'ShowIcon'}
                    onIconClick={onIconClick}
                    value={form.password}
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
                    <Link className={styles.login__link} to={'/register'}>Зарегистрироваться</Link>
                </div>
                <div className={`text text_type_main-default ${styles.login__info_container}`}>
                    <p>Забыли пароль?</p>
                    <Link className={styles.login__link} to={'/forgot-password'}>Восстановить пароль</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;