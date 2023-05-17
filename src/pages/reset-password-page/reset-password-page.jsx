import React, {useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";

import {resetPasswordRequest} from "../../utils/burger-api";

import styles from './reset-password.module.css';
import global from "../../index.module.css";


const ResetPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passRef = useRef();

    const [isPasswordReset, setPasswordReset] = useState(false);
    const [passwordResetErrorMsq, setPasswordResetErrorMsq] = useState(null);
    const [form, setForm] = useState({
        password: '',
        token: ''
    });

    const onChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const onIconClick = () => {
        const attr = passRef.current?.type === 'text' ? 'password' : 'text';
        passRef.current?.setAttribute('type', attr);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        resetPasswordRequest({
            password: form.password,
            token: form.token
        })
            .then(response => {
                if (response) {
                    setPasswordReset(true);
                }
            })
            .catch(error =>
                setPasswordResetErrorMsq(`Ошибка: ${error.message}`)
            );
    };

    React.useEffect(
        () => {
            isPasswordReset && navigate('/login', {replace: true})
        },
        [isPasswordReset, navigate]
    );

    if (location.state?.from !== 'forgot-password') {
        return <Navigate to={"/forgot-password"} replace={true}/>;
    }

    return (
        <div className={`${global.container} ${styles.reset_password__container}`}>
            <form className={`${styles.reset_password__form}`} onSubmit={onSubmit}>
                <h1 className={`text text_type_main-large mb-6`}>Восстановление пароля</h1>
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
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => onChange(e)}
                    value={form.token}
                    name={'token'}
                    error={false}
                    size={'default'}
                    extraClass="mb-6"
                />
                {
                    passwordResetErrorMsq
                    && <p className={`text text_type_main-small`}>{passwordResetErrorMsq}</p>
                }
                <Button extraClass={`mb-20`} htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>

                <div className={`text text_type_main-default mb-4 ${styles.reset_password__info_container}`}>
                    <p>Вспомнили пароль?</p>
                    <Link className={styles.reset_password__link} to={'/login'}>Войти</Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordPage;