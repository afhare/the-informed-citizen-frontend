import {START_HOUSE_FETCH, START_SENATE_FETCH, FETCH_HOUSE_SUCCESS, FETCH_SENATE_SUCCESS, START_STATE_FETCH, FETCH_STATE_SUCCESS, START_SHOW_STATE_FETCH, FETCH_SHOW_STATE_SUCCESS, START_SHOW_HOUSE_REP_FETCH, FETCH_SHOW_HOUSE_REP_SUCCESS, START_SHOW_SENATOR_FETCH, FETCH_SHOW_SENATOR_SUCCESS, START_LOGIN_USER_FETCH, FETCH_LOGIN_USER_SUCCESS, LOGOUT, LOGOUT_SUCCESS, FETCH_VERIFY_USER_SUCCESS, START_VERIFY_USER_FETCH, START_UPDATE_USER_FETCH, FETCH_UPDATE_USER_SUCCESS, START_REGISTER_USER_FETCH, FETCH_REGISTER_USER_SUCCESS, START_DELETE_USER_FETCH, FETCH_DELETE_USER_SUCCESS, START_COMPARE_REP_FETCH, FETCH_COMPARE_REP_SUCCESS, START_COMPARE_SENATOR_FETCH, FETCH_COMPARE_SENATOR_SUCCESS, START_REMOVE_COMPARE_SENATOR, REMOVE_COMPARE_SENATOR_SUCCESS, START_REMOVE_COMPARE_REP, REMOVE_COMPARE_REP_SUCCESS} from './types'

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
                dispatch({type: FETCH_VERIFY_USER_SUCCESS, loggedInUser: data})
            } else {
                alert(data.error);
            }}).catch(error => console.log(error))
    }
}

export function updateProfile(userObj,token,history){
    let updateObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({user: {name: userObj.name , user_state: userObj.user_state}})
    }

    return function (dispatch){
        dispatch({type: START_UPDATE_USER_FETCH})
        fetch(`http://localhost:3001/update-profile`, updateObj).then(response => response.json()).then(data => {
            if (!data['error']){
                localStorage.setItem('user', data.jwt)
                dispatch({type: FETCH_UPDATE_USER_SUCCESS, loggedInUser: data})
                history.push(`/profile`)
            } else {
                alert(data.error);
            }}).catch(error => console.log(error))
    }
}

export function register(userObj, history){
    let newObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify(userObj)
    }

    return function (dispatch){
        dispatch({type: START_REGISTER_USER_FETCH})
        fetch(`http://localhost:3001/register`, newObj).then(response => response.json()).then(data => {
            if (!data['error']){
                localStorage.setItem('user', data.jwt)
                dispatch({type: FETCH_REGISTER_USER_SUCCESS, loggedInUser: data})
                history.push(`/profile`)
            } else {
                alert(data.error);
            }}).catch(error => console.log(error))
    }
}

export function deleteUser(username, token, history){
    let delObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({user:{username}})
    }

    return function (dispatch){
        dispatch({type: START_DELETE_USER_FETCH})
        fetch(`http://localhost:3001/delete-user`, delObj).then(response => response.json()).then(data => {
            if (!data['error']){
                localStorage.removeItem('user')
                dispatch({type: FETCH_DELETE_USER_SUCCESS, loggedInUser: []})
                alert(data.message)
                history.push(`/`)
            } else {
                alert(data.error);
            }}).catch(error => console.log(error))
    }
}

export function fetchCompareHouseReps(id, token){
    let compareHouseObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({representative:{id}})
    }
    return function (dispatch){
        dispatch({type: START_COMPARE_REP_FETCH})
        fetch(`http://localhost:3001/representatives-compare`, compareHouseObj).then(response => response.json()).then(data => {
            if (!data['error']){
                dispatch({type: FETCH_COMPARE_REP_SUCCESS, compareHouseReps: data})
            } else {
                alert(data.error);
            }}).catch(error => console.log(error))
    }
}

export function fetchCompareSenators(id, token){
    
    let compareSenateObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({senator:{id}})
    }
    return function (dispatch){
        dispatch({type: START_COMPARE_SENATOR_FETCH})
        fetch(`http://localhost:3001/senators-compare`, compareSenateObj).then(response => response.json()).then(data => {
            if (!data['error']){
                dispatch({type: FETCH_COMPARE_SENATOR_SUCCESS, compareSenators: data})
            } else {
                alert(data.error);
            }}).catch(error => console.log(error))
    }
}


export function removeCompareHouseReps(id){
    return function (dispatch){
        dispatch({type: START_REMOVE_COMPARE_REP})
        dispatch({type: REMOVE_COMPARE_REP_SUCCESS, removeRepresentative: id})
    }
}

export function removeCompareSenators(id){
    return function (dispatch){
        dispatch({type: START_REMOVE_COMPARE_SENATOR})
        dispatch({type: REMOVE_COMPARE_SENATOR_SUCCESS, removeSenator: id})
    }
}