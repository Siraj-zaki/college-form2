import { LOGIN,   LOGOUT, UPDATE_INFO, SET_LOGGED, SET_AVATAR,  } from './types';


export const login = (token, info) => (
    {
        type: LOGIN,
        token: token,
        info: info,
    }
)

export const logout = () => (
    {
        type: LOGOUT
    }
)

export const updateInfo = (info) => (
    {
        type: UPDATE_INFO,
        info: info
    }
)
export const setAvatar = (val) => (
    {
        type: SET_AVATAR,
        val: val
    }
)
 
export const setLogged = (payload) => (
    {
        type: SET_LOGGED,
        payload
    }
)
