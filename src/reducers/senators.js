import {START_SENATE_FETCH, FETCH_SENATE_SUCCESS} from '../actions/types'

export default function senators(state=[], action){
    switch (action.type){
        case START_SENATE_FETCH:
            return state
        case FETCH_SENATE_SUCCESS:
            const newState = [...action.senators]
            return newState
        default:
            return state
        }
}
    