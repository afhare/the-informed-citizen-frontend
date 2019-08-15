import {START_HOUSE_FETCH, START_SENATE_FETCH, FETCH_HOUSE_SUCCESS, FETCH_SENATE_SUCCESS, START_STATE_FETCH, FETCH_STATE_SUCCESS, START_SHOW_STATE_FETCH, FETCH_SHOW_STATE_SUCCESS, START_SHOW_HOUSE_REP_FETCH, FETCH_SHOW_HOUSE_REP_SUCCESS, START_SHOW_SENATOR_FETCH, FETCH_SHOW_SENATOR_SUCCESS } from './types'

export function fetchHouseReps(){
    return function (dispatch){
        dispatch({type: START_HOUSE_FETCH})
        fetch('http://localhost:3001/representatives').then(response => response.json()).then(data => {
            dispatch({type: FETCH_HOUSE_SUCCESS, representatives: data})
        })
    }
}

export function fetchSenators(){
    return function (dispatch){
        dispatch({type: START_SENATE_FETCH})
        fetch('http://localhost:3001/senators').then(response => response.json()).then(data => {
            dispatch({type: FETCH_SENATE_SUCCESS, senators: data})
        })
    }
}

export function fetchStates(){
    return function (dispatch){
        dispatch({type: START_STATE_FETCH})
        fetch('http://localhost:3001/states').then(response => response.json()).then(data => {
            dispatch({type: FETCH_STATE_SUCCESS, states: data})
        })
    }
}

export function fetchShowState(stateID){
    return function (dispatch){
        dispatch({type: START_SHOW_STATE_FETCH})
        fetch(`http://localhost:3001/states/${stateID}`).then(response => response.json()).then(data => {
            dispatch({type: FETCH_SHOW_STATE_SUCCESS, showState: data})
        })
    }
}

export function fetchShowSenator(senatorID){
    return function (dispatch){
        dispatch({type: START_SHOW_SENATOR_FETCH})
        fetch(`http://localhost:3001/senators/${senatorID}`).then(response => response.json()).then(data => {
            console.log(data)
            dispatch({type: FETCH_SHOW_SENATOR_SUCCESS, showSenator: data})
        })
    }
}

export function fetchShowHouseRep(repID){
    return function (dispatch){
        dispatch({type: START_SHOW_HOUSE_REP_FETCH})
        fetch(`http://localhost:3001/representatives/${repID}`).then(response => response.json()).then(data => {
            dispatch({type: FETCH_SHOW_HOUSE_REP_SUCCESS, showHouseRep: data})
        })
    }
}