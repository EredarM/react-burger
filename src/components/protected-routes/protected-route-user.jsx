import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import {isUserAuth} from "../../services/actions/user/user";


const ProtectedRouteUser = ({isAuthOnly = false, element}) => {
    const dispatch = useDispatch();
    const {isAuthUser, isAuthUserChecked} = useSelector(store => store.user);

    useEffect(() => {
            dispatch(isUserAuth());
        },
        [dispatch]
    );

    if (!isAuthUserChecked) {
        return null;
    }

    if (!isAuthOnly && isAuthUser) {
        return (<Navigate to="/" replace/>);
    }

    if (isAuthOnly && (!isAuthUser || !isAuthUserChecked)) { //TODO добавить редирект на from

        return (<Navigate to="/login" replace/>);
    }

    return element;
};

export default ProtectedRouteUser;