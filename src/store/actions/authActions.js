import { LOGIN, REGISTRATION, LOGOUT, UPDATE_INFO, UPDATE_COIN, SET_LOGGED, SET_AVATAR, SET_SOCIAL_TOKEN } from './types';


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
export const setSocialToken = (val) => (
    {
        type: SET_SOCIAL_TOKEN,
        val: val
    }
)
export const setLogged = (payload) => (
    {
        type: SET_LOGGED,
        payload
    }
)
