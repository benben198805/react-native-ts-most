import * as D from '../definitions'
import { fetchJson } from './utils'

const login = (user: D.UserForLogin): Promise<D.User> =>
  fetchJson('http://secondhand.leanapp.cn/users/login', {
    method: 'POST',
    body: JSON.stringify(user),
  })


const register = (user: D.UserForRegister): Promise<D.User> =>
  fetchJson('http://secondhand.leanapp.cn/users/register', {
    method: 'POST',
    body: JSON.stringify(user),
  })


const logout = (sessionToken): Promise<D.User> =>
    fetchJson('http://secondhand.leanapp.cn/users/logout', {
      method: 'GET',
      headers:{
        sessionToken
      }
    })


export {
  login,
  register,
  logout
}
