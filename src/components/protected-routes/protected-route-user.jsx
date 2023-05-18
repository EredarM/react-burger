import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

import {isUserAuth} from "../../services/actions/user/user";
import {loginPath, rootPath} from "../../utils/route-path";


const ProtectedRouteUser = ({isAuthOnly = false, element}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {isAuthUser, isAuthUserChecked} = useSelector(store => store.user);

    useEffect(() => dispatch(isUserAuth()), [dispatch]);

    if (!isAuthUserChecked) {
        return null;
    }

    if (!isAuthOnly && isAuthUser) {
        return (<Navigate to={location?.state?.from || rootPath} replace/>);
    }

    if (isAuthOnly && (!isAuthUser || !isAuthUserChecked)) {
        return (<Navigate to={loginPath} state={{from: location}} replace/>);
    }

    return element;
};

export default ProtectedRouteUser;