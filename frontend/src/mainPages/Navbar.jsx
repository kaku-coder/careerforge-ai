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
  FiX
} from 'react-icons/fi'

const NAV_LINKS = [
  { name: 'Home', path: '/', icon: FiHome },
  { name: 'Interviews', path: '/interview', icon: FiMessageSquare },
  { name: 'Roadmap', path: '/roadmap', icon: FiCompass },
  { name: 'Resume', path: '/resume', icon: FiFileText },
  { name: 'Profile', path: '/profile', icon: FiUser },
]

const Navbar = () => {
  const { user, initials, isAuthenticated, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = useCallback(async () => {
    await logout()
    setMobileOpen(false)
    navigate('/login')
  }, [logout, navigate])

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false)
  }, [])

  const openMobileMenu = useCallback(() => {
    setMobileOpen(true)
  }, [])

  const displayName = useMemo(
    () => (user?.username || user?.name || user?.email?.split('@')[0] || 'USER').toUpperCase(),
    [user]
  )

  return (
    <>
      {/* Mobile Menu Trigger Button (Top Left on Mobile, shown only when menu is closed) */}
      {!mobileOpen && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            type="button"
            onClick={openMobileMenu}
            className="p-3 bg-[#111110] text-[#F8F6F1] border border-[#111110] rounded-xl shadow-lg cursor-pointer flex items-center justify-center transition-all hover:bg-[#2b2b27]"
            aria-label="Open navigation drawer"
          >
            <FiMenu size={20} />
          </button>
        </div>
      )}

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Left Side Vertical Navigation Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-60 bg-[#F8F6F1] border-r border-[#e2e0d6] flex flex-col shrink-0 transition-transform duration-300 ease-out select-none shadow-2xl md:shadow-none ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-[72px] px-6 flex items-center justify-between border-b border-[#e2e0d6] shrink-0">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-1 font-sans font-black tracking-tight text-[#111110] text-xl no-underline group"
          >
            <span className="text-[#88857d] font-mono font-normal group-hover:text-[#111110] transition-colors">//</span>
            <span>CAREER</span>
          </Link>

          {/* Close button on mobile left drawer */}
          <button
            type="button"
            onClick={closeMobileMenu}
            className="md:hidden p-2 text-[#66645e] hover:text-[#111110] hover:bg-[#ebe8df] rounded-lg transition-colors cursor-pointer border border-[#e2e0d6]"
            aria-label="Close menu"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Vertical Navigation Links with spacious margins, padding, and staggered entrance animation */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto no-scrollbar">
          <div className="px-2 pb-3 font-mono text-[10px] font-semibold text-[#88857d] uppercase tracking-widest">
            // NAVIGATION
          </div>

          {NAV_LINKS.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.path}
                className="mb-1"
                style={{
                  animation: mobileOpen ? `slideInLeft 0.35s ease-out ${index * 0.05}s both` : 'none'
                }}
              >
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3.5 rounded-xl font-sans text-[14.5px] font-medium transition-all duration-200 no-underline group ${
                      isActive
                        ? 'bg-[#111110] text-[#F8F6F1] font-semibold shadow-md translate-x-0.5'
                        : 'text-[#55534e] hover:bg-[#eae7dc] hover:text-[#111110]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[#262522] text-[#F8F6F1]'
                            : 'bg-transparent text-[#66645e] group-hover:text-[#111110] group-hover:bg-[#dfdcd0]'
                        }`}
                      >
                        <Icon size={19} />
                      </div>
                      <span className="tracking-wide">{item.name}</span>
                    </>
                  )}
                </NavLink>
              </div>
            )
          })}
        </nav>

        {/* Bottom Section: LOGIN Button OR User Profile Card */}
        <div className="p-4 border-t border-[#e2e0d6] shrink-0 bg-[#F8F6F1]">
          {isAuthenticated ? (
            /* Logged in User Card */
            <div className="flex items-center justify-between gap-3 p-3 bg-[#efece4] rounded-xl border border-[#e2e0d6]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 border border-[#111110] bg-[#111110] text-[#F8F6F1] font-mono font-bold text-xs flex items-center justify-center shrink-0 rounded-lg">
                  {initials || 'PK'}
                </div>
                <div className="min-w-0">
                  <div className="font-mono font-bold text-xs text-[#111110] uppercase truncate">
                    {displayName}
                  </div>
                  <div className="font-mono text-[10px] text-[#66645e] truncate">
                    {user?.email}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="p-1.5 text-[#66645e] hover:text-[#ef4444] transition-colors cursor-pointer bg-transparent border-0 shrink-0"
                title="Logout"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            /* LOGIN Button */
            <Link
              to="/login"
              onClick={closeMobileMenu}
              className="w-full h-12 btn-primary-dark font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 no-underline rounded-xl shadow-md"
            >
              <span>LOGIN</span>
              <FiArrowRight size={16} />
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}

export default memo(Navbar)
