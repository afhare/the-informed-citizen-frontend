
export function fetchHouseReps(){
    return function (dispatch){
        dispatch({type: 'START_HOUSE_FETCH'})
        fetch('http://localhost:3001/representatives').then(response => response.json()).then(data => {
            console.log(data)
            dispatch({type: 'FETCH_HOUSE_SUCCESS', representatives: data})
        })
    }
}

export function fetchSenators(){
    return function (dispatch){
        dispatch({type: 'START_SENATE_FETCH'})
        fetch('http://localhost:3001/senators').then(response => response.json()).then(data => {
            console.log(data)
            dispatch({type: 'FETCH_SENATE_SUCCESS', senators: data})
        })
    }
}

export function thunkFetchHouseReps(){
    return function(dispatch){
        dispatch({type: 'LOADING'})
    }
}