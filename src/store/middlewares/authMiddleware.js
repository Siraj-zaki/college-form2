import api from '../../services/api';
import { login, setAvatar, updateInfo } from '../actions/authActions'
import { setLoading,  } from '../actions/globalActions'
import jwt_decode from "jwt-decode";

export const _login = (cCode, email, pass) => {

    return async (dispatch, getState) => {
        dispatch(setLoading(true))
        let res = await api.loginUser(email, pass);

        if (res) {

            let user = jwt_decode(res.token)
            user.collegeCode = cCode
            dispatch(login(res.token, user))
            return true
        }
        dispatch(setLoading(false));
        return false
    }
}



export const _sendEmail = (email, num) => {

    return async (dispatch, getState) => {
        // let res = await api.sendEmail(email, num)
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



