import { combineReducers } from 'redux';
import senators from './senators';
import representatives from './representatives';
import loader from './loader'

export default combineReducers({
    senators,
    representatives,
    loader
})