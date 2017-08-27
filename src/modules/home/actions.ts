import { NavigationActions } from 'react-navigation';
import { fromPromise } from 'most';
import { select, Epic } from 'redux-most';

import * as D from '../../definitions';
import { homeProducts, buyProduct } from '../../apis/products';

export const FETCH_HOME_PRODUCTS = 'FETCH_HOME_PRODUCTS ';
export const FETCH_HOME_PRODUCTS_SUC = 'FETCH_HOME_PRODUCTS_SUC';
export const FETCH_HOME_PRODUCTS_FAIL = 'FETCH_HOME_PRODUCTS_FAIL';

export const BUY_PRODUCT = 'BUY_PRODUCT ';
export const BUY_PRODUCT_SUC = 'BUY_PRODUCT_SUC';
export const BUY_PRODUCT_FAIL = 'BUY_PRODUCT_FAIL';

export const getHomeProducts = (): D.FetchHomeProductsAction => ({ type: FETCH_HOME_PRODUCTS });
export const buyHomeProduct = (currentProduct: D.CurrentProduct): D.BuyProductAction => ({ type: BUY_PRODUCT, payload: currentProduct });

const fetchHomeProductsEpic: Epic<D.GeneralAction> = (action$) => action$.thru(select(FETCH_HOME_PRODUCTS))
    .chain((action: D.FetchHomeProductsAction) => fromPromise(homeProducts()))
    .map((homeProductsResponse: null | D.Product[]) => {
        return (
            homeProductsResponse
                ? { type: FETCH_HOME_PRODUCTS_SUC, payload: homeProductsResponse }
                : { type: FETCH_HOME_PRODUCTS_FAIL }
        );
    });

const buyProductEpic: Epic<D.GeneralAction> = (action$, store) => action$.thru(select(BUY_PRODUCT))
    .chain((action: D.BuyProductAction) => fromPromise(buyProduct(action.payload.objectId, store.getState().user.sessionToken)))
    .map((buyProductRespoonse: null | D.BuyProductResponse) => {
        if (buyProductRespoonse) {
            store.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
            return { type: BUY_PRODUCT_SUC, payload: buyProductRespoonse }
        } else {
            return { type: BUY_PRODUCT_FAIL }
        }
    });

export const epics: Array<Epic<D.GeneralAction>> = [
    fetchHomeProductsEpic,
    buyProductEpic,
];