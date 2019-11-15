import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    props.setNotification(`Congratulation! ${title.value} created`, 10)
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input id='title' {...title} />
        </div>
        <div>
          author:
          <input id='author' {...author} />
        </div>
        <div>
          url:
          <input id='url' {...url} />
        </div>
        <button id='createButton' type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(null, {
  createBlog, setNotification
})(NewBlog)