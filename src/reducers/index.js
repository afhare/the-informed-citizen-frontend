import { combineReducers } from 'redux';
import senators from './senators';
import representatives from './representatives';
import loader from './loader';
import states from './states';
import showState from './showState';
import showHouseRep from './showHouseRep';
import showSenator from './showSenator';
import loggedInUser from './loggedInUser'


export default combineReducers({
    senators,
    representatives,
    loader,
    states,
    showState,
    showHouseRep,
    showSenator,
    loggedInUser
})