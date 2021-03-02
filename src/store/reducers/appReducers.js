import { SET_CLASSES, SET_STUDENTS, SET_USERS,SET_SERVICES } from '../actions/types'

const initialState = {
    users: [], classes: [], students: [], services: [],
}

const appReducers = (state = initialState, action) => {
    switch (action.type) {


        case SET_USERS:
            {
                return {
                    ...state, users: action.payload,
                }
            }
        case SET_CLASSES:
            {
                return {
                    ...state, classes: action.payload,
                }
            }
        case SET_STUDENTS:
            {
                return {
                    ...state, students: action.payload,
                }
            }
        case SET_SERVICES:
            {
                return {
                    ...state, services: action.payload,
                }
            }

        default:
            return state;

    }

}


export default appReducers;