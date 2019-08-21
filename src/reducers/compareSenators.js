import {START_COMPARE_SENATOR_FETCH, FETCH_COMPARE_SENATOR_SUCCESS, START_REMOVE_COMPARE_SENATOR, REMOVE_COMPARE_SENATOR_SUCCESS} from '../actions/types'

export default function compareSenators(state=[], action){
    switch (action.type){
        case START_COMPARE_SENATOR_FETCH:
            return state
        case FETCH_COMPARE_SENATOR_SUCCESS:
            return state.concat(action.compareSenators)
        case START_REMOVE_COMPARE_SENATOR:
            return state
        case REMOVE_COMPARE_SENATOR_SUCCESS:
            const newState = state.filter(senator => senator.id !== action.removeSenator)
            return newState
        default:
            return state
        }
}