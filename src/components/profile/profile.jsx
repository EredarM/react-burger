import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import styles from './profile.module.css';
import {updateUser} from "../../services/actions/user/user";
import {useForm} from "../../hooks/useForm";

const Profile = () => {
    const dispatch = useDispatch();
    const passRef = useRef();

    const {
        userRequest,
        userData
    } = useSelector(store => store.user);
    const {values, handleChange, setValues} = useForm({
        name: '',
        email: '',
        password: ''
    });

    const resetForm = React.useCallback(() => {
            setValues({
                name: userData ? userData.name : '',
                email: userData ? userData.email : '',
                password: ''
            });
        },
        [userData, setValues]
    );

    React.useEffect(
        () => {
            resetForm();
        },
        [resetForm]
    );

    const [nameInputDisabled, setNameInputDisabled] = useState(true);
    const [emailInputDisabled, setEmailInputDisabled] = useState(true);
    const [passwordInputDisabled, setPasswordInputDisabled] = useState(true);
    const [isDataChanged, setDataChanged] = useState(false);

    const onNameIconClick = () => {
        setNameInputDisabled(!nameInputDisabled);
        setDataChanged(true);
    };
    const onEmailIconClick = () => {
        setEmailInputDisabled(!emailInputDisabled);
        setDataChanged(true);
    };
    const onPasswordIconClick = () => {
        setPasswordInputDisabled(!passwordInputDisabled);
        setDataChanged(true);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        dispatch(updateUser(values.email, values.name, values.password));
        onCancel();
    };



    const onCancel = () => {
        setDataChanged(false);
        setNameInputDisabled(true);
        setEmailInputDisabled(true);
        setPasswordInputDisabled(true);
        resetForm();
    };

    if (userRequest) {
        return null;
    }

    return (
        <form onSubmit={onSubmitForm}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => handleChange(e)}
                icon={'EditIcon'}
                onIconClick={onNameIconClick}
                disabled={nameInputDisabled}
                value={values.name}
                name={'name'}
                error={false}
                size={'default'}
                extraClass="mb-6"
            />
            <Input
                type={'email'}
                placeholder={'E-mail'}
                onChange={e => handleChange(e)}
                icon={'EditIcon'}
                onIconClick={onEmailIconClick}
                disabled={emailInputDisabled}
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
                icon={'EditIcon'}
                onIconClick={onPasswordIconClick}
                disabled={passwordInputDisabled}
                value={values.password}
                name={'password'}
                error={false}
                size={'default'}
                extraClass="mb-6"
                ref={passRef}
            />
            {isDataChanged && (
                <div className={styles.btn__container}>
                    <Button type="secondary" htmlType="button" onClick={onCancel}>Отменить</Button>
                    <Button type="primary" htmlType="submit">Сохранить</Button>
                </div>
            )}
        </form>
    );
};

export default Profile;