import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiUploadCloud,
  FiCheck,
  FiAlertTriangle,
  FiX,
  FiCpu,
  FiLock,
  FiChevronRight,
  FiCompass,
  FiMessageSquare,
  FiBarChart2
} from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrollableHeight = rect.height - window.innerHeight
      if (scrollableHeight <= 0) return
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / scrollableHeight))
      setProgress(p)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref])

  return progress
}

const ResumeScrollSection = ({ containerRef: externalRef }) => {
  const localRef = useRef(null)
  const containerRef = externalRef || localRef
  const progress = useScrollProgress(containerRef)

  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

  // Active stage determination based on scroll progress
  // 0.00-0.12 : Upload Prompt
  // 0.12-0.28 : Upload & AI Laser Scan
  // 0.28-0.42 : AI Pipeline Diagram
  // 0.42-0.56 : ATS Score (84/100)
  // 0.56-0.70 : Strengths & Gaps
  // 0.70-0.82 : AI Improvement
  // 0.82-0.92 : Target Role Match & Career Connection
  // 0.92-1.00 : Transition to Career Roadmap

  const stage =
    progress < 0.12 ? 0 :
    progress < 0.28 ? 1 :
    progress < 0.42 ? 2 :
    progress < 0.56 ? 3 :
    progress < 0.70 ? 4 :
    progress < 0.82 ? 5 :
    progress < 0.92 ? 6 : 7

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '700vh' }}>
      <div className="sticky top-[76px] w-full h-[calc(100vh-76px)] overflow-hidden bg-[#F8F6F1] text-[#111110] font-sans flex flex-col justify-between p-4 sm:p-8 lg:p-10 select-none">
        
        {/* Subtle Engineering Grid Background */}
        <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-60" />

        {/* ── TOP SYSTEM BAR ── */}
        <div className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto border-b border-[#e2e0d6] pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
              // SYSTEM 02 / RESUME INTELLIGENCE
            </span>
          </div>

          <div className="font-mono text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>● RESUME ANALYSIS ENGINE / READY</span>
          </div>
        </div>

        {/* ── MAIN DYNAMIC SCROLL CONTAINER ── */}
        <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto flex items-center justify-center min-h-0 py-4">

          {/* ════════ STAGE 0: UPLOAD PROMPT ════════ */}
          <div
            className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 my-auto"
            style={{
              opacity: stage === 0 ? 1 : 0,
              transform: stage === 0 ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.97)',
              transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
              pointerEvents: stage === 0 ? 'auto' : 'none',
            }}
          >
            {/* Left Headline */}
            <div className="flex-1 max-w-xl text-left space-y-4">
              <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] uppercase text-[#111110]">
                YOUR RESUME.<br />
                <span className="text-[#66645e]">UNDERSTOOD BY AI.</span>
              </h1>
              <p className="font-sans text-xs sm:text-sm lg:text-base text-[#66645e] leading-relaxed max-w-md">
                Upload your resume and let the AI identify strengths, weaknesses and opportunities before you apply.
              </p>
              <div className="pt-2">
                <Link to="/resume" className="btn-tactile-dark-3d text-xs px-6 py-3.5 rounded-xl uppercase font-mono font-bold inline-flex items-center gap-2">
                  <span>SELECT FILE</span>
                  <FiArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Minimal Rectangular Dropzone Box */}
            <div className="flex-1 max-w-md w-full">
              <div className="w-full h-[280px] bg-[#efece4]/50 border border-[#b5b2a8] rounded-xl flex flex-col items-center justify-between p-8 text-center relative hover:border-[#111110] transition-colors">
                <div className="my-auto space-y-3">
                  <div className="w-10 h-10 border border-[#111110] flex items-center justify-center mx-auto text-[#111110] bg-[#F8F6F1]">
                    <FiUploadCloud size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-xs font-bold text-[#111110] uppercase tracking-widest">
                      DROP YOUR RESUME HERE
                    </div>
                    <div className="font-mono text-[11px] text-[#88857d] uppercase">
                      PDF / DOCX
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[10px] text-[#88857d] uppercase tracking-wider pt-3 border-t border-[#e2e0d6] w-full">
                  MAX 5MB / SINGLE DOCUMENT
                </div>
              </div>
            </div>
          </div>

          {/* ════════ STAGE 1: SCANNING RESUME ════════ */}
          <div
            className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-12 my-auto"
            style={{
              opacity: stage === 1 ? 1 : 0,
              transform: stage === 1 ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.97)',
              transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
              pointerEvents: stage === 1 ? 'auto' : 'none',
            }}
          >
            {/* Resume Document Box with Vertical Green Laser Scanning Line */}
            <div className="relative w-full max-w-md h-[340px] bg-[#F8F6F1] border border-[#111110] rounded-xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
              {/* Green Laser Scan Line */}
              <div className="absolute inset-x-0 h-1 bg-emerald-500 shadow-[0_0_15px_#059669] animate-pulse z-30" style={{
                top: '30%',
                animation: 'scanLine 2.5s ease-in-out infinite alternate'
              }} />

              {/* Candidate Info Header */}
              <div className="space-y-1 border-b border-[#e2e0d6] pb-3 text-left">
                <div className="font-mono font-black text-2xl text-[#111110]">PRAKASH</div>
                <div className="font-mono text-xs font-bold text-emerald-700 tracking-wider">FULL STACK DEVELOPER</div>
                <div className="font-mono text-[10px] text-[#66645e]">React · Node.js · MongoDB · AWS</div>
              </div>

              {/* Document Skeleton Body */}
              <div className="space-y-3 py-2 text-left">
                <div className="space-y-1">
                  <div className="w-16 h-2 bg-[#d5d2c8] rounded" />
                  <div className="w-full h-1.5 bg-[#e2e0d6] rounded" />
                  <div className="w-4/5 h-1.5 bg-[#e2e0d6] rounded" />
                </div>
                <div className="space-y-1">
                  <div className="w-20 h-2 bg-[#d5d2c8] rounded" />
                  <div className="w-full h-1.5 bg-[#e2e0d6] rounded" />
                  <div className="w-3/4 h-1.5 bg-[#e2e0d6] rounded" />
                </div>
              </div>

              <div className="font-mono text-[10px] text-emerald-700 font-bold flex items-center justify-between border-t border-[#e2e0d6] pt-2">
                <span>PRAKASH_RESUME.PDF</span>
                <span className="flex items-center gap-1"><FiCpu size={12} className="animate-spin" /> SCANNING...</span>
              </div>
            </div>

            {/* Right Technical Scanner Labels */}
            <div className="flex flex-col gap-3 font-mono text-xs text-left max-w-xs w-full">
              <div className="p-3 bg-[#efece4] border border-[#e2e0d6] rounded-lg flex items-center justify-between text-[#111110]">
                <span>PARSING</span>
                <span className="text-emerald-600 font-bold">DONE ✓</span>
              </div>
              <div className="p-3 bg-[#efece4] border border-[#e2e0d6] rounded-lg flex items-center justify-between text-[#111110]">
                <span>SKILLS DETECTED</span>
                <span className="text-emerald-600 font-bold">14 FOUND</span>
              </div>
              <div className="p-3 bg-[#efece4] border border-[#e2e0d6] rounded-lg flex items-center justify-between text-[#111110]">
                <span>EXPERIENCE FOUND</span>
                <span className="text-emerald-600 font-bold">3 YEARS</span>
              </div>
              <div className="p-3 bg-[#efece4] border border-[#e2e0d6] rounded-lg flex items-center justify-between text-[#111110]">
                <span>PROJECTS FOUND</span>
                <span className="text-emerald-600 font-bold">4 DETECTED</span>
              </div>
              <div className="p-3 bg-[#efece4] border border-[#e2e0d6] rounded-lg flex items-center justify-between text-[#111110]">
                <span>KEYWORDS INDEXED</span>
                <span className="text-emerald-600 font-bold">24 MATCHES</span>
              </div>
            </div>
          </div>

          {/* ════════ STAGE 2: AI PIPELINE DIAGRAM ════════ */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 my-auto"
            style={{
              opacity: stage === 2 ? 1 : 0,
              transform: stage === 2 ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.97)',
              transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
              pointerEvents: stage === 2 ? 'auto' : 'none',
            }}
          >
            <div className="font-mono text-xs font-bold text-[#88857d] uppercase tracking-[0.2em] mb-2">
              // AI EXTRACTION PIPELINE
            </div>

            {/* Minimal Horizontal Flow Diagram */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 font-mono text-xs w-full max-w-4xl">
              <div className="p-4 bg-[#efece4] border border-[#111110] rounded-lg text-[#111110] font-bold text-center min-w-[130px]">
                RESUME
              </div>
              <div className="text-emerald-600 font-bold">↓</div>
              <div className="p-4 bg-[#efece4] border border-[#d5d2c8] rounded-lg text-[#111110] text-center min-w-[150px] flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                PARSING ENGINE
              </div>
              <div className="text-emerald-600 font-bold">↓</div>
              <div className="p-4 bg-[#efece4] border border-[#d5d2c8] rounded-lg text-[#111110] text-center min-w-[150px] flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                SKILL EXTRACTION
              </div>
              <div className="text-emerald-600 font-bold">↓</div>
              <div className="p-4 bg-[#efece4] border border-[#d5d2c8] rounded-lg text-[#111110] text-center min-w-[140px] flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                ATS ANALYSIS
              </div>
              <div className="text-emerald-600 font-bold">↓</div>
              <div className="p-4 bg-[#111110] text-[#F8F6F1] border border-[#111110] rounded-lg text-center font-bold min-w-[130px]">
                ROLE MATCH
              </div>
            </div>

            <p className="font-sans text-xs text-[#66645e] max-w-md text-center">
              Minimal technical signal network processing resume structure and extracting core career metrics.
            </p>
          </div>

          {/* ════════ STAGE 3: ATS SCORE (84/100) ════════ */}
          <div
            className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-5xl mx-auto my-auto"
            style={{
              opacity: stage === 3 ? 1 : 0,
              transform: stage === 3 ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.97)',
              transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
              pointerEvents: stage === 3 ? 'auto' : 'none',
            }}
          >
            {/* Left Huge Technical ATS Score */}
            <div className="flex-1 text-left space-y-2">
              <div className="font-mono text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
                // ATS ANALYSIS
              </div>
              <div className="font-mono font-black text-7xl sm:text-8xl text-[#111110] tracking-tight">
                84
                <span className="text-2xl sm:text-3xl text-[#88857d] font-normal"> / 100</span>
              </div>
              <div className="font-mono text-sm font-bold text-emerald-600 tracking-wider">
                ATS SCORE
              </div>
            </div>

            {/* Right Thin Progress Lines */}
            <div className="flex-1 w-full space-y-4 font-mono text-xs text-left">
              <div>
                <div className="flex justify-between text-[#111110] font-semibold mb-1">
                  <span>KEYWORD MATCH</span>
                  <span>92%</span>
                </div>
                <div className="h-1.5 bg-[#d5d2c8] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#111110] font-semibold mb-1">
                  <span>FORMATTING</span>
                  <span>88%</span>
                </div>
                <div className="h-1.5 bg-[#d5d2c8] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#111110] font-semibold mb-1">
                  <span>SKILLS RELEVANCE</span>
                  <span>81%</span>
                </div>
                <div className="h-1.5 bg-[#d5d2c8] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '81%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#111110] font-semibold mb-1">
                  <span>EXPERIENCE RELEVANCE</span>
                  <span>76%</span>
                </div>
                <div className="h-1.5 bg-[#d5d2c8] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '76%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* ════════ STAGE 4: STRENGTHS & GAPS ════════ */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto my-auto"
            style={{
              opacity: stage === 4 ? 1 : 0,
              transform: stage === 4 ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.97)',
              transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
              pointerEvents: stage === 4 ? 'auto' : 'none',
            }}
          >
            <div className="font-mono text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
              // AI DETECTED SIGNALS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
              {/* STRENGTHS */}
              <div className="p-6 bg-[#efece4] border border-[#d5d2c8] rounded-xl space-y-4">
                <div className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  STRENGTHS
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {['REST APIs', 'React', 'MongoDB', 'Authentication', 'MERN'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* GAPS */}
              <div className="p-6 bg-[#efece4] border border-[#d5d2c8] rounded-xl space-y-4">
                <div className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  GAPS
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {['System Design', 'AWS', 'Kubernetes', 'Redis'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ════════ STAGE 5: AI IMPROVEMENT ════════ */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 max-w-4xl mx-auto my-auto"
            style={{
              opacity: stage === 5 ? 1 : 0,
              transform: stage === 5 ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.97)',
              transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
              pointerEvents: stage === 5 ? 'auto' : 'none',
            }}
          >
            <div className="font-mono text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
              // AI IMPROVEMENT
            </div>

            <div className="w-full space-y-4 text-left font-mono text-xs">
              {/* CURRENT STATEMENT */}
              <div className="p-4 bg-[#efece4] border border-[#d5d2c8] rounded-xl space-y-1">
                <div className="text-[10px] text-[#88857d] font-bold uppercase tracking-widest">CURRENT</div>
                <div className="text-[#55534e]">"Built a job portal using MERN."</div>
              </div>

              {/* AI SUGGESTION WITH GREEN UNDERLINES */}
              <div className="p-5 bg-[#F8F6F1] border border-emerald-300 rounded-xl space-y-2 shadow-sm">
                <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">AI SUGGESTION</div>
                <div className="font-sans text-sm text-[#111110] leading-relaxed">
                  Built a MERN-based job platform with{' '}
                  <span className="border-b-2 border-emerald-500 font-semibold">role-based authentication</span>,{' '}
                  <span className="border-b-2 border-emerald-500 font-semibold">REST APIs</span> and{' '}
                  <span className="border-b-2 border-emerald-500 font-semibold">MongoDB-backed job discovery</span>.
                </div>
                <div className="flex flex-wrap gap-3 pt-2 text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                  <span>+ IMPACT</span>
                  <span>+ TECHNICAL SPECIFICITY</span>
                  <span>+ ATS RELEVANCE</span>
                </div>
              </div>
            </div>

            <Link to="/resume" className="btn-tactile-dark-3d text-xs px-6 py-3 rounded-xl uppercase font-mono font-bold inline-flex items-center gap-2">
              <span>APPLY SUGGESTION</span>
              <FiArrowRight size={14} />
            </Link>
          </div>

          {/* ════════ STAGE 6: TARGET ROLE MATCH & CAREER CONNECTION ════════ */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 max-w-4xl mx-auto my-auto"
            style={{
              opacity: stage === 6 ? 1 : 0,
              transform: stage === 6 ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.97)',
              transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
              pointerEvents: stage === 6 ? 'auto' : 'none',
            }}
          >
            <div className="font-mono text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
              // TARGET ROLE MATCH — FULL STACK DEVELOPER
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center text-left">
              {/* Skill Matrix */}
              <div className="md:col-span-7 space-y-2 font-mono text-xs bg-[#efece4] border border-[#d5d2c8] p-5 rounded-xl">
                <div className="flex justify-between py-1 border-b border-[#e2e0d6]">
                  <span>React</span><span className="text-emerald-600 font-bold">✓</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e2e0d6]">
                  <span>Node.js</span><span className="text-emerald-600 font-bold">✓</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e2e0d6]">
                  <span>MongoDB</span><span className="text-emerald-600 font-bold">✓</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e2e0d6]">
                  <span>Docker</span><span className="text-emerald-600 font-bold">✓</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e2e0d6]">
                  <span>AWS</span><span className="text-amber-600 font-bold">⚠</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#e2e0d6]">
                  <span>System Design</span><span className="text-amber-600 font-bold">⚠</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Kubernetes</span><span className="text-red-500 font-bold">×</span>
                </div>
              </div>

              {/* Side Score */}
              <div className="md:col-span-5 space-y-3">
                <div className="font-mono text-4xl font-black text-[#111110]">
                  ROLE MATCH 81%
                </div>
                <p className="font-sans text-xs text-[#66645e] leading-relaxed">
                  Your resume matches most requirements for this role, but backend architecture and cloud experience are limiting your score.
                </p>

                {/* Connected Flow */}
                <div className="font-mono text-[10px] font-bold text-emerald-700 flex flex-wrap items-center gap-1.5 pt-2">
                  <span>RESUME</span> → <span>84 ATS</span> → <span>AI INTERVIEW</span> → <span className="text-amber-700 font-black">SYSTEM DESIGN GAP</span> → <span>CAREER ROADMAP</span>
                </div>
              </div>
            </div>
          </div>

          {/* ════════ STAGE 7: TRANSITION TO CAREER ROADMAP ════════ */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 max-w-xl mx-auto my-auto text-center"
            style={{
              opacity: stage === 7 ? 1 : 0,
              transform: stage === 7 ? 'scale(1.05)' : 'scale(0.95)',
              transition: `opacity 0.7s ${ease}, transform 0.7s ${ease}`,
              pointerEvents: stage === 7 ? 'auto' : 'none',
            }}
          >
            <div className="font-mono text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
              // DETECTED FOCUS AREA
            </div>

            <div className="p-8 bg-[#111110] text-[#F8F6F1] border border-[#111110] rounded-2xl space-y-3 w-full shadow-2xl">
              <div className="font-mono text-3xl font-black tracking-tight text-amber-400">
                SYSTEM DESIGN
              </div>
              <div className="font-mono text-xs text-[#a3a097]">
                GAP IDENTIFIED FROM RESUME AUDIT
              </div>
            </div>

            <div className="font-sans text-xl font-black text-[#111110] uppercase tracking-tight pt-4">
              YOUR CAREER PATH.
            </div>
          </div>

        </div>

        {/* ── BOTTOM INDICATOR BAR ── */}
        <div className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto border-t border-[#e2e0d6] pt-3 font-mono text-[11px] text-[#88857d]">
          <div>
            SCROLL {String(stage + 1).padStart(2, '0')} / 08
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((s) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  stage === s ? 'w-6 bg-[#111110]' : 'w-1.5 bg-[#d5d2c8]'
                }`}
              />
            ))}
          </div>
          <div>
            CAREER INTELLIGENCE SYSTEM
          </div>
        </div>

      </div>

      {/* Keyframe animation for scanning line */}
      <style>{`
        @keyframes scanLine {
          0% { top: 10%; }
          100% { top: 85%; }
        }
      `}</style>
    </div>
  )
}

export default ResumeScrollSection
