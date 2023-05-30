import React, {useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";

import {resetPasswordRequest} from "../../utils/burger-api";
import {useForm} from "../../hooks/useForm";
import {loginPath} from "../../utils/route-path";

import styles from './reset-password.module.css';
import global from "../../index.module.css";


const ResetPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passRef = useRef();

    const [isPasswordReset, setPasswordReset] = useState(false);
    const [passwordResetErrorMsq, setPasswordResetErrorMsq] = useState(null);
    const {values, handleChange} = useForm({
        password: '',
        token: ''
    });

    const onIconClick = () => {
        const attr = passRef.current?.type === 'text' ? 'password' : 'text';
        passRef.current?.setAttribute('type', attr);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPasswordRequest({
                password: values.password,
                token: values.token
            });
            if (response) {
                setPasswordReset(true);
            }
        } catch (err) {
            setPasswordResetErrorMsq(`Ошибка: ${err.message}`)
        }
    };

    React.useEffect(
        () => {
            isPasswordReset && navigate(loginPath, {replace: true})
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
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => handleChange(e)}
                    value={values.token}
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
                    <Link className={styles.reset_password__link} to={loginPath}>Войти</Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordPage;