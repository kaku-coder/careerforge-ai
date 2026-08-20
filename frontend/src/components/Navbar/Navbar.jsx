import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = ({ userInitials = 'PK' }) => {
  const navLinks = [
    { name: 'OVERVIEW', path: '/overview' },
    { name: 'INTERVIEW', path: '/interview' },
    { name: 'ROADMAP', path: '/roadmap' },
    { name: 'RESUME', path: '/resume' },
  ]

  return (
    <header
      style={{ paddingLeft: '40px', paddingRight: '40px' }}
      className="w-full h-14 bg-[#F8F6F1] border-b border-[#e2e0d6] flex items-center justify-between font-mono text-[12px] tracking-[0.08em] text-[#111110] select-none z-10 relative"
    >
      {/* Left side: Brand & Navigation */}
      <div className="flex items-center gap-10 md:gap-14">
        <Link to="/" className="flex items-center gap-0.5 font-bold tracking-[0.12em] text-[#111110] no-underline">
          <span className="text-[#66645e] font-normal">//</span>CAREER
        </Link>

        <nav className="flex items-center gap-6 md:gap-10">
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

      {/* Right side: AI Status, Notifications & Profile */}
      <div className="flex items-center gap-6 md:gap-8">
        <div className="hidden md:flex items-center gap-2 text-[#66645e] uppercase">
          <span className="w-2 h-2 bg-[#4ade80] inline-block"></span>
          <span>AI ENGINE: ACTIVE</span>
        </div>
        <button className="bg-transparent border-0 font-mono text-[12px] tracking-[0.08em] text-[#66645e] hover:text-[#111110] cursor-pointer uppercase">
          NOTIFICATIONS
        </button>
        <Link
          to="/profile"
          className="w-9 h-8 border border-[#111110] flex items-center justify-center font-mono font-bold text-[12px] text-[#111110] no-underline hover:bg-[#111110] hover:text-[#F8F6F1] transition-all duration-200"
        >
          {userInitials}
        </Link>
      </div>
    </header>
  )
}

export default Navbar
