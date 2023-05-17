import React, {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

import {register} from "../../services/actions/user/register";

import styles from './register-page.module.css';
import global from "../../index.module.css";


const RegisterPage = () => {
    const [form, setValue] = useState({name: '', email: '', password: ''});
    const {isAuthUser, registerRequestError} = useSelector(store => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const passRef = useRef();

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const onIconClick = () => {
        const attr = passRef.current?.type === 'text' ? 'password' : 'text';
        passRef.current?.setAttribute('type', attr);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register(form.email, form.password, form.name));
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
        <div className={`${global.container} ${styles.register__container}`}>
            <form className={`${styles.register__form}`} onSubmit={onSubmit}>
                <h1 className={`text text_type_main-large mb-6`}>Регистрация</h1>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => onChange(e)}
                    value={form.name}
                    name={'name'}
                    error={false}
                    size={'default'}
                    extraClass="mb-6"
                />
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
                    registerRequestError
                    && <p className={`text text_type_main-small`}>{registerRequestError.message}</p>
                }
                <Button extraClass={`mb-20`} htmlType="submit" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
                <div className={`text text_type_main-default mb-4 ${styles.register__info_container}`}>
                    <p>Уже зарегистрированы?</p>
                    <Link className={styles.register__link} to={'/login'}>Войти</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;