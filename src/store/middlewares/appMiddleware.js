import api from '../../services/api';
import { setError, setLoading } from '../actions/globalActions'
import { setFriends, setRequests } from '../actions/appActions'

export const _getRequests = (token, uid) => {

    return async (dispatch, getState) => {

        let res = await api.getFriendRequest(token, uid);
        if (res) {

            dispatch(setRequests(res.result))
        }
    }
}

export const _getFriends = (token, uid) => {

    return async (dispatch, getState) => {

        let res = await api.getFriends(token, uid);
        if (res) {
            dispatch(setFriends(res.result))
        }
    }
}


