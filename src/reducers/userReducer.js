import userService from '../services/users'

const reducer = (state = [], action) => {
  
  switch (action.type) {
  case 'NEW_USER':
    return [...state, action.data]
  case 'INIT_USERS':
    return action.data

  default: return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    
    console.log(users)
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export const createUser = (data) => {
  console.log(data)
  return async dispatch => {
    const newUser = await userService.createUser(data)
    dispatch({
      type: 'NEW_USER',
      data: newUser,
    })
  }
}

export default reducer