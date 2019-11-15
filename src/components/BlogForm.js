import React from 'react'

const BlogForm = ({
  onSubmit,
  author,
  title,
  url
}) => {
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
            Author
          <input
            {...author}
            className="authorInput"
          />
        </div>
        <div>
            Title
          <input
            {...title}
            className="titleInput"
          />
        </div>
        <div>
            Url
          <input
           {...url}
            className="urlInput"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}




export default BlogForm