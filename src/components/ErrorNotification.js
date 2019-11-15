import React from 'react'

const ErrorNotification = ({ message }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    border: 'solid',
    padding: '10px',
    margin: '10px'
  }
  if (message === '') {
    return null
  }
  if (message === null) {
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

export default ErrorNotification