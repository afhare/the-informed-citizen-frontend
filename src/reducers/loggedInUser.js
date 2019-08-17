import {START_LOGIN_USER_FETCH, FETCH_LOGIN_USER_SUCCESS, LOGOUT, LOGOUT_SUCCESS} from '../actions/types'

export default function loggedInUser(state=[], action){
    switch (action.type){
    case START_LOGIN_USER_FETCH:
        return state
    case FETCH_LOGIN_USER_SUCCESS:
        const newState = action.loggedInUser
        return newState
    case LOGOUT:
        return state
    case LOGOUT_SUCCESS:
        const clearState = []
        return clearState
    default:
        return state
    }
}