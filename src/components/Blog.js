import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import PropTypes from 'prop-types'
import { liked  } from '../reducers/blogReducer'
import { initializeComments, createComment } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [comment, commentReset] = useField('text')

  useEffect(() => {
    if ( props.blog === undefined) {
      return undefined
    }
    const response =  props.initializeComments(props.blog)
   
  },[props.blog])

  if ( props.blog === undefined) {
    return null
  }

  const likeBlog = async (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    props.liked(blog)
    props.setNotification(`blog ${likedBlog.title} by ${likedBlog.author} liked!`, 10)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newComment = {
      text: comment.value,
      blog: props.blog.id
    }
    await props.createComment(newComment)
    commentReset()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <h2>{props.blog.title} by {props.blog.author}</h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>{props.blog.likes} likes
        <button onClick={() => likeBlog(props.blog)}>like</button>
        <div>added by {props.blog.user.name}</div>
      </div>
      <h3>Comments</h3>
      <ul>
        {props.comments.map(comment =>
          <li key={comment._id}>  {comment.text}</li>
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>Add new comment
          <input {...comment}/>
        </div>
        <button type="submit">Comment</button>
      </form>
    </div>
  )}
Blog.propTypes = { blog: PropTypes.object.isRequired, }
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    comments: state.comments
  }
}
export default connect(mapStateToProps, {
  liked, setNotification, initializeComments, createComment
})(Blog)
