import {Route, Routes, useLocation} from 'react-router-dom';
import React from "react";
import {useDispatch} from "react-redux";

import OrderHistory from "../order-history/order-history";
import ProtectedRouteUser from "../protected-routes/protected-route-user";
import {ForgotPasswordPage, HomePage, LoginPage, ProfilePage, RegisterPage} from "../../pages";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import Profile from "../profile/profile";
import AppHeader from "../app-header/app-header";
import IngredientInfo from "../ingredient-info/ingredient-info";
import {getBurgerIngredients} from "../../services/actions/burger-ingredients";
import {
    forgotPasswordPath,
    ingredientByIdPath,
    loginPath,
    logoutPath,
    profileOrdersPath,
    profilePath,
    registerPath,
    resetPasswordPath,
    rootPath
} from "../../utils/route-path";

import global from "../../index.module.css";
import {LogoutPage} from "../../pages/logout-page/logout-page";
import {TLocationProps} from "../../../declarations/types";
import {isUserAuth} from "../../services/actions/user/user";


const Router = () => {
    const dispatch = useDispatch();
    const location = useLocation() as TLocationProps;
    const baseUrl = location.state && location.state.baseUrl;

    React.useEffect(
        () => {
            // @ts-ignore TODO to next sprint
            dispatch(getBurgerIngredients());
            // @ts-ignore
            dispatch(isUserAuth());
        },
        [dispatch]
    );

    return (
        <>
            <Routes location={baseUrl || location}>
                <Route path={rootPath} element={
                    <HomePage/>
                }/>
                <Route path={profilePath} element={
                    <ProtectedRouteUser
                        isAuthOnly={true}
                        element={
                            <ProfilePage element={
                                <Profile/>
                            }/>
                        }
                    />
                }/>
                <Route path={profileOrdersPath} element={
                    <ProtectedRouteUser
                        isAuthOnly={true}
                        element={
                            <ProfilePage element={
                                <OrderHistory/>
                            }/>
                        }
                    />
                }/>
                <Route path={ingredientByIdPath} element={
                    <IngredientInfo/>
                }/>
                <Route path={logoutPath} element={
                    <LogoutPage/>
                }/>
                <Route path={loginPath} element={
                    <ProtectedRouteUser
                        element={
                            <LoginPage/>
                        }
                    />
                }/>
                <Route path={registerPath} element={
                    <ProtectedRouteUser
                        element={
                            <RegisterPage/>
                        }
                    />
                }/>
                <Route path={forgotPasswordPath} element={
                    <ProtectedRouteUser
                        element={
                            <ForgotPasswordPage/>
                        }
                    />
                }/>
                <Route path={resetPasswordPath} element={
                    <ProtectedRouteUser
                        element={
                            <ResetPasswordPage/>
                        }
                    />
                }/>
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <>
            <AppHeader/>
            <main className={`${global.main} pb-10`}>
                <Router/>
            </main>
        </>
    );
};


export default App;
