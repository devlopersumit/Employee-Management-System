import React from 'react'
import { AdminSidebar } from '../../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
        <AdminSidebar />
        <Outlet />
    </div>
  )
}

export default Dashboard
