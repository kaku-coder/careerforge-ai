import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1]">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
