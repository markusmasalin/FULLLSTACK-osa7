import loginService from '../services/login'
import blogService from '../services/blogs'


const loginReducer = (state = null, action) => {

  switch (action.type) {
  case 'LOGIN':
    console.log('login' + action.user)
    return action.user
  case 'LOGOUT':
    return null
  case 'SETUSER':
    return action.user
  default:
    return state
  }
}

export const setLogin = (user) => {
  console.log(user + 'setLogin')
  return async dispatch => {
    const tryLogin = await loginService.login(user)
    console.log(tryLogin + 'trylogin')
    blogService.setToken(tryLogin.token)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(tryLogin)
    )
    console.log(window.localStorage)
    dispatch({
      type: 'LOGIN',
      user: {
        username: tryLogin.username,
        name: tryLogin.name,
        token: tryLogin.token,
      }
    })
  }

}

export const setUser = (user) => {
  console.log(user + 'setUser')
  return async dispatch => {
    dispatch({
      type: 'SETUSER',
      user: user
    })
  }
}

export const setLogout = () => {
  console.log('logging out')
  blogService.destroyToken()
  window.localStorage.removeItem(
    'loggedBlogappUser'
  )
  console.log(window.localStorage)
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer