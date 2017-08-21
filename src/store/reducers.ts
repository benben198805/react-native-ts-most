import { reducer as nav } from './Router'
import app from '../modules/app/reducer';
import user from '../modules/user/reducer';
import home from '../modules/home/reducer';
import product from '../modules/product/reducer';

export default {
    nav,
    app,
    user,
    home,
    product,
};
