import { SET_STUDENTS, SET_USERS, SET_CLASSES } from './types';


export const setUsers = (payload) => (
    {
        type: SET_USERS,
        payload
    }
)
export const setClasses = (payload) => (
    {
        type: SET_CLASSES,
        payload
    }
)
export const setStudents = (payload) => (
    {
        type: SET_STUDENTS,
        payload
    }
)
