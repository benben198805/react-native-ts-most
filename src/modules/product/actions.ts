import { NavigationActions } from 'react-navigation';
import { fromPromise } from 'most';
import { select, Epic } from 'redux-most';

import * as D from '../../definitions';
import {
    boughtProductList,
    ownProductList,
    uploadProductDetail,
    uploadImage,
} from '../../apis/products';

export const GET_BOUGHT_PRODUCT = 'GET_BOUGHT_PRODUCT';
export const GET_BOUGHT_PRODUCT_SUC = 'GET_BOUGHT_PRODUCT_SUC';
export const GET_BOUGHT_PRODUCT_FAIL = 'GET_BOUGHT_PRODUCT_FAIL';

export const GET_OWN_PRODUCT = 'GET_OWN_PRODUCT';
export const GET_OWN_PRODUCT_SUC = 'GET_OWN_PRODUCT_SUC';
export const GET_OWN_PRODUCT_FAIL = 'GET_OWN_PRODUCT_FAIL';

export const UPLOAD_PRODUCT = 'UPLOAD_PRODUCT';
export const UPLOAD_PRODUCT_SUC = 'UPLOAD_PRODUCT_SUC';
export const UPLOAD_PRODUCT_FAIL = 'UPLOAD_PRODUCT_FAIL';

export const UPLOAD_PRODUCT_IMAGE = 'UPLOAD_PRODUCT_IMAGE';
export const UPLOAD_PRODUCT_IMAGE_SUC = 'UPLOAD_PRODUCT_IMAGE_SUC';
export const UPLOAD_PRODUCT_IMAGE_FAIL = 'UPLOAD_PRODUCT_IMAGE_FAIL';

export const getBoughtProduct = (user: D.User): D.GetBoughtProductAction => ({ type: GET_BOUGHT_PRODUCT, payload: user });
export const getOwnProduct = (user: D.User): D.GetOwnProductAction => ({ type: GET_OWN_PRODUCT, payload: user });
export const uploadProduct = (product: D.UploadProduct): D.UploadProductAction => ({ type: UPLOAD_PRODUCT, payload: product });
export const uploadProductImage = (image: D.UploadProductImage): D.UploadProductImageAction => ({ type: UPLOAD_PRODUCT_IMAGE, payload: image });

const getBoughtProductEpic: Epic<D.GeneralAction> = (action$, store) => action$.thru(select(GET_BOUGHT_PRODUCT))
    .chain((action: D.GetBoughtProductAction) => fromPromise(boughtProductList(action.payload)))
    .map((getBoughtProductResponse) => {
        return getBoughtProductResponse ?
            { type: GET_BOUGHT_PRODUCT_SUC, payload: getBoughtProductResponse } :
            { type: GET_BOUGHT_PRODUCT_FAIL }
    });


const getOwnProductEpic: Epic<D.GeneralAction> = (action$, store) => action$.thru(select(GET_OWN_PRODUCT))
    .chain((action: D.GetOwnProductAction) => fromPromise(ownProductList(action.payload)))
    .map((getOwnProductResponse) => {
        return getOwnProductResponse ?
            { type: GET_OWN_PRODUCT_SUC, payload: getOwnProductResponse } :
            { type: GET_OWN_PRODUCT_FAIL }
    });

const uploadProductEpic: Epic<D.GeneralAction> = (action$, store) => action$.thru(select(UPLOAD_PRODUCT))
    .chain((action: D.UploadProductAction) => fromPromise(uploadProductDetail(action.payload, store.getState().user)))
    .map((uploadProductResponse) => {
        if (uploadProductResponse) {
            store.dispatch(NavigationActions.back());
            return { type: UPLOAD_PRODUCT_SUC, payload: uploadProductResponse }
        }
        return { type: UPLOAD_PRODUCT_FAIL }
    });

const uploadProductImageEpic: Epic<D.GeneralAction> = (action$, store) => action$.thru(select(UPLOAD_PRODUCT_IMAGE))
    .chain((action: D.UploadProductImageAction) => fromPromise(uploadImage(action.payload, store.getState().user)))
    .map((uploadProductImageResponse) => {
        console.log(uploadProductImageResponse)
        return uploadProductImageResponse ?
        { type: UPLOAD_PRODUCT_IMAGE_SUC, payload: {img: uploadProductImageResponse} } :
        { type: UPLOAD_PRODUCT_IMAGE_FAIL }
    });

export const epics: Array<Epic<D.GeneralAction>> = [
    getBoughtProductEpic,
    getOwnProductEpic,
    uploadProductEpic,
    uploadProductImageEpic,
];