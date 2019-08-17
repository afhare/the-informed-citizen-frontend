import {START_SHOW_HOUSE_REP_FETCH, FETCH_SHOW_HOUSE_REP_SUCCESS} from '../actions/types'

export default function showHouseRep(state=[], action){
    switch (action.type){
        case START_SHOW_HOUSE_REP_FETCH:
            return state
        case FETCH_SHOW_HOUSE_REP_SUCCESS:
            const newState = action.showHouseRep
            return newState
        default:
            return state
    }
}