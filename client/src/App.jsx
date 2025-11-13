import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import ManagerDashboard from './pages/ManagerDashboard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />

      {/* Protected Routes */}
      <Route path='/admin' element={<ProtectedRoute allowedRole='ADMIN'><AdminDashboard /></ProtectedRoute>} />

      <Route path='/manager' element={<ProtectedRoute allowedRole='MANAGER'><ManagerDashboard /></ProtectedRoute>} />

      <Route path='/employee' element={<ProtectedRoute allowedRole='EMPLOYEE'><EmployeeDashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
