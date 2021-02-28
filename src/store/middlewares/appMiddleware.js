import api from '../../services/api';
import { setError, setLoading } from '../actions/globalActions'
import { setClasses, setStudents, setUsers } from '../actions/appActions'

export const _getAllUsers = (token,) => {

    return async (dispatch, getState) => {

        let res = await api.getAllUsers(token);
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
export const _getStudents = (token,) => {

    return async (dispatch, getState) => {

        let res = await api.getStudent(token);
        if (res) {
            dispatch(setStudents(res.result))
        }
    }
}



