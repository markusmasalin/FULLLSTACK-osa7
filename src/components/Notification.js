import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  if (props === null) {
    return null
  }

  if (props.notification.length === 0) {
    return null
  }


  return (
    <div >
      {(props.notification &&
      <Alert variant="success">
        {props.notification}
      </Alert>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(
  mapStateToProps
)(Notification)