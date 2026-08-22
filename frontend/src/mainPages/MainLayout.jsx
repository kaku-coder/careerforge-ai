import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

const MainLayout = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  if (isAuthPage) {
    return (
      <div className="min-h-screen w-full bg-[#F8F6F1]">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-[#F8F6F1] text-[#111110] relative">
      {/* Left side: Navigation Sidebar */}
      <Navbar />

      {/* Right side: Page Content View */}
      <main className="flex-1 min-w-0 min-h-screen bg-grid-lines">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
