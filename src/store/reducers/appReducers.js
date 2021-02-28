import { SET_BOTTLE_POWER, SET_BOTTLE_PLAN, SET_REQUESTS, SET_FRIENDS } from '../actions/types'

const initialState = {
    user: false,
}

const appReducers = (state = initialState, action) => {
    switch (action.type) {

        
        case SET_FRIENDS:
            {
                return {
                    ...state, friends: action.payload,
                }
            }

        default:
            return state;

    }

}


export default appReducers;