import {Navigate} from "react-router-dom";

export const LogoutPage = () => {
    return (
        <Navigate to={'/'}/>
    );
};
