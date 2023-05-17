import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import styles from './profile.module.css';
import {updateUser} from "../../services/actions/user/user";

const Profile = () => {
    const dispatch = useDispatch();
    const passRef = useRef();

    const {
        userRequest,
        userData
    } = useSelector(store => store.user);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    React.useEffect(
        () => {
            setForm({
                ...form,
                name: userData ? userData.name : '',
                email: userData ? userData.email : '',
            });
        },
        [userData]
    );

    const [nameInputDisabled, setNameInputDisabled] = useState(true);
    const [emailInputDisabled, setEmailInputDisabled] = useState(true);
    const [passwordInputDisabled, setPasswordInputDisabled] = useState(true);
    const [isDataChanged, setDataChanged] = useState(false);

    const onChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

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
        dispatch(updateUser(form.email, form.name, form.password));
        onCancel();
    };

    const onCancel = () => {
        setDataChanged(false);
        setNameInputDisabled(true);
        setEmailInputDisabled(true);
        setPasswordInputDisabled(true);
        setForm({
            name: userData ? userData.name : '',
            email: userData ? userData.email : '',
            password: ''
        });
    };

    if (userRequest) {
        return null;
    }

    return (
        <form onSubmit={onSubmitForm}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => onChange(e)}
                icon={'EditIcon'}
                onIconClick={onNameIconClick}
                disabled={nameInputDisabled}
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
                icon={'EditIcon'}
                onIconClick={onEmailIconClick}
                disabled={emailInputDisabled}
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
                icon={'EditIcon'}
                onIconClick={onPasswordIconClick}
                disabled={passwordInputDisabled}
                value={form.password}
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