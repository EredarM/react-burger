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

import global from "../../index.module.css";


const Router = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const baseUrl = location.state && location.state.baseUrl;

    React.useEffect(
        () => {
            dispatch(getBurgerIngredients());
        },
        [dispatch]
    );

    return (
        <>
            <Routes location={baseUrl || location}>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/profile'} element={
                    <ProtectedRouteUser
                        isAuthOnly={true}
                        element={
                            <ProfilePage element={
                                <Profile/>
                            }/>
                        }
                    />
                }/>
                <Route path={'/profile/orders'} element={
                    <ProtectedRouteUser
                        isAuthOnly={true}
                        element={
                            <ProfilePage element={
                                <OrderHistory/>
                            }/>
                        }
                    />
                }/>
                <Route path="/ingredients/:id" element={<IngredientInfo />} />
                <Route path={'/logout'} element={
                    <ProfilePage/>
                }/>
                <Route path={'/login'} element={
                    <ProtectedRouteUser
                        element={
                            <LoginPage/>
                        }
                    />
                }/>
                <Route path={'/register'} element={
                    <ProtectedRouteUser
                        element={
                            <RegisterPage/>
                        }
                    />
                }/>
                <Route path={'/forgot-password'} element={
                    <ProtectedRouteUser
                        element={
                            <ForgotPasswordPage/>
                        }
                    />
                }/>
                <Route path={'/reset-password'} element={
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
