import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function NavItem({ to, icon, label, badge, collapsed }) {
  const location = useLocation();
  const active = location.pathname.startsWith(to);
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium
          ${active
            ? "bg-indigo-600 text-white shadow-md"
            : "text-slate-700 hover:bg-slate-100"
          }
          ${collapsed ? "justify-center" : "justify-between"}
        `}
        title={collapsed ? label : ""}
      >
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          {icon}
          {!collapsed && label}
        </div>
        {badge && !collapsed && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{badge}</span>}
      </Link>
    </li>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-3 shadow-lg text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">E</div>
          <span className="font-bold text-lg">EMS</span>
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(prev => !prev)}
          className="p-2 rounded-md hover:bg-indigo-500 transition"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-xl z-40 transform transition-all duration-300 ease-in-out
          flex flex-col overflow-hidden
          md:translate-x-0 md:sticky md:top-0
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "md:w-20" : "md:w-64 w-64"}
        `}
        aria-label="Admin sidebar"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-6 shrink-0 relative">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 bg-white text-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg shrink-0">E</div>
            {!collapsed && (
              <div>
                <h3 className="text-lg font-bold">EMS Admin</h3>
                <p className="text-xs text-indigo-200">Employee Management</p>
              </div>
            )}
          </div>
          
          {/* Collapse button - Desktop only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex absolute -right-3 top-8 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full items-center justify-center shadow-lg transition-all border-2 border-white"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* User Profile */}
        <div className={`px-6 py-4 border-b border-slate-200 shrink-0 ${collapsed ? "hidden" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold">
              {user.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{user.name || 'Admin'}</p>
              <p className="text-xs text-slate-500 truncate">{user.email || 'admin@ems.com'}</p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-6">
            <div>
              {!collapsed && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Main</p>}
              <ul className="space-y-1">
                <NavItem
                  to="/admin/departments"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                  label="Departments"
                  collapsed={collapsed}
                />
                <NavItem
                  to="/admin/users"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 16a5 5 0 00-10 0v2h10v-2z" /></svg>}
                  label="Users"
                  collapsed={collapsed}
                />
              </ul>
            </div>

            <div>
              {!collapsed && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Management</p>}
              <ul className="space-y-1">
                <NavItem
                  to="/admin/departments/add"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}
                  label="Add Department"
                  collapsed={collapsed}
                />
                <NavItem
                  to="/admin/users/add"
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM9 19c-4.35 0-8 1.343-8 3v2h16v-2c0-1.657-3.65-3-8-3z" /></svg>}
                  label="Add User"
                  collapsed={collapsed}
                />
              </ul>
            </div>
          </div>
        </nav>

        {/* Logout Button - Fixed at bottom */}
        <div className="px-4 py-4 border-t border-slate-200 shrink-0 bg-white">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm
              ${collapsed ? "justify-center" : "justify-center"}
            `}
            title={collapsed ? "Logout" : ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}