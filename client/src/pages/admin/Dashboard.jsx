import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 shadow-sm sticky top-0 z-20 mt-14 md:mt-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">Admin Dashboard</h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1">Manage employees, departments & more</p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition" aria-label="Notifications">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-sm md:text-base">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard