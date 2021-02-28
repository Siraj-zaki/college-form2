import { LOGIN, LOGOUT, REGISTRATION, UPDATE_INFO, UPDATE_COIN, SET_LOGGED, SET_AVATAR, SET_SOCIAL_TOKEN, SET_FRIENDS } from '../actions/types'

const initialState = {
    logged: false, user: false,
}

const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            {
                // console.log(action.coin)
                return {
                    ...state,
                    logged: true, token: action.token, user: action.info,
                    //  avatar: action.info.avatar,
                }
            }

        case UPDATE_INFO:
            {
                return {
                    ...state, user: action.info
                }
            }

        case LOGOUT:
            {
                return {
                    ...state, logged: false,  //info: [], avatar: '', token: ''
                }
            }
        case SET_LOGGED:
            {
                return {
                    ...state, logged: action.payload,
                }
            }
        case SET_SOCIAL_TOKEN:
            {
                return {
                    ...state, socialToken: action.val,
                }
            }
        case SET_AVATAR:
            {
                return {
                    ...state, avatar: action.val,
                }
            }
        default:
            return state;

    }


}



export default authReducers;