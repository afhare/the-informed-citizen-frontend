import {START_COMPARE_REP_FETCH, FETCH_COMPARE_REP_SUCCESS, START_REMOVE_COMPARE_REP, REMOVE_COMPARE_REP_SUCCESS} from '../actions/types'

export default function compareRepresentatives(state=[], action){
    switch (action.type){
        case START_COMPARE_REP_FETCH:
            return state
        case FETCH_COMPARE_REP_SUCCESS:
            return state.concat(action.compareHouseReps)
        case START_REMOVE_COMPARE_REP:
            return state
        case REMOVE_COMPARE_REP_SUCCESS:
            const newState = state.filter(representative => representative.id !== action.removeRepresentative)
            return newState
        default:
            return state
        }
}