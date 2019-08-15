import {START_SHOW_STATE_FETCH, FETCH_SHOW_STATE_SUCCESS} from '../actions/types'

export default function senators(state=[], action){
    switch (action.type){
        case START_SHOW_STATE_FETCH:
            return state
        case FETCH_SHOW_STATE_SUCCESS:
            const newState = action.showState
            return newState
        default:
            return state
    }
}