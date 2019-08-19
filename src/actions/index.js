import {START_HOUSE_FETCH, START_SENATE_FETCH, FETCH_HOUSE_SUCCESS, FETCH_SENATE_SUCCESS, START_STATE_FETCH, FETCH_STATE_SUCCESS, START_SHOW_STATE_FETCH, FETCH_SHOW_STATE_SUCCESS, START_SHOW_HOUSE_REP_FETCH, FETCH_SHOW_HOUSE_REP_SUCCESS, START_SHOW_SENATOR_FETCH, FETCH_SHOW_SENATOR_SUCCESS, START_LOGIN_USER_FETCH, FETCH_LOGIN_USER_SUCCESS, LOGOUT, LOGOUT_SUCCESS, FETCH_VERIFY_USER_SUCCESS, START_VERIFY_USER_FETCH, START_UPDATE_USER_FETCH, FETCH_UPDATE_USER_SUCCESS } from './types'

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

export function login(username, password, history){
    let reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify({user: {username, password}})
    }

    return function (dispatch){
        dispatch({type: START_LOGIN_USER_FETCH})
        fetch(`http://localhost:3001/login`, reqObj).then(response => response.json()).then(data => {
            if (!data['error']){
                localStorage.setItem('user', data.jwt)
                dispatch({type: FETCH_LOGIN_USER_SUCCESS, loggedInUser: data})
                history.push(`/profile`)
            } else {
                alert(data.error);
            }}).catch(error => console.log(error))
    }
}

export function logout(history){

    return function (dispatch){
        dispatch({type: LOGOUT})
        console.log('logged out')
        dispatch({type: LOGOUT_SUCCESS})
        history.push('/')
    }
}

export function verifyLogin(token){
    let reqObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    return function (dispatch){
        dispatch({type: START_VERIFY_USER_FETCH})
        fetch(`http://localhost:3001/profile`, reqObj).then(response => response.json()).then(data => {
            if (!data['error']){
                localStorage.setItem('user', data.jwt)
                console.log(data)
                dispatch({type: FETCH_VERIFY_USER_SUCCESS, loggedInUser: data})
                // history.push(`/profile`)
            } else {
                alert(data.error);
            }}).catch(error => console.log(error))
    }
}

export function updateProfile(address,token,history){
    let updateObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({user: {street_address: address.street_address, city: address.city, user_state: address.user_state, zipcode: address.zipcode}})
    }

    return function (dispatch){
        dispatch({type: START_UPDATE_USER_FETCH})
        fetch(`http://localhost:3001/update-profile`, updateObj).then(response => response.json()).then(data => {
            if (!data['error']){
                localStorage.setItem('user', data.jwt)
                console.log(data)
                dispatch({type: FETCH_UPDATE_USER_SUCCESS, loggedInUser: data})
                history.push(`/profile`)
            } else {
                alert(data.error);
            }}).catch(error => console.log(error))
    }
}