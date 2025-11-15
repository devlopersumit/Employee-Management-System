import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import EmployeeDashboard from './pages/EmployeeDashboard'
import ManagerDashboard from './pages/ManagerDashboard'
import DepartmentList from './pages/admin/departments/DepartmentList'
import AddDepartment from './pages/admin/departments/AddDepartment'
import UserList from './pages/admin/users/UserList'
import AddUser from './pages/admin/users/AddUser'
import Dashboard from './pages/admin/Dashboard'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />

      {/* Protected Routes */}
      <Route path='/admin' element={<ProtectedRoute allowedRole='ADMIN'><Dashboard /></ProtectedRoute>}>
        <Route path="departments" element={<DepartmentList />} />
        <Route path="departments/add" element={<AddDepartment />} />

        <Route path="users" element={<UserList />} />
        <Route path="users/add" element={<AddUser />} />
      </Route>

      <Route path='/manager' element={<ProtectedRoute allowedRole='MANAGER'><ManagerDashboard /></ProtectedRoute>} />

      <Route path='/employee' element={<ProtectedRoute allowedRole='EMPLOYEE'><EmployeeDashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
