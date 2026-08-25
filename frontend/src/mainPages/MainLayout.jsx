import React, { useMemo, memo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

const MainLayout = () => {
  const location = useLocation()

  const isAuthPage = useMemo(
    () => location.pathname === '/login' || location.pathname === '/register',
    [location.pathname]
  )

  if (isAuthPage) {
    return (
      <div className="min-h-screen w-full bg-[#F8F6F1]">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] text-[#111110] relative">
      {/* Top Sticky Header Navbar */}
      <Navbar />

      {/* Main Page Content View */}
      <main className="flex-1 min-w-0 bg-grid-lines">
        <Outlet />
      </main>
    </div>
  )
}

export default memo(MainLayout)
