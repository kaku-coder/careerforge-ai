import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiLogOut, FiArrowRight, FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const { user, initials, isAuthenticated, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { name: 'OVERVIEW', path: '/overview' },
    { name: 'INTERVIEW', path: '/interview' },
    { name: 'ROADMAP', path: '/roadmap' },
    { name: 'RESUME', path: '/resume' },
  ]

  const handleLogout = async () => {
    await logout()
    setShowDropdown(false)
    navigate('/login')
  }

  const displayName = (user?.username || user?.name || user?.email?.split('@')[0] || 'USER').toUpperCase()

  return (
    <header
      style={{ paddingLeft: '40px', paddingRight: '40px' }}
      className="w-full h-[72px] bg-[#F8F6F1] border-b border-[#e2e0d6] flex items-center justify-between font-mono text-[12px] tracking-[0.08em] text-[#111110] z-30 relative"
    >
      {/* Left side: Brand & Navigation */}
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center gap-0.5 font-bold tracking-[0.12em] text-[#111110] no-underline mr-6 lg:mr-10"
        >
          <span className="text-[#66645e] font-normal">//</span>CAREER
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right side: AI Status, Notifications & Dynamic User Profile / Login */}
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        <div className="hidden lg:flex items-center gap-2 text-[#66645e] uppercase">
          <span className="text-[#111110] text-[10px] leading-none">■</span>
          <span>AI ENGINE: ACTIVE</span>
        </div>

        <button className="hidden sm:flex bg-transparent border-0 font-mono text-[12px] tracking-[0.08em] text-[#66645e] hover:text-[#111110] cursor-pointer uppercase items-center gap-1 transition-colors duration-200">
          <span>NOTIFICATIONS</span>
          <span className="text-[14px] leading-none text-[#111110]">•</span>
        </button>

        {isAuthenticated ? (
          /* LOGGED IN: Displays Profile Name, Initials Box & Logout Dropdown */
          <div className="flex items-center gap-3 relative">
            <span className="hidden sm:inline-block font-mono text-[12px] text-[#111110] font-bold uppercase tracking-wider">
              {displayName}
            </span>

            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-[#111110] bg-[#F8F6F1] flex items-center justify-center font-mono font-bold text-[11px] sm:text-[12px] tracking-[0.06em] text-[#111110] cursor-pointer hover:bg-[#111110] hover:text-[#F8F6F1] transition-all duration-200"
            >
              {initials || 'PK'}
            </button>

            {/* Profile Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 top-14 w-56 bg-[#F8F6F1] border border-[#111110] shadow-lg py-3 px-4 z-50 font-mono text-[12px]">
                <div className="border-b border-[#e2e0d6] pb-3 mb-3">
                  <div className="font-bold text-[#111110] uppercase truncate">
                    {displayName}
                  </div>
                  <div className="text-[11px] text-[#66645e] truncate mt-0.5">
                    {user?.email}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between text-[#111110] hover:text-[#ff4d4d] cursor-pointer bg-transparent border-0 font-mono text-[12px] uppercase py-1 text-left"
                >
                  <span>LOGOUT</span>
                  <FiLogOut size={14} />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* UNAUTHENTICATED: Displays LOGIN Button */
          <Link
            to="/login"
            className="btn-fill-animate h-11 px-8 font-mono font-bold text-[11px] tracking-[0.1em] uppercase flex items-center gap-2.5 no-underline"
          >
            <span>LOGIN</span>
            <FiArrowRight size={14} />
          </Link>
        )}

        {/* Mobile Navigation Toggle */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-[#111110] bg-transparent border-0 cursor-pointer p-1"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-[#F8F6F1] z-40 flex flex-col border-t border-[#e2e0d6]">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-[#e2e0d6] flex justify-between items-center">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="font-bold tracking-[0.12em] text-[#111110] no-underline"
              >
                <span className="text-[#66645e] font-normal">//</span>CAREER
              </Link>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="text-[#111110] bg-transparent border-0 cursor-pointer p-1"
                aria-label="Close menu"
              >
                <FiX size={20} />
              </button>
            </div>

            <nav className="flex flex-col pt-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `px-6 h-[52px] flex items-center uppercase text-[12px] tracking-[0.1em] no-underline transition-colors duration-200 ${isActive ? 'text-[#111110] font-bold bg-[#ebe9e2]' : 'text-[#66645e] hover:text-[#111110] hover:bg-[#f0eee8]'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto border-t border-[#e2e0d6] p-6">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => { setSidebarOpen(false); handleLogout() }}
                  className="w-full flex items-center justify-between text-[#111110] hover:text-[#ff4d4d] cursor-pointer bg-transparent border-0 font-mono text-[12px] uppercase text-left"
                >
                  <span>LOGOUT</span>
                  <FiLogOut size={14} />
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setSidebarOpen(false)}
                  className="btn-fill-animate w-full h-11 px-8 font-mono font-bold text-[11px] tracking-[0.1em] uppercase flex items-center justify-center gap-2.5 no-underline"
                >
                  <span>LOGIN</span>
                  <FiArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
