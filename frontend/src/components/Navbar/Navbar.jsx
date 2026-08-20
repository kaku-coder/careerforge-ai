import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiLogOut, FiArrowRight, FiMenu, FiX, FiUser } from 'react-icons/fi'

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
    setSidebarOpen(false)
    navigate('/login')
  }

  const displayName = (user?.username || user?.name || user?.email?.split('@')[0] || 'USER').toUpperCase()

  return (
    <header
      className="w-full h-[72px] bg-[#F8F6F1] border-b border-[#e2e0d6] flex items-center justify-between font-mono text-[12px] tracking-[0.08em] text-[#111110] z-30 relative px-5 sm:px-10"
    >
      {/* Left side: Brand & Desktop Navigation */}
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
      <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
        <div className="hidden lg:flex items-center gap-2 text-[#66645e] uppercase">
          <span className="text-[#111110] text-[10px] leading-none">■</span>
          <span>AI ENGINE: ACTIVE</span>
        </div>

        <button className="hidden sm:flex bg-transparent border-0 font-mono text-[12px] tracking-[0.08em] text-[#66645e] hover:text-[#111110] cursor-pointer uppercase items-center gap-1 transition-colors duration-200">
          <span>NOTIFICATIONS</span>
          <span className="text-[14px] leading-none text-[#111110]">•</span>
        </button>

        {isAuthenticated ? (
          /* LOGGED IN DESKTOP: Displays Profile Name, Initials Box & Logout Dropdown */
          <div className="hidden sm:flex items-center gap-3 relative">
            <span className="font-mono text-[12px] text-[#111110] font-bold uppercase tracking-wider">
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
          /* UNAUTHENTICATED DESKTOP: Displays LOGIN Button */
          <Link
            to="/login"
            className="hidden sm:flex btn-fill-animate h-11 px-8 font-mono font-bold text-[11px] tracking-[0.1em] uppercase items-center gap-2.5 no-underline"
          >
            <span>LOGIN</span>
            <FiArrowRight size={14} />
          </Link>
        )}

        {/* Mobile Hamburger / Toggle Button */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-[#111110] bg-transparent border border-[#111110] p-2 flex items-center justify-center cursor-pointer hover:bg-[#111110] hover:text-[#F8F6F1] transition-colors duration-200"
          aria-label="Toggle navigation drawer"
        >
          {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* ── Mobile Side Navigation Drawer ── */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-[#F8F6F1] z-50 flex flex-col border-t border-[#e2e0d6] p-6 text-center animate-in fade-in slide-in-from-right duration-200">
          
          {/* User Status Card on Mobile */}
          {isAuthenticated && (
            <div className="border border-[#111110] p-4 mb-6 bg-grid-lines flex flex-col items-center justify-center">
              <div className="w-12 h-12 border border-[#111110] bg-[#111110] text-[#F8F6F1] font-mono font-bold text-sm flex items-center justify-center mb-2">
                {initials || 'PK'}
              </div>
              <div className="font-bold text-[#111110] text-sm uppercase tracking-wider">{displayName}</div>
              <div className="text-[11px] text-[#66645e] font-mono mt-0.5">{user?.email}</div>
            </div>
          )}

          {/* Centered Navigation Links */}
          <nav className="flex flex-col gap-2 my-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `w-full py-4 text-center uppercase font-mono font-bold text-sm tracking-[0.15em] no-underline border-b border-[#e2e0d6] transition-all duration-200 ${
                    isActive
                      ? 'text-[#111110] bg-[#111110] text-[#F8F6F1]'
                      : 'text-[#111110] hover:bg-[#ebe9e2]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Footer Action Button */}
          <div className="mt-auto pt-6 border-t border-[#e2e0d6]">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full h-12 bg-[#ff4d4d] text-white font-mono font-bold text-xs tracking-[0.12em] uppercase flex items-center justify-center gap-2 cursor-pointer border-0"
              >
                <span>LOGOUT</span>
                <FiLogOut size={16} />
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setSidebarOpen(false)}
                className="btn-primary-dark w-full h-12 font-mono font-bold text-xs tracking-[0.12em] uppercase flex items-center justify-center gap-2 no-underline"
              >
                <span>LOGIN</span>
                <FiArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
