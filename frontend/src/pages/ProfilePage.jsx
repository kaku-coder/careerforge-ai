import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useStats } from '../context/StatsContext'
import StatCard from '../components/StatCard'
import AgentMediaCard from '../components/AgentMediaCard'

import {
  FiShield,
  FiMail,
  FiLogOut,
  FiPlus,
  FiFileText,
  FiMic,
  FiBarChart2,
  FiCompass,
  FiLayers
} from 'react-icons/fi'

// Asset imports
import bloubAvatarSvg from '../assets/bloub-nuage-surpris-encre-anime.svg'
import resumeImg from '../assets/robot_scanning_resume.jpeg'
import resumeVid from '../assets/robot_scanning_resume.mp4'
import interviewImg from '../assets/character_interview_ai.jpeg'
import interviewVid from '../assets/candidate_robot_interview.mp4'
import roadmapImg from '../assets/developer_coding_roadmap.jpeg'
import roadmapVid from '../assets/developer_coding_roadmap.mp4'

const ProfilePage = () => {
  const { user, logout } = useAuth()
  const { userStats } = useStats()
  const navigate = useNavigate()

  const rawName = user?.username || user?.name || user?.email?.split('@')[0] || 'DEVELOPER'
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1)
  const email = user?.email || 'user@example.com'

  // Stats formatting
  const totalInterviews = userStats?.totalInterviews || 0
  const questionsAnswered = userStats?.questionsAnswered || 0
  const completedInterviews = userStats?.completedInterviews || 0
  const averageScore = userStats?.averageScore || 0

  const totalInterviewsFormatted = String(totalInterviews).padStart(2, '0')
  const questionsAnsweredFormatted = String(questionsAnswered).padStart(2, '0')
  const completedFormatted = String(completedInterviews).padStart(2, '0')
  const averageScoreFormatted = averageScore > 0 ? String(averageScore) : '00'

  const hasActivity = totalInterviews > 0

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="w-full min-h-screen bg-[#F8F6F1] text-[#111110] px-4 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-16 relative overflow-x-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-30" />

      <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* ════════════════════════════════════════════════════════════
            PAGE TOP HEADER
           ════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e2e0d6] pb-8 gap-6">
          <div className="space-y-1">
            <div className="font-mono text-xs text-[#88857d] uppercase tracking-widest font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>// USER PROFILE & DASHBOARD HUB</span>
            </div>
            <h1 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-[#111110] uppercase tracking-tight">
              PROFILE DASHBOARD
            </h1>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/interview"
              className="no-underline group px-7 py-3.5 bg-[#111110] text-[#F8F6F1] font-mono text-xs font-bold uppercase tracking-wider rounded-xl border border-[#2e2c28] shadow-lg hover:bg-[#22211e] transition-all flex items-center justify-center gap-2.5 whitespace-nowrap"
            >
              <FiPlus size={16} className="group-hover:rotate-90 transition-transform" />
              <span>Create Interview</span>
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SECTION 1: HERO USER ACCOUNT CARD
           ════════════════════════════════════════════════════════════ */}
        <section className="bg-[#efece4] border border-[#e2e0d6] rounded-3xl p-8 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8 lg:gap-14">
          {/* Subtle Corner Accents */}
          <span className="absolute top-4 left-5 font-mono text-xs text-[#88857d]">+</span>
          <span className="absolute top-4 right-5 font-mono text-xs text-[#88857d]">+</span>
          <span className="absolute bottom-4 left-5 font-mono text-xs text-[#88857d]">+</span>
          <span className="absolute bottom-4 right-5 font-mono text-xs text-[#88857d]">+</span>

          {/* Animated SVG Avatar */}
          <div className="relative group shrink-0">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
              <img
                src={bloubAvatarSvg}
                alt="User Animated Avatar"
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-1 right-3 bg-emerald-500 text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-[#111110] shadow-xs">
              LIVE ACCOUNT
            </div>
          </div>

          {/* User Details Block */}
          <div className="flex-1 text-center md:text-left space-y-4 min-w-0">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#66645e] uppercase tracking-wider">
                <FiShield size={14} className="text-emerald-600" />
                <span>VERIFIED MEMBER</span>
              </div>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111110] uppercase tracking-tight truncate">
                {displayName}
              </h2>
              <div className="font-mono text-sm text-[#66645e] flex items-center justify-center md:justify-start gap-2 pt-0.5 truncate">
                <FiMail size={15} className="text-[#88857d]" />
                <span>{email}</span>
              </div>
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-start pt-1">
              <span className="px-3.5 py-1.5 bg-[#F8F6F1] border border-[#e2e0d6] font-mono text-xs font-bold rounded-xl text-[#111110] shadow-xs">
                ROLE: CANDIDATE
              </span>
              <span className="px-3.5 py-1.5 bg-[#F8F6F1] border border-[#e2e0d6] font-mono text-xs font-bold rounded-xl text-[#111110] shadow-xs">
                TIER: PRO ACCESS
              </span>
              <span className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 font-mono text-xs font-bold rounded-xl text-emerald-700 shadow-xs">
                SYSTEM ONLINE
              </span>
            </div>

            {/* Logout Action */}
            <div className="pt-2 flex justify-center md:justify-start">
              <button
                type="button"
                onClick={handleLogout}
                className="btn-fill-animate font-mono font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-xl flex items-center gap-2.5 cursor-pointer shadow-xs"
              >
                <FiLogOut size={16} />
                <span>LOGOUT SESSION</span>
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 2: PERFORMANCE METRICS CARDS
           ════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="border-b border-[#e2e0d6] pb-4">
            <div className="font-mono text-xs text-[#88857d] uppercase tracking-widest font-bold mb-1">
              // 01. PERFORMANCE METRICS
            </div>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#111110]">
              Interview Performance Stats
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <StatCard
              title="TOTAL INTERVIEWS"
              value={totalInterviewsFormatted}
              badgeText="All Time"
              subtitleText="Interviews Created"
            />
            <StatCard
              title="QUESTIONS SOLVED"
              value={questionsAnsweredFormatted}
              badgeText="Answered"
              subtitleText="Across All Sessions"
            />
            <StatCard
              title="COMPLETED"
              value={completedFormatted}
              badgeText={hasActivity ? `${totalInterviews} Total` : '0 Total'}
              subtitleText="Interviews Finished"
            />
            <StatCard
              title="AVERAGE SCORE"
              value={averageScoreFormatted}
              unit="/100"
              badgeText="Completed Only"
              subtitleText="Average Performance"
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 3: EVALUATION RADAR CHARTS
           ════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="border-b border-[#e2e0d6] pb-4">
            <div className="font-mono text-xs text-[#88857d] uppercase tracking-widest font-bold mb-1">
              // 02. EVALUATION RADAR CHARTS
            </div>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#111110]">
              Skill Assessment Radar
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Technical Radar Chart */}
            <div className="bg-[#141412] text-[#F8F6F1] p-8 rounded-3xl border border-[#262522] flex flex-col items-center justify-between text-center shadow-xl min-h-[360px]">
              <div className="font-mono text-xs text-[#a3a097] uppercase tracking-widest font-bold">
                TECHNICAL SKILLS EVALUATION
              </div>

              <div className="relative w-full max-w-[320px] h-[270px] flex items-center justify-center my-4">
                <svg className="w-full h-full" viewBox="0 0 300 260">
                  <polygon points="150,50 210,75 235,135 210,195 150,220 90,195 65,135 90,75" fill="none" stroke="#484642" strokeWidth="1.5" />
                  <polygon points="150,71 192,89 210,135 192,177 150,195 108,177 90,135 108,89" fill="none" stroke="#484642" strokeWidth="1.5" />
                  <polygon points="150,92 174,103 185,135 174,159 150,170 126,159 115,135 126,103" fill="none" stroke="#484642" strokeWidth="1.5" />

                  <line x1="150" y1="135" x2="150" y2="50" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="210" y2="75" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="235" y2="135" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="210" y2="195" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="150" y2="220" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="90" y2="195" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="65" y2="135" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="90" y2="75" stroke="#484642" strokeWidth="1.5" />

                  <polygon
                    points={hasActivity ? "150,55 200,82 225,135 195,180 150,210 100,185 75,135 98,80" : "150,92 174,103 185,135 174,159 150,170 126,159 115,135 126,103"}
                    fill={hasActivity ? "rgba(255, 255, 255, 0.20)" : "rgba(255, 255, 255, 0.05)"}
                    stroke={hasActivity ? "#ffffff" : "#a3a097"}
                    strokeWidth="2.5"
                  />

                  <text x="150" y="38" textAnchor="middle" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Correctness</text>
                  <text x="222" y="65" textAnchor="start" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Clarity</text>
                  <text x="246" y="139" textAnchor="start" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Relevance</text>
                  <text x="220" y="210" textAnchor="start" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Detail</text>
                  <text x="150" y="238" textAnchor="middle" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Efficiency</text>
                  <text x="80" y="210" textAnchor="end" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Communication</text>
                  <text x="54" y="139" textAnchor="end" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Problem solving</text>
                  <text x="78" y="65" textAnchor="end" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Creativity</text>
                </svg>
              </div>

              <div className="font-mono text-[11px] text-[#88857d] uppercase tracking-wider">
                {hasActivity ? 'REAL-TIME ACTIVITY METRICS' : 'NO RECORDED INTERVIEWS YET'}
              </div>
            </div>

            {/* Behavioral Radar Chart */}
            <div className="bg-[#141412] text-[#F8F6F1] p-8 rounded-3xl border border-[#262522] flex flex-col items-center justify-between text-center shadow-xl min-h-[360px]">
              <div className="font-mono text-xs text-[#a3a097] uppercase tracking-widest font-bold">
                HR & BEHAVIORAL EVALUATION
              </div>

              <div className="relative w-full max-w-[320px] h-[270px] flex items-center justify-center my-4">
                <svg className="w-full h-full" viewBox="0 0 300 260">
                  <polygon points="150,50 210,75 235,135 210,195 150,220 90,195 65,135 90,75" fill="none" stroke="#484642" strokeWidth="1.5" />
                  <polygon points="150,71 192,89 210,135 192,177 150,195 108,177 90,135 108,89" fill="none" stroke="#484642" strokeWidth="1.5" />
                  <polygon points="150,92 174,103 185,135 174,159 150,170 126,159 115,135 126,103" fill="none" stroke="#484642" strokeWidth="1.5" />

                  <line x1="150" y1="135" x2="150" y2="50" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="210" y2="75" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="235" y2="135" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="210" y2="195" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="150" y2="220" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="90" y2="195" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="65" y2="135" stroke="#484642" strokeWidth="1.5" />
                  <line x1="150" y1="135" x2="90" y2="75" stroke="#484642" strokeWidth="1.5" />

                  <polygon
                    points={hasActivity ? "150,60 195,85 220,135 190,175 150,205 105,180 80,135 102,82" : "150,92 174,103 185,135 174,159 150,170 126,159 115,135 126,103"}
                    fill={hasActivity ? "rgba(255, 255, 255, 0.20)" : "rgba(255, 255, 255, 0.05)"}
                    stroke={hasActivity ? "#ffffff" : "#a3a097"}
                    strokeWidth="2.5"
                  />

                  <text x="150" y="38" textAnchor="middle" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Correctness</text>
                  <text x="222" y="65" textAnchor="start" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Clarity</text>
                  <text x="246" y="139" textAnchor="start" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Relevance</text>
                  <text x="220" y="210" textAnchor="start" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Detail</text>
                  <text x="150" y="238" textAnchor="middle" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Efficiency</text>
                  <text x="80" y="210" textAnchor="end" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Communication</text>
                  <text x="54" y="139" textAnchor="end" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Problem solving</text>
                  <text x="78" y="65" textAnchor="end" fill="#d5d2c8" fontSize="11" fontWeight="600" fontFamily="sans-serif">Creativity</text>
                </svg>
              </div>

              <div className="font-mono text-[11px] text-[#88857d] uppercase tracking-wider">
                {hasActivity ? 'REAL-TIME BEHAVIORAL SCORE' : 'NO RECORDED INTERVIEWS YET'}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SECTION 4: SPECIALIZED AI AGENTS SUITE
           ════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="border-b border-[#e2e0d6] pb-4">
            <div className="font-mono text-xs text-[#88857d] uppercase tracking-widest font-bold mb-1">
              // 03. SPECIALIZED AI AGENTS
            </div>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#111110]">
              AI Tools & Action Hub
            </h3>
            <p className="font-sans text-sm text-[#66645e] mt-1">
              Select an agent to launch tailored mock interviews, analyze your resume, or generate custom learning roadmaps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {/* Card 1: Resume Agent */}
            <AgentMediaCard
              to="/resume"
              title="Resume Agent"
              description="Create ATS-friendly resumes, improve profile strength, and maximize interview opportunities."
              icon={FiFileText}
              imageSrc={resumeImg}
              videoSrc={resumeVid}
              badgeText="RESUME AI"
              ctaText="EXPLORE AGENT"
            />

            {/* Card 2: Interview Agent */}
            <AgentMediaCard
              to="/interview"
              title="Interview Agent"
              description="Conduct realistic HR, Technical, and Coding interviews with AI-powered simulations."
              icon={FiMic}
              imageSrc={interviewImg}
              videoSrc={interviewVid}
              badgeText="MOCK AI"
              ctaText="PRACTICE NOW"
            />

            {/* Card 3: Feedback Agent */}
            <AgentMediaCard
              to="/scorer"
              title="Feedback Agent"
              description="Get detailed answer analysis, scoring reports, and improvement recommendations."
              icon={FiBarChart2}
              imageSrc={resumeImg}
              videoSrc={resumeVid}
              badgeText="ANALYSIS AI"
              ctaText="VIEW REPORTS"
            />

            {/* Card 4: Roadmap Agent */}
            <AgentMediaCard
              to="/roadmap"
              title="Roadmap Agent"
              description="Generate personalized learning roadmaps based on goals, skills, and performance."
              icon={FiCompass}
              imageSrc={roadmapImg}
              videoSrc={roadmapVid}
              badgeText="PATHWAY AI"
              ctaText="GENERATE PATH"
            />
          </div>
        </section>

      </div>
    </div>
  )
}

export default ProfilePage