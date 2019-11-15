import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import  { useField } from './hooks'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { setLogin, setLogout, setUser } from './reducers/loginReducer'
import { initializeBlogs, createBlog, liked } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import blogService from './services/blogs'
import { Navbar, Nav } from 'react-bootstrap'




const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    props.initializeUsers()
  },[])

  useEffect(() => {
    props.initializeBlogs()
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON + 'loggedUserJSON')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username.value)
    console.log(password.value)
    const credentials = {
      username: username.value,
      password: password.value
    }
    await props.setLogin(credentials)
    props.setNotification(`Welcome ${username.value}`, 10)
  }

  const handleLogout = () => {
    console.log('logging out ')
    props.setLogout()
    props.setNotification('logout succeeded', 10)
  }

  const createBlog = async (blog) => {
    createBlog(blog)
    newBlogRef.current.toggleVisibility()
    props.setNotification(`a new blog ${blog.title} by ${blog.author} added`, 10)
  }

  if (props.user === null) {
    return (
      <div class="container">
        <h2>log in to application</h2>

        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const padding = { padding: 5 }

  const newBlogRef = React.createRef()

  const userById = (id) => {
    return (
      props.users.find(user => (user.id === id))
    )
  }
  const blogById = (id) => {
    console.log(id)
    return (
      props.blogs.find(blog => (blog.id === id))
    )
  }

  return (
    <div class="container">
      <h2>Blog app</h2>
      <Notification />
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/blogs">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span"> 
                  <Link style={padding} to="/create">create</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span"> 
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
               
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/blogs" render={() =>
            <BlogList/>}/>
          <Route exact path="/blogs/:id" render={({ match }) =>
            <Blog blog={blogById(match.params.id)}/>}/>
          <Route path="/create" render={() =>
            <NewBlog createBlog={createBlog} />} />
          <Route exact path="/users" render={() =>
            <Users users={props.users} />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />

        </div>
      </Router>
      <p>{props.user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

     
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    notification: state.notification,
    users: state.users
  }
}


export default connect(mapStateToProps, {
  initializeBlogs,
  initializeUsers,
  setNotification,
  clearNotification,
  createBlog,
  setLogin,
  setLogout,
  liked,
  setUser
}) (App)


