import {ReactNode} from "react";

type TLocationProps = {
    pathname?: string;
    state: {
        baseUrl: string;
        id: string;
    };
};

interface IHeaderNavElement {
    iconType: string;
    text: string;
    url: string;
}

interface IConstructorElement {
    id: string;
    index?: number;
    type: string;
    imgPath: string;
    price: number;
    title: string;
}

interface IIngredientElements {
    data: Array<TIngredient>;
    onClick: (e: HTMLLIElement<TIngredient>) => void;
    id: string;
    headerText: string;
}

interface IIngredientElement {
    data: TIngredient;
    onClick: (e: HTMLLIElement<TIngredient>) => void;
    count: number;
}

type TDragItem = {
    id: string;
    index: number;
};

type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
};

interface IModal {
    title?: string;
    onClose: () => void
    children: ReactNode
}

type TOrder = {
    orderData: {
        name: string;
        order: {
            number: number;
        };
        success: boolean
    };
};


type TEmail = {
    email: string;
};

type TPassword = {
    password: string;
};

type TName = {
    name: string;
};

type TToken = {
    token: string;
};

type TUser = TEmail & TPassword;

type TUpdateUser = TUser & TName;

type TRegisterUser = TUser & TName;

type TForgotPasswordUser = TEmail;

type TResetPasswordUser = TToken & TPassword;

type TLogoutUser = TToken;

type IUpdateUser = {
    success: string;
    user: {
        email: TEmail;
        name: TName;
    }
}