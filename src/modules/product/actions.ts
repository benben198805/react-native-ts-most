import { fromPromise } from 'most';
import { select, Epic } from 'redux-most';

import * as D from '../../definitions';
import {
    boughtProductList,
    ownProductList
} from '../../apis/products';

export const GET_BOUGHT_PRODUCT = 'GET_BOUGHT_PRODUCT';
export const GET_BOUGHT_PRODUCT_SUC = 'GET_BOUGHT_PRODUCT_SUC';
export const GET_BOUGHT_PRODUCT_FAIL = 'GET_BOUGHT_PRODUCT_FAIL';

export const GET_OWN_PRODUCT = 'GET_OWN_PRODUCT';
export const GET_OWN_PRODUCT_SUC = 'GET_OWN_PRODUCT_SUC';
export const GET_OWN_PRODUCT_FAIL = 'GET_OWN_PRODUCT_FAIL';

export const getBoughtProduct = (user: D.User): D.GetBoughtProductAction => ({ type: GET_BOUGHT_PRODUCT, payload: user });
export const getOwnProduct = (user: D.User): D.GetOwnProductAction => ({ type: GET_OWN_PRODUCT, payload: user });

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

export const epics: Array<Epic<D.UserAction>> = [
    getBoughtProductEpic,
    getOwnProductEpic,
];