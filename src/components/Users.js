import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'


const Users = (props) => {

  useEffect(() => {
    props.initializeUsers()
  },[])
  const userStyle = {
    paddingTop: 10,
    paddingLeft: 2,

    marginBottom: 5
  }

  return (
    <div >
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        {props.users.map(user =>
          <tbody key={user.id}>
            <tr >
              <td  style={userStyle}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          </tbody>
        )}
        
      </table>
    </div>
  )}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}


export default connect (mapStateToProps, {
  initializeUsers,
}) (Users)