import {START_HOUSE_FETCH, START_SENATE_FETCH, FETCH_HOUSE_SUCCESS, FETCH_SENATE_SUCCESS, START_STATE_FETCH, FETCH_STATE_SUCCESS, START_SHOW_STATE_FETCH, FETCH_SHOW_STATE_SUCCESS, START_SHOW_HOUSE_REP_FETCH, FETCH_SHOW_HOUSE_REP_SUCCESS, START_SHOW_SENATOR_FETCH, FETCH_SHOW_SENATOR_SUCCESS, START_LOGIN_USER_FETCH, FETCH_LOGIN_USER_SUCCESS, LOGOUT, LOGOUT_SUCCESS, FETCH_VERIFY_USER_SUCCESS, START_VERIFY_USER_FETCH, START_UPDATE_USER_FETCH, FETCH_UPDATE_USER_SUCCESS, START_REGISTER_USER_FETCH, FETCH_REGISTER_USER_SUCCESS, START_DELETE_USER_FETCH, FETCH_DELETE_USER_SUCCESS} from '../actions/types'

export default function loader(state = false, action) {
    switch (action.type) {
      case START_HOUSE_FETCH:
        return true
      case FETCH_HOUSE_SUCCESS:
        return false
      case START_SENATE_FETCH:
        return true
      case FETCH_SENATE_SUCCESS:
        return false
      case START_STATE_FETCH:
        return true
      case FETCH_STATE_SUCCESS:
        return false
      case START_SHOW_STATE_FETCH:
        return true
      case FETCH_SHOW_STATE_SUCCESS:
        return false
      case START_SHOW_HOUSE_REP_FETCH:
        return true
      case FETCH_SHOW_HOUSE_REP_SUCCESS:
        return false
      case START_SHOW_SENATOR_FETCH:
        return true
      case FETCH_SHOW_SENATOR_SUCCESS:
        return false
      case START_LOGIN_USER_FETCH:
        return true
      case FETCH_LOGIN_USER_SUCCESS:
        return false
      case LOGOUT:
        return true
      case LOGOUT_SUCCESS:
        return false
      case START_VERIFY_USER_FETCH:
        return true
      case FETCH_VERIFY_USER_SUCCESS:
        return false
      case START_UPDATE_USER_FETCH:
        return true
      case FETCH_UPDATE_USER_SUCCESS:
        return false
      case START_REGISTER_USER_FETCH:
        return true
      case FETCH_REGISTER_USER_SUCCESS:
        return false
      case START_DELETE_USER_FETCH:
        return true
      case FETCH_DELETE_USER_SUCCESS:
        return false
      default:
        return state
    }
  }