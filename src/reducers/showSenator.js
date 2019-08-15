import {START_SHOW_SENATOR_FETCH, FETCH_SHOW_SENATOR_SUCCESS} from '../actions/types'

export default function senators(state=[], action){
    switch (action.type){
        case START_SHOW_SENATOR_FETCH:
            return state
        case FETCH_SHOW_SENATOR_SUCCESS:
            const newState = action.showSenator
            return newState
        default:
            return state
    }
}