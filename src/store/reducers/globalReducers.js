import { LOADING, ERROR,  } from '../actions/types'

const initialState = {
    err: false,
    loading: false, 

}

const authReducers = (state = initialState, action) => {
    switch (action.type) {

        case LOADING:
            {
                return { ...state, loading: action.val }
            }
        case ERROR:
            {
                return { ...state, err: action.val }
            }
         

        default:
            return state;

    }


}



export default authReducers;