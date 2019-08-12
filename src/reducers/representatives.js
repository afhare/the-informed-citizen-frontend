export default function representatives(state=[], action){
    switch (action.type){
        case 'FETCH_HOUSE_SUCCESS':
            return state.concat([...action.representatives])
        case 'MATCH':
            console.log('matched rep')
            // based on the state, find the matching representatives
            return state
        case 'COMPARE':
            console.log('compare these reps')
            // identify two or more reps to compare
            return state
        default:
            return state
    }
}