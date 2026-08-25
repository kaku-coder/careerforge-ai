import React, { useState, useCallback, useMemo, memo } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  FiHome,
  FiMessageSquare,
  FiCompass,
  FiFileText,
  FiUser,
  FiLogOut,
  FiArrowRight,
  FiMenu,
  FiX,
  FiBarChart2,
  FiCpu
} from 'react-icons/fi'

import bloubAvatarSvg from '../assets/bloub-nuage-surpris-encre-anime.svg'

const NAV_LINKS = [
  { name: 'Overview', path: '/', icon: FiHome },
  { name: 'Interviews', path: '/interview', icon: FiMessageSquare },
  { name: 'Roadmap', path: '/roadmap', icon: FiCompass },
  { name: 'Resume', path: '/resume', icon: FiFileText },
  { name: 'Analytics', path: '/profile', icon: FiBarChart2 },
  { name: 'AI Agents', path: '/profile', icon: FiCpu },
]

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = useCallback(async () => {
    await logout()
    setMobileOpen(false)
    navigate('/login')
  }, [logout, navigate])

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false)
  }, [])

  const displayName = useMemo(
    () => (user?.username || user?.name || user?.email?.split('@')[0] || 'USER').toUpperCase(),
    [user]
  )

  return (
    <header className="sticky top-0 z-50 w-full h-[76px] bg-[#F8F6F1]/95 backdrop-blur-md border-b border-[#e2e0d6] transition-all select-none">
      <div className="max-w-[1440px] h-full mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between gap-6">
        
        {/* Brand Header / Logo strictly matching image: // CAREER */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-1.5 font-sans font-black tracking-tight text-[#111110] text-xl sm:text-2xl no-underline group shrink-0"
        >
          <span className="text-[#111110] font-mono font-black text-xl sm:text-2xl">//</span>
          <span className="tracking-tight uppercase font-extrabold">CAREER</span>
        </Link>

        {/* Central Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 lg:gap-5 h-full">
          {NAV_LINKS.map((item) => {
            return (
              <NavLink
                key={item.name + item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg font-sans text-xs font-semibold tracking-wide transition-all duration-200 no-underline ${
                    isActive
                      ? 'text-[#111110] font-bold border-b-2 border-[#111110] rounded-none'
                      : 'text-[#66645e] hover:text-[#111110]'
                  }`
                }
              >
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Right Section: Login Link + Try Now Black Button */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="no-underline flex items-center gap-2.5 p-1.5 pl-3 bg-[#efece4] rounded-full border border-[#e2e0d6] hover:border-[#111110] transition-all group"
              >
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <img
                    src={bloubAvatarSvg}
                    alt="User Avatar"
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                </div>
                <div className="hidden sm:block min-w-0 pr-2">
                  <div className="font-mono font-bold text-xs text-[#111110] uppercase truncate">
                    {displayName}
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 text-[#66645e] hover:text-[#ef4444] rounded-full transition-colors cursor-pointer bg-transparent"
                title="Logout"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="font-sans text-xs font-bold text-[#111110] hover:text-black no-underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="no-underline px-5 py-2.5 bg-[#111110] text-[#F8F6F1] font-sans font-bold text-xs rounded-full hover:bg-[#262522] shadow-sm transition-all"
              >
                Try Now
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Trigger Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-[#111110] bg-[#efece4] border border-[#e2e0d6] rounded-xl cursor-pointer flex items-center justify-center hover:bg-[#e4e1d7] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#F8F6F1] border-b border-[#e2e0d6] px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3 py-2">
            {NAV_LINKS.map((item) => {
              return (
                <NavLink
                  key={item.name + item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl font-sans text-sm font-semibold tracking-wide transition-all duration-200 no-underline ${
                      isActive
                        ? 'bg-[#111110] text-[#F8F6F1] font-bold'
                        : 'text-[#55534e] hover:bg-[#eae7dc] hover:text-[#111110]'
                    }`
                  }
                >
                  <span>{item.name}</span>
                </NavLink>
              )
            })}
          </nav>

          {isAuthenticated ? (
            <div className="pt-4 border-t border-[#e2e0d6] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center">
                  <img src={bloubAvatarSvg} alt="Avatar" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-mono font-bold text-xs text-[#111110] uppercase">{displayName}</div>
                  <div className="font-mono text-[10px] text-[#66645e]">{user?.email}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-2 bg-[#efece4] text-[#ef4444] font-mono text-xs font-bold rounded-xl border border-[#e2e0d6] flex items-center gap-1.5 cursor-pointer"
              >
                <FiLogOut size={14} />
                <span>LOGOUT</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-[#e2e0d6] flex flex-col gap-2">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="w-full py-3 bg-[#efece4] text-[#111110] font-sans font-bold text-xs text-center rounded-xl no-underline"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="w-full py-3 bg-[#111110] text-[#F8F6F1] font-sans font-bold text-xs text-center rounded-xl no-underline"
              >
                TRY NOW
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default memo(Navbar)
