import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const Navbar = () => {
  const navLinks = [
    { name: 'OVERVIEW', path: '/overview' },
    { name: 'INTERVIEW', path: '/interview' },
    { name: 'ROADMAP', path: '/roadmap' },
    { name: 'RESUME', path: '/resume' },
  ]

  return (
    <header
      style={{ paddingLeft: '40px', paddingRight: '40px' }}
      className="w-full h-[72px] bg-[#F8F6F1] border-b border-[#e2e0d6] flex items-center justify-between font-mono text-[12px] tracking-[0.08em] text-[#111110] z-10 relative"
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

      {/* Right side: AI Status, Notifications & LOGIN Button */}
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
        <div className="hidden lg:flex items-center gap-2 text-[#66645e] uppercase">
          <span className="text-[#111110] text-[10px] leading-none">■</span>
          <span>AI ENGINE: ACTIVE</span>
        </div>

        <button className="bg-transparent border-0 font-mono text-[12px] tracking-[0.08em] text-[#66645e] hover:text-[#111110] cursor-pointer uppercase flex items-center gap-1 transition-colors duration-200">
          <span className="hidden sm:inline">NOTIFICATIONS</span>
          <span className="text-[14px] leading-none text-[#111110]">•</span>
        </button>

        {/* LOGIN Button where PK was previously placed */}
        <Link
          to="/login"
          className="btn-fill-animate h-10 p-5 font-mono font-bold text-[11px] tracking-[0.1em] uppercase flex items-center gap-2.5 no-underline"
        >
          <span>LOGIN</span>
          <FiArrowRight size={14} />
        </Link>
      </div>
    </header>
  )
}

export default Navbar
