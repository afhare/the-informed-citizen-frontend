import {START_LOGIN_USER_FETCH, FETCH_LOGIN_USER_SUCCESS, LOGOUT, LOGOUT_SUCCESS, START_VERIFY_USER_FETCH, FETCH_VERIFY_USER_SUCCESS, START_UPDATE_USER_FETCH, FETCH_UPDATE_USER_SUCCESS, START_REGISTER_USER_FETCH, FETCH_REGISTER_USER_SUCCESS, START_DELETE_USER_FETCH, FETCH_DELETE_USER_SUCCESS} from '../actions/types'

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
    case START_VERIFY_USER_FETCH:
        return state
    case FETCH_VERIFY_USER_SUCCESS:
        const reloggedInState = action.loggedInUser
        return reloggedInState
    case START_UPDATE_USER_FETCH:
        return state
    case FETCH_UPDATE_USER_SUCCESS:
        const updatedState = action.loggedInUser
        return updatedState
    case START_REGISTER_USER_FETCH:
        return state
    case FETCH_REGISTER_USER_SUCCESS:
        const newUserState = action.loggedInUser
        return newUserState
    case START_DELETE_USER_FETCH:
        return state
    case FETCH_DELETE_USER_SUCCESS:
        const deletedUserState= action.loggedInUser
        return deletedUserState
    default:
        return state
    }
}