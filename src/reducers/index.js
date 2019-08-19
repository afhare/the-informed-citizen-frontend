import { combineReducers } from 'redux';
import senators from './senators';
import representatives from './representatives';
import loader from './loader';
import states from './states';
import showState from './showState';
import showHouseRep from './showHouseRep';
import showSenator from './showSenator';
import loggedInUser from './loggedInUser'
import compareRepresentatives from './compareRepresentatives';
import compareSenators from './compareSenators';

export default combineReducers({
    senators,
    representatives,
    loader,
    states,
    showState,
    showHouseRep,
    showSenator,
    loggedInUser,
    compareRepresentatives,
    compareSenators
})