import {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

import {loginPath, rootPath} from "../../utils/route-path";


const ProtectedRouteUser: FC<{isAuthOnly?: boolean, element: ReactElement}> = ({isAuthOnly = false, element}) => {
    const location = useLocation();
    // @ts-ignore TODO to next sprint
    const {isAuthUser, isAuthUserChecked} = useSelector(store => store.user);

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