import {START_STATE_FETCH, FETCH_STATE_SUCCESS} from '../actions/types'

export default function senators(state=[], action){
    switch (action.type){
        case START_STATE_FETCH:
            return state
        case FETCH_STATE_SUCCESS:
            const newState = [...action.states]
            return newState
        default:
            return state
    }
}