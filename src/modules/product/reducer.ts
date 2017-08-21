import * as D from '../../definitions';
import * as Redux from 'redux';

const initialState: D.ProductState = {
    boughtProducts: [],
    ownProducts: [],
};

const productReducer: Redux.Reducer<D.ProductState> = (state: D.ProductState, action: D.GeneralAction): D.ProductState => {
    state = state || initialState;
    switch (action.type) {
        case 'GET_BOUGHT_PRODUCT_SUC':
            const boughtProducts = action.payload as D.Product[];
            return {
                ...state,
                boughtProducts,
            };
        case 'GET_OWN_PRODUCT_SUC':
            const ownProducts = action.payload as D.Product[];
            return {
                ...state,
                ownProducts,
            };
        default:
    }
    return state;
};

export default productReducer;
