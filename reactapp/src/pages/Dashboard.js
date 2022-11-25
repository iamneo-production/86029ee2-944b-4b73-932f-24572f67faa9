import React from 'react'
import { getCurrentUserDetails } from '../auth'
import AdminDashBoard from '../components/AdminDashBoard'
import UserDashBoard from '../components/UserDashBoard'

const Dashboard = () => {
    const role=getCurrentUserDetails().role
  return (
    role === "ROLE_ADMIN"? <AdminDashBoard/> : <UserDashBoard/>
  )
}

export default Dashboard