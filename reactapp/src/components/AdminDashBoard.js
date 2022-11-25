import React from 'react'
import {getCurrentUserDetails} from '../auth'
import Base from './Base';
const AdminDashBoard = () => {
  const name=getCurrentUserDetails().name;
  return (
    <Base>
    <h1> Welcome {name}</h1>
    </Base>
  )
}

export default AdminDashBoard