import React from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiFileText,
  FiMic,
  FiBarChart2,
  FiCompass,
  FiPlus
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useStats } from '../context/StatsContext'
import StatCard from '../components/StatCard'

const HomePage = () => {
  const { user, isAuthenticated, initials } = useAuth()
  const { userStats } = useStats()

  // Dynamic user display name format
  const rawName = user?.username || user?.name || user?.email?.split('@')[0] || 'Ankush'
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase()

  // Formatted stats (Defaults to 00 / 0 for new users)
  const totalInterviews = userStats?.totalInterviews || 0
  const questionsAnswered = userStats?.questionsAnswered || 0
  const completedInterviews = userStats?.completedInterviews || 0
  const averageScore = userStats?.averageScore || 0
  const technicalCount = userStats?.technicalCount || 0
  const hrCount = userStats?.hrCount || 0

  const totalInterviewsFormatted = String(totalInterviews).padStart(2, '0')
  const questionsAnsweredFormatted = String(questionsAnswered).padStart(2, '0')
  const completedFormatted = String(completedInterviews).padStart(2, '0')
  const averageScoreFormatted = averageScore > 0 ? String(averageScore) : '00'

  const hasActivity = totalInterviews > 0

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#111110] relative overflow-x-hidden font-sans flex flex-col items-center justify-center py-10 sm:py-14">
      {/* ── Background Grid Accent Lines ── */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-40" />

      {/* ════════════════════════════════════════════════════════════
          HERO & DASHBOARD SECTION
         ════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-[1400px] mx-auto pt-4 pb-6 sm:pt-6 sm:pb-8 px-4 sm:px-6 flex flex-col items-center justify-center text-center">

        {/* 3-Line Headline matching exact image typography & grey middle line */}
        <h1
          className="font-sans font-extrabold uppercase tracking-tight leading-[1.05] text-[#111110] max-w-3xl mb-4 text-center"
          style={{ fontSize: 'clamp(22px, 3.2vw, 40px)' }}
        >
          YOUR RESUME <br />
          <span className="text-[#9e9b91] font-extrabold">SHOULDN'T BE THE REASON</span> <br />
          YOU GET REJECTED.
        </h1>

        {/* Subtitle Paragraph */}
        <p className="font-sans text-sm sm:text-base text-[#66645e] max-w-2xl leading-relaxed mb-6 text-center mx-auto">
          CareerForge AI is an innovative AI-powered interview preparation platform designed to help job seekers excel in their interviews and land their dream jobs.
        </p>

        {/* Primary CTA Button (Balanced Margin Top & Bottom) */}
        <div className="mt-10 mb-10 sm:mt-12 sm:mb-12 flex justify-center w-full">
          <Link
            to={isAuthenticated ? '/interview' : '/register'}
            className="no-underline group relative inline-flex items-center justify-center gap-4 px-9 py-3.5 sm:px-11 sm:py-4 bg-[#111110] text-[#F8F6F1] font-sans text-base font-bold tracking-wide rounded-md border border-[#2e2c28] shadow-2xl hover:bg-[#22211e] hover:shadow-[0_15px_30px_rgba(17,17,16,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>Get started for free</span>
            <div className="w-8 h-8 rounded-full bg-[#262522] border border-[#383733] flex items-center justify-center text-[#F8F6F1] shrink-0 group-hover:bg-[#33312d] transition-colors">
              <FiArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </Link>
        </div>

        {/* ════════════════════════════════════════════════════════════
            DASHBOARD PREVIEW MOCKUP (STATUS STORED IN CONTEXT)
           ════════════════════════════════════════════════════════════ */}
        <div className="w-[90%] max-w-[1280px] mx-auto text-left py-2">
          <div className="w-full">

            {/* Dashboard Mockup Nav Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e2e0d6]">
              <div className="flex items-center gap-3.5">
                {/* PD Avatar initials */}
                <div className="w-10 h-10 rounded-xl bg-[#111110] text-white flex items-center justify-center font-mono font-bold text-sm shadow-md border border-[#2b2925] shrink-0">
                  {initials || 'PD'}
                </div>
                <div>
                  <div className="font-mono text-xs text-[#55524a] uppercase tracking-widest font-bold">
                    Overview
                  </div>
                  <h2 className="font-sans font-bold text-xl text-[#111110] flex items-center gap-1.5 m-0">
                    <span>Hello, {displayName}</span>
                    <span className="text-base">👋</span>
                  </h2>
                </div>
              </div>

              {/* + Create Interview Button with rounded-md and Right Margin */}
              <div className="flex items-center gap-2 mr-6 sm:mr-8">
                <Link
                  to="/interview"
                  className="no-underline group px-8 py-3 sm:px-9 sm:py-3.5 bg-[#111110] text-white font-sans text-xs sm:text-sm font-bold rounded-md border border-[#2e2c28] shadow-lg hover:bg-[#22211e] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap"
                >
                  <FiPlus size={16} className="text-white shrink-0 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="tracking-wide">Create Interview</span>
                </Link>
              </div>
            </div>

            {/* 4 Reusable StatCard Components (Consuming StatsContext & Standardized 12px Scale - Issue #1 & #4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-8 mb-8 sm:mt-10 sm:mb-10 items-stretch">
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
                subtitleText="Across All Interviews"
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

            {/* Performance Sub-Heading Section (Margin Top) */}
            <div className="mt-12 sm:mt-16 mb-4 text-left">
              <div className="font-mono text-[11px] text-[#88857d] uppercase tracking-widest font-semibold">
                PERFORMANCE
              </div>
              <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#111110]">
                Interview History
              </h3>
            </div>

            {/* High Definition SVG Radar Charts Grid (High Contrast Lines & Text - Issue #8) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Radar Chart 1 - Technical Interviews */}
              <div className="bg-[#141412] text-[#F8F6F1] p-6 rounded-2xl border border-[#262522] flex flex-col items-center justify-center text-center shadow-xl min-h-[300px]">

                <div className="relative w-full max-w-[290px] h-[250px] flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 260">
                    {/* Concentric Polygons (High Contrast Grid Stroke #484642) */}
                    <polygon points="150,50 210,75 235,135 210,195 150,220 90,195 65,135 90,75" fill="none" stroke="#484642" strokeWidth="1.5" />
                    <polygon points="150,71 192,89 210,135 192,177 150,195 108,177 90,135 108,89" fill="none" stroke="#484642" strokeWidth="1.5" />
                    <polygon points="150,92 174,103 185,135 174,159 150,170 126,159 115,135 126,103" fill="none" stroke="#484642" strokeWidth="1.5" />

                    {/* Axis Lines */}
                    <line x1="150" y1="135" x2="150" y2="50" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="210" y2="75" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="235" y2="135" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="210" y2="195" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="150" y2="220" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="90" y2="195" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="65" y2="135" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="90" y2="75" stroke="#484642" strokeWidth="1.5" />

                    {/* Active Polygon Data (High Contrast White Stroke & Translucent Fill) */}
                    <polygon
                      points={hasActivity ? "150,55 200,82 225,135 195,180 150,210 100,185 75,135 98,80" : "150,92 174,103 185,135 174,159 150,170 126,159 115,135 126,103"}
                      fill={hasActivity ? "rgba(255, 255, 255, 0.20)" : "rgba(255, 255, 255, 0.05)"}
                      stroke={hasActivity ? "#ffffff" : "#a3a097"}
                      strokeWidth="2.5"
                    />

                    {/* 8 Outer Metric Axis Labels (High Contrast Text #d5d2c8) */}
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
              </div>

              {/* Radar Chart 2 - HR & Behavioral */}
              <div className="bg-[#141412] text-[#F8F6F1] p-6 rounded-2xl border border-[#262522] flex flex-col items-center justify-center text-center shadow-xl min-h-[300px]">

                <div className="relative w-full max-w-[290px] h-[250px] flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 260">
                    {/* Concentric Polygons */}
                    <polygon points="150,50 210,75 235,135 210,195 150,220 90,195 65,135 90,75" fill="none" stroke="#484642" strokeWidth="1.5" />
                    <polygon points="150,71 192,89 210,135 192,177 150,195 108,177 90,135 108,89" fill="none" stroke="#484642" strokeWidth="1.5" />
                    <polygon points="150,92 174,103 185,135 174,159 150,170 126,159 115,135 126,103" fill="none" stroke="#484642" strokeWidth="1.5" />

                    {/* Axis Lines */}
                    <line x1="150" y1="135" x2="150" y2="50" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="210" y2="75" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="235" y2="135" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="210" y2="195" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="150" y2="220" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="90" y2="195" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="65" y2="135" stroke="#484642" strokeWidth="1.5" />
                    <line x1="150" y1="135" x2="90" y2="75" stroke="#484642" strokeWidth="1.5" />

                    {/* Active Polygon Data */}
                    <polygon
                      points={hasActivity ? "150,60 195,85 220,135 190,175 150,205 105,180 80,135 102,82" : "150,92 174,103 185,135 174,159 150,170 126,159 115,135 126,103"}
                      fill={hasActivity ? "rgba(255, 255, 255, 0.20)" : "rgba(255, 255, 255, 0.05)"}
                      stroke={hasActivity ? "#ffffff" : "#a3a097"}
                      strokeWidth="2.5"
                    />

                    {/* 8 Outer Metric Axis Labels */}
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
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════
          AI POWERED AGENTS SECTION
         ════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-6xl mx-auto mt-14 sm:mt-18 mb-10 pt-6 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center">

        {/* Section Title */}
        <h2 className="font-sans font-extrabold text-[#111110] text-2xl sm:text-3xl max-w-3xl leading-tight mb-3">
          Specialized Agents for <br />
          <span className="text-[#88857d]">Every Interview Stage</span>
        </h2>

        {/* Subtitle Paragraph */}
        <p className="font-sans text-base text-[#55534e] max-w-3xl leading-relaxed mb-8">
          CareerForge AI combines multiple AI agents that work together to help you build your resume, practice interviews, receive detailed feedback, and follow a personalized roadmap to land your dream job.
        </p>

        {/* 4 Cards Grid (Centered Alignment) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 w-full text-center items-stretch">

          {/* Card 1: Resume Agent */}
          <Link
            to="/resume"
            className="no-underline p-6 bg-[#1f1e1b] text-[#F8F6F1] rounded-2xl border border-[#33312c] hover:border-[#66645e] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between items-center text-center group shadow-xl h-full"
          >
            <div className="flex flex-col items-center justify-center text-center w-full">
              <div className="w-12 h-12 rounded-xl bg-[#2d2b27] flex items-center justify-center mb-4 text-[#F8F6F1] group-hover:scale-110 transition-transform mx-auto">
                <FiFileText size={22} />
              </div>
              <h3 className="font-sans font-bold text-lg mb-2 text-[#F8F6F1] text-center w-full">
                Resume Agent
              </h3>
              <p className="font-sans text-sm text-[#a3a097] leading-relaxed text-center w-full">
                Create ATS-friendly resumes, improve profile strength, and maximize interview opportunities.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#33312c] font-mono text-xs font-semibold text-emerald-400 flex items-center justify-center gap-2 w-full text-center">
              <span>EXPLORE AGENT</span>
              <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Interview Agent */}
          <Link
            to="/interview"
            className="no-underline p-6 bg-[#1f1e1b] text-[#F8F6F1] rounded-2xl border border-[#33312c] hover:border-[#66645e] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between items-center text-center group shadow-xl h-full"
          >
            <div className="flex flex-col items-center justify-center text-center w-full">
              <div className="w-12 h-12 rounded-xl bg-[#2d2b27] flex items-center justify-center mb-4 text-[#F8F6F1] group-hover:scale-110 transition-transform mx-auto">
                <FiMic size={22} />
              </div>
              <h3 className="font-sans font-bold text-lg mb-2 text-[#F8F6F1] text-center w-full">
                Interview Agent
              </h3>
              <p className="font-sans text-sm text-[#a3a097] leading-relaxed text-center w-full">
                Conduct realistic HR, Technical, and Coding interviews with AI-powered simulations.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#33312c] font-mono text-xs font-semibold text-emerald-400 flex items-center justify-center gap-2 w-full text-center">
              <span>PRACTICE NOW</span>
              <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Feedback Agent */}
          <Link
            to="/scorer"
            className="no-underline p-6 bg-[#1f1e1b] text-[#F8F6F1] rounded-2xl border border-[#33312c] hover:border-[#66645e] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between items-center text-center group shadow-xl h-full"
          >
            <div className="flex flex-col items-center justify-center text-center w-full">
              <div className="w-12 h-12 rounded-xl bg-[#2d2b27] flex items-center justify-center mb-4 text-[#F8F6F1] group-hover:scale-110 transition-transform mx-auto">
                <FiBarChart2 size={22} />
              </div>
              <h3 className="font-sans font-bold text-lg mb-2 text-[#F8F6F1] text-center w-full">
                Feedback Agent
              </h3>
              <p className="font-sans text-sm text-[#a3a097] leading-relaxed text-center w-full">
                Get detailed answer analysis, scoring reports, and improvement recommendations.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#33312c] font-mono text-xs font-semibold text-emerald-400 flex items-center justify-center gap-2 w-full text-center">
              <span>VIEW REPORTS</span>
              <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Roadmap Agent */}
          <Link
            to="/roadmap"
            className="no-underline p-6 bg-[#1f1e1b] text-[#F8F6F1] rounded-2xl border border-[#33312c] hover:border-[#66645e] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between items-center text-center group shadow-xl h-full"
          >
            <div className="flex flex-col items-center justify-center text-center w-full">
              <div className="w-12 h-12 rounded-xl bg-[#2d2b27] flex items-center justify-center mb-4 text-[#F8F6F1] group-hover:scale-110 transition-transform mx-auto">
                <FiCompass size={22} />
              </div>
              <h3 className="font-sans font-bold text-lg mb-2 text-[#F8F6F1] text-center w-full">
                Roadmap Agent
              </h3>
              <p className="font-sans text-sm text-[#a3a097] leading-relaxed text-center w-full">
                Generate personalized learning roadmaps based on goals, skills, and performance.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#33312c] font-mono text-xs font-semibold text-emerald-400 flex items-center justify-center gap-2 w-full text-center">
              <span>GENERATE PATH</span>
              <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

      </section>
    </div>
  )
}

export default HomePage