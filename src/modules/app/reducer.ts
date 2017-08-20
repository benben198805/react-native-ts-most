import * as D from '../../definitions';
import * as Redux from 'redux';
import { endsWith, startsWith } from 'lodash';

const initialState: D.AppState = {
    loading: false,
    logined: false,
};

const appReducer: Redux.Reducer<D.AppState> = (state: D.AppState, action: Redux.Action): D.AppState => {
    state = state || initialState;
    const isLoading = endsWith(action.type, '_SUC') ||
        endsWith(action.type, '_FAIL') ||
        startsWith(action.type, 'Navigation')
    if (isLoading) {
        return {
            ...state,
            loading: false,
        };
    } else {
        return {
            ...state,
            loading: true,
        };
    }
};

export default appReducer