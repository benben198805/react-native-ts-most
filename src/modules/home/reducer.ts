import * as D from '../../definitions';
import * as Redux from 'redux';

const initialState: D.HomeProductsState = {
    products: [],
    current: {
        objectId: '',
    },
};

const homeReducer: Redux.Reducer<D.HomeProductsState> = (state: D.HomeProductsState, action: D.GeneralAction): D.HomeProductsState => {
    state = state || initialState;
    switch (action.type) {
        case 'FETCH_HOME_PRODUCTS_SUC':
            const products = action.payload as D.Product[];
            return {
                ...state,
                products,
            };
        case 'FETCH_PRODUCTS_SUC':
            const current = (action.payload as D.CurrentProduct);
            return {
                ...state,
                current,
            };
        default:
    }
    return state;
};

export default homeReducer;
