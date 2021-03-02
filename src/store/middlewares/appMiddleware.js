import api from '../../services/api';
import { setError, setLoading } from '../actions/globalActions'
import { setClasses, setStudents, setUsers } from '../actions/appActions'

export const _getAllUsers = (token, code) => {

    return async (dispatch, getState) => {

        let res = await api.getStaffByCode(token, code);
        if (res) {
            dispatch(setUsers(res.result))
        }
    }
}
export const _getClasses = (token,) => {

    return async (dispatch, getState) => {

        let res = await api.getClass(token);
        if (res) {
            dispatch(setClasses(res.result))
        }
    }
}
export const _getStudents = (token, code) => {

    return async (dispatch, getState) => {

        let res = await api.getStudentByCode(token, code);
        if (res) {
            dispatch(setStudents(res.result))
        }
    }
}



