const API_LINK = 'http://localhost:3001/'

export default {
      getHouse: ()=> {
        return fetch(`${API_LINK}representatives`).then(response => response.json())
      },
      getSenators: () => {
        return fetch(`${API_LINK}senators`).then(response => response.json())
      },
      getStates: () => {
        return fetch(`${API_LINK}states`).then(response => response.json())
      },
      getUsers: () => {
        return fetch(`${API_LINK}users`).then(response => response.json())
      }
}