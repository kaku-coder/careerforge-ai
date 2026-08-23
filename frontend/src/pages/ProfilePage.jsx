import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiLogOut,
  FiArrowRight,
  FiCheckCircle,
  FiActivity,
  FiCpu,
  FiAward
} from 'react-icons/fi'
import bloubAvatarSvg from '../assets/bloub-nuage-surpris-encre-anime.svg'

const ProfilePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const displayName = user?.username || user?.name || user?.email?.split('@')[0] || 'PRAKASH DAS'
  const email = user?.email || 'prakash.das@example.com'

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="w-full min-h-screen bg-[#F8F6F1] text-[#111110] p-6 sm:p-10 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* ── Page Header Tag ── */}
        <div className="flex items-center justify-between border-b border-[#e2e0d6] pb-5">
          <div>
            <div className="font-mono text-xs text-[#66645e] uppercase tracking-widest mb-1">
              // USER ACCOUNT & SYSTEM PROFILE
            </div>
            <h1 className="font-sans font-black text-3xl sm:text-4xl text-[#111110] uppercase tracking-tight">
              PROFILE DASHBOARD
            </h1>
          </div>
          <div className="font-mono text-xs text-[#88857d] hidden sm:block">
            STATUS: ACTIVE
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            MAIN PROFILE AVATAR CARD WITH ANIMATED SVG (BLOUB AVATAR)
           ════════════════════════════════════════════════════════════ */}
        <div className="bg-[#efece4] border border-[#e2e0d6] rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          
          {/* Corner Marks */}
          <span className="absolute top-4 left-5 font-mono text-xs text-[#88857d]">+</span>
          <span className="absolute top-4 right-5 font-mono text-xs text-[#88857d]">+</span>

          {/* Animated SVG Avatar (No Black Background Box) */}
          <div className="relative group">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              <img
                src={bloubAvatarSvg}
                alt="Prakash Das Animated Avatar"
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl"
              />
            </div>
            <div className="absolute -bottom-2 right-2 bg-emerald-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#111110] shadow-xs">
              LIVE
            </div>
          </div>

          {/* User Information */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#66645e] uppercase tracking-wider mb-1">
                <FiShield size={14} className="text-emerald-600" />
                <span>VERIFIED MEMBER</span>
              </div>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#111110] uppercase">
                {displayName}
              </h2>
              <div className="font-mono text-sm text-[#66645e] flex items-center justify-center md:justify-start gap-2 mt-1">
                <FiMail size={15} />
                <span>{email}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
              <span className="px-3 py-1 bg-[#F8F6F1] border border-[#e2e0d6] font-mono text-xs font-semibold rounded-lg text-[#111110]">
                ROLE: DEVELOPER
              </span>
              <span className="px-3 py-1 bg-[#F8F6F1] border border-[#e2e0d6] font-mono text-xs font-semibold rounded-lg text-[#111110]">
                TIER: PRO ACCESS
              </span>
              <span className="px-3 py-1 bg-[#F8F6F1] border border-[#e2e0d6] font-mono text-xs font-semibold rounded-lg text-emerald-700 bg-emerald-50 border-emerald-200">
                SYSTEM OK
              </span>
            </div>

            {/* Logout Action */}
            <div className="pt-3 flex justify-center md:justify-start">
              <button
                type="button"
                onClick={handleLogout}
                className="btn-fill-animate font-mono font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <FiLogOut size={16} />
                <span>LOGOUT FROM SESSION</span>
              </button>
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════
            USER STATS & QUICK NAVIGATION
           ════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-[#efece4] border border-[#e2e0d6] rounded-2xl space-y-2">
            <div className="font-mono text-xs text-[#66645e] uppercase tracking-wider flex items-center justify-between">
              <span>MOCK INTERVIEWS</span>
              <FiActivity size={16} />
            </div>
            <div className="font-sans font-black text-3xl text-[#111110]">12</div>
            <div className="font-mono text-[11px] text-emerald-600 font-semibold">92% PASS SCORE</div>
          </div>

          <div className="p-6 bg-[#efece4] border border-[#e2e0d6] rounded-2xl space-y-2">
            <div className="font-mono text-xs text-[#66645e] uppercase tracking-wider flex items-center justify-between">
              <span>ROADMAP MILESTONES</span>
              <FiAward size={16} />
            </div>
            <div className="font-sans font-black text-3xl text-[#111110]">8/10</div>
            <div className="font-mono text-[11px] text-[#66645e]">FULL STACK PATH</div>
          </div>

          <div className="p-6 bg-[#efece4] border border-[#e2e0d6] rounded-2xl space-y-2">
            <div className="font-mono text-xs text-[#66645e] uppercase tracking-wider flex items-center justify-between">
              <span>RESUME SCORE</span>
              <FiCpu size={16} />
            </div>
            <div className="font-sans font-black text-3xl text-[#111110]">95/100</div>
            <div className="font-mono text-[11px] text-emerald-600 font-semibold">ATS VERIFIED</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage