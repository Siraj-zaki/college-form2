import { SET_STUDENTS, SET_USERS, SET_CLASSES, SET_SERVICES } from './types';


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
export const setServices = (payload) => (
    {
        type: SET_SERVICES,
        payload
    }
)
