import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
        <AdminSidebar />
        <Outlet />
      <h1>Welcome to Admin Dashboard</h1>
    </div>
  )
}

export default Dashboard
