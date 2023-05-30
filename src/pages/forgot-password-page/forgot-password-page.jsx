import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";

import {forgotPasswordRequest} from "../../utils/burger-api";
import {useForm} from "../../hooks/useForm";
import {loginPath, resetPasswordPath} from "../../utils/route-path";

import styles from './forgot-password.module.css';
import global from "../../index.module.css";


const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const [isSecurityCodeSend, setSecurityCodeSend] = useState(false);
    const [passwordResetErrorMsq, setPasswordResetErrorMsq] = useState(null);
    const {values, handleChange} = useForm({
        email: ''
    });

    React.useEffect(
        () => {
            isSecurityCodeSend && navigate(resetPasswordPath,
                {
                    state: {from: "forgot-password"},
                    replace: true
                }
            )
        },
        [isSecurityCodeSend, navigate]
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await forgotPasswordRequest({
                "email": values.email
            });
            if (response) {
                setSecurityCodeSend(true);
            }
        } catch (err) {
            setPasswordResetErrorMsq(`Ошибка: ${err.message}`);
        }
    };

    return (
        <>
            <div className={`${global.container} ${styles.forgot_password__container}`}>
                <form className={`${styles.forgot_password__form}`} onSubmit={onSubmit}>
                    <h1 className={`text text_type_main-large mb-6`}>Восстановление пароля</h1>
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
                    {
                        passwordResetErrorMsq
                        && <p className={`text text_type_main-small`}>{passwordResetErrorMsq}</p>
                    }
                    <Button extraClass={`mb-20`} htmlType="submit" type="primary" size="medium">
                        Восстановить
                    </Button>
                    <div className={`text text_type_main-default mb-4 ${styles.forgot_password__info_container}`}>
                        <p>Вспомнили пароль?</p>
                        <Link className={styles.forgot_password__link} to={loginPath}>Войти</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgotPasswordPage;