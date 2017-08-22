import { NavigationActions } from 'react-navigation';
import { fromPromise } from 'most';
import { select, Epic } from 'redux-most';

import * as D from '../../definitions';
import { register,login} from '../../apis/user';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUC = 'USER_LOGIN_SUC';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_SUC = 'USER_REGISTER_SUC';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

export const userLogin = (user: D.UserForLogin): D.UserLoginAction => ({ type: USER_LOGIN, payload: user });
export const userRegister = (user: D.UserForRegister): D.UserRegisterAction => ({ type: USER_REGISTER, payload: user });

const loginEpic: Epic<D.UserAction> = (action$,store) => action$.thru(select(USER_LOGIN))
    .chain((action: D.UserLoginAction) => fromPromise(login(action.payload).catch(()=>{
      return null
    })))
    // .chain((action: D.UserLoginAction) => fromPromise(Promise.resolve({
    //     name: ['Sam', 'Tom', 'John'][Math.floor(Math.random() * 2.9)]
    // })))
    .map((loginResponse) => {
      if(loginResponse){
            store.dispatch(NavigationActions.back());
            return {type:USER_LOGIN_SUC,payload: loginResponse}
      }else{
        return {type:USER_LOGIN_FAIL}
      }
    });


const registerEpic: Epic<D.UserAction> = (action$, store) => action$.thru(select(USER_REGISTER))
    .chain((action: D.UserRegisterAction) => fromPromise(register(action.payload)))
    .map((registerResponse) => {
        if(registerResponse){
            store.dispatch(NavigationActions.back());
            return { type: USER_REGISTER_SUC, payload: registerResponse }
        } else {
            return { type: USER_REGISTER_FAIL }
        }
    });

export const epics: Array<Epic<D.UserAction>> = [
    loginEpic,
    registerEpic,
];