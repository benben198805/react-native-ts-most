import { UserForLogin, UserForRegister } from './definitions';
import * as Redux from 'redux';
import * as Navigation from 'react-navigation';

// This file holds our app typings


// BUSINESS LOGIC
export interface App {
    loading: boolean;
    logined: boolean;
}

export interface User {
    username: string;
    sessionToken:string
}

export interface Owner {
    username: string;
    objectId: string;
}

export interface Product {
    description: string;
    name: string;
    buyer?: Owner;
    price: string;
    owner: Owner;
    img: string;
    objectId: string;
    createdAt: string;
    updatedAt: string;
}

export interface BuyProductResponse {
    buyer: Owner;
    objectId: string;
    updatedAt: string;
}

export interface CurrentProduct {
    objectId: string;
}

export type HomeProducts = {
    products: Product[],
};

export interface UserProfile {
    id: string;
    email: string;
}

export interface UserForLogin {
    username: string;
    password: string;
}

export interface UploadProduct {
	name: string;
	price: string;
	img: string;
	description: string;
}

export interface UploadProductImage {
	img: string;
}

export interface UserForRegister extends UserForLogin {

}

// ACTION CREATORS


// ACTIONS
export interface GeneralAction extends Redux.Action {
    payload?: object,
}
export interface UserLoginAction extends GeneralAction {
    payload?: UserForLogin,
}
export interface UserRegisterAction extends GeneralAction {
    payload?: UserForRegister,
}
export interface UserAction extends GeneralAction {
    payload?: User | UserForLogin | UserProfile | UserForRegister
}
export interface GetBoughtProductAction extends GeneralAction {
    payload?: User
}
export interface GetOwnProductAction extends GeneralAction {
    payload?: User
}
export interface UploadProductAction extends GeneralAction {
    payload?: UploadProduct
}
export interface UploadProductImageAction extends GeneralAction {
    payload?: UploadProductImage
}
export interface FetchHomeProductsAction extends GeneralAction {
    payload?: Product[];
}
export interface BuyProductAction extends GeneralAction {
    payload?: CurrentProduct;
}

// STATES
export type AppState = App;
export type UserState = User;
export type ProductState = {
    boughtProducts: Product[],
    ownProducts: Product[],
    currentImage: string,
};
export type HomeProductsState = HomeProducts;


export interface RootState {
    user?: UserState,
    app?: AppState,
    home?: HomeProductsState;
    nav?: any,
    product?: ProductState;
}