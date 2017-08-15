import { fromPromise } from 'most';
import { select, Epic } from 'redux-most';

import * as D from '../../definitions';
import { homeProducts } from '../../apis/products';
import { NavigationActions } from 'react-navigation';

export const FETCH_HOME_PRODUCTS = 'FETCH_HOME_PRODUCTS ';
export const FETCH_HOME_PRODUCTS_SUC = 'FETCH_HOME_PRODUCTS_SUC';
export const FETCH_HOME_PRODUCTS_FAIL = 'FETCH_HOME_PRODUCTS_FAIL';

export const FETCH_PRODUCT = 'FETCH_PRODUCT ';
export const FETCH_PRODUCTS_SUC = 'FETCH_PRODUCTS_SUC';

export const getHomeProducts = (): D.FetchHomeProductsAction => ({ type: FETCH_HOME_PRODUCTS });
export const setCurrentProduct = (currentProduct: D.CurrentProduct): D.FetchProductAction => ({ type: FETCH_PRODUCT, payload: currentProduct });

const fetchHomeProductsEpic: Epic<D.GeneralAction> = (action$) => action$.thru(select(FETCH_HOME_PRODUCTS))
    .chain((action: D.FetchHomeProductsAction) => fromPromise(homeProducts()))
    .map((homeProductsRepoonse: null | D.Product[]) => {
        return (
            homeProductsRepoonse
                ? { type: FETCH_HOME_PRODUCTS_SUC, payload: homeProductsRepoonse }
                : { type: FETCH_HOME_PRODUCTS_FAIL }
        );
    });

const setCurrentProductEpic: Epic<D.GeneralAction> = (action$, store) => action$.thru(select(FETCH_PRODUCT))
    .map((action: D.FetchProductAction) => {
        store.dispatch(NavigationActions.navigate({
            routeName: 'Detail',
        }))
        return action.payload;
    })
    .map((payload: D.CurrentProduct) => ({ type: FETCH_PRODUCTS_SUC, payload }));

export const epics: Array<Epic<D.GeneralAction>> = [
    fetchHomeProductsEpic,
    setCurrentProductEpic,
];