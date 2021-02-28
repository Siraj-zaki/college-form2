import { SET_BOTTLE_POWER, SET_BOTTLE_PLAN, SET_REQUESTS, SET_FRIENDS } from './types';


export const setBottleWater = (payload) => (
    {
        type: SET_BOTTLE_POWER,
        payload
    }
)
export const setBottlePlan = (payload) => (
    {
        type: SET_BOTTLE_PLAN,
        payload
    }
)
export const setRequests = (payload) => (
    {
        type: SET_REQUESTS,
        payload
    }
)
export const setFriends = (payload) => (
    {
        type: SET_FRIENDS,
        payload
    }
)
