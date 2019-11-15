import React from 'react'
import { connect } from 'react-redux'
import { liked } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = (props) => {
  

  const byLikes = (b1, b2) => b2.likes - b1.likes


  const removeBlog = async (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      const updatedBlog = await blogService.remove(blog)
      props.setNotification(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`)
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {props.blogs.sort(byLikes).map(blog =>
            <tr key={blog.id} >
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
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
  liked, setNotification
})(BlogList)
