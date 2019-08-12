export default function loader(state = false, action) {
    switch (action.type) {
      case 'START_HOUSE_FETCH':
        return true
      case 'FETCH_HOUSE_SUCCESS':
        return false
      case 'START_SENATE_FETCH':
        return true
      case 'FETCH_SENATE_SUCCESS':
        return false
      default:
        return state
    }
  }