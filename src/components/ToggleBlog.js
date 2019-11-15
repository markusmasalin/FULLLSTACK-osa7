import React, { useState, useImperativeHandle } from 'react'

const ToggleBlog = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}  >
        <p onClick={toggleVisibility} className="toggleP">{props.title}</p>
        {props.author}
      </div>
      <div style={showWhenVisible}className="togglableContent">
        {props.title}{' '}
        {props.author}
        {props.children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
})

export default ToggleBlog