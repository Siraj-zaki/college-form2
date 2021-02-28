import api from '../../services/api';
import { login, setAvatar, updateInfo } from '../actions/authActions'
import { setLoading, setError } from '../actions/globalActions'
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const _login = (email, pass) => {

    return async (dispatch, getState) => {
        dispatch(setLoading(true))
        let res = await api.loginUser(email, pass);

        if (res) {
            await AsyncStorage.setItem('token', res.token)
            let info = jwt_decode(res.token)
            dispatch(login(res.token, info))
        }

        dispatch(setLoading(false));
    }
}
export const _socialLogin = (socialID, type) => {

    return async (dispatch, getState) => {
        dispatch(setLoading(true))
        let res = await api.socialLogin(socialID, type);
      
        if (res) {
            await AsyncStorage.setItem('token', res.token)
            let info = jwt_decode(res.token)
            dispatch(login(res.token, info))
        }

        dispatch(setLoading(false));
    }
}



export const _sendEmail = (email, num) => {

    return async (dispatch, getState) => {
        let res = await api.sendEmail(email, num)
    }
}


export const _editUser = (user) => {

    return async (dispatch, getState) => {

        dispatch(setLoading(true))
        let res = await api.editUser(user);
        dispatch(setLoading(false));
        if (res) {
            dispatch(setAvatar(user.avatar))
            dispatch(updateInfo(user))
            return true
        }
    }
}



