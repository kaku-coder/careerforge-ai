import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FiUploadCloud,
  FiUpload,
  FiCheck,
  FiAlertCircle,
  FiArrowRight,
  FiFileText,
  FiCheckCircle,
  FiLock,
  FiMessageSquare,
  FiCompass,
  FiBarChart2,
  FiChevronDown,
  FiCpu,
  FiArrowLeft,
  FiShield,
  FiTrash2
} from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

const API_BASE_URL = 'http://localhost:5000/api/resume'

// Semi-circle Arc Gauge Component for ATS Score
const AtsGauge = ({ score = 84 }) => {
  const radius = 70
  const strokeWidth = 14
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="180" height="110" viewBox="0 0 180 110" className="overflow-visible">
        <path
          d="M 20 95 A 70 70 0 0 1 160 95"
          fill="none"
          stroke="#e2e0d6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M 20 95 A 70 70 0 0 1 160 95"
          fill="none"
          stroke="#059669"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute bottom-1 flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline font-mono font-black text-4xl text-[#111110]">
          {score}
          <span className="text-sm font-semibold text-[#88857d] ml-1">/100</span>
        </div>
        <div className="font-mono text-xs font-bold text-emerald-600 tracking-wide mt-0.5">
          Good Score
        </div>
      </div>
    </div>
  )
}

const ResumeSection = () => {
  // Navigation & Upload Workflow States:
  // 'idle' -> Initial Upload Box with SELECT RESUME button
  // 'parsing' -> Parsing Progress Bar & Technical Steps
  // 'success' -> RESUME READY + ANALYZE RESUME button
  // 'dashboard' -> Full ATS Score & Resume Intelligence Analysis Page
  const [uploadState, setUploadState] = useState('idle')

  const [uploadedFileName, setUploadedFileName] = useState('PRAKASH_DAS_RESUME.PDF')
  const [parseProgress, setParseProgress] = useState(0)
  const [parsingStep, setParsingStep] = useState(1)

  const [targetRole, setTargetRole] = useState('Full Stack Developer')
  const [suggestionApplied, setSuggestionApplied] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const fileInputRef = useRef(null)

  const processUploadFlow = async (file) => {
    const fileName = file ? file.name.toUpperCase().replace(/\s+/g, '_') : 'PRAKASH_DAS_RESUME.PDF'
    setUploadedFileName(fileName)
    setUploadState('parsing')
    setParseProgress(10)
    setParsingStep(1)
    setUploadStatus(null)

    let currentP = 10
    const interval = setInterval(() => {
      currentP += 18
      if (currentP >= 100) {
        clearInterval(interval)
        setParseProgress(100)
        setParsingStep(5)
        setTimeout(() => {
          setUploadState('success')
        }, 500)
      } else {
        setParseProgress(currentP)
        if (currentP >= 75) setParsingStep(4)
        else if (currentP >= 50) setParsingStep(3)
        else if (currentP >= 25) setParsingStep(2)
      }
    }, 350)

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        await fetch(`${API_BASE_URL}/parse`, {
          method: 'POST',
          body: formData,
          credentials: 'include'
        })
      } catch {
        // Presentation handles state
      }
    }
  }

  const handleFileUpload = (file) => {
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.pdf') && !file.name.toLowerCase().endsWith('.docx')) {
      setUploadStatus({ type: 'error', text: 'Supported formats: PDF, DOCX' })
      return
    }
    processUploadFlow(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  return (
    <section className="w-full bg-[#F8F6F1] text-[#111110] py-12 px-4 sm:px-8 lg:px-12 font-sans relative border-t border-[#e2e0d6]">
      
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none opacity-40" />

      <div className="max-w-[1360px] mx-auto space-y-12 relative z-10">

        {/* ════════ INITIAL UPLOAD WORKFLOW (idle | parsing | success) ════════ */}
        {uploadState !== 'dashboard' && (
          <div className="space-y-12 py-6 sm:py-10">
            
            {/* Main 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="font-mono text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
                  // SYSTEM 02 / RESUME INTELLIGENCE
                </div>
                
                <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-[#111110] tracking-tight leading-[1.04] uppercase">
                  YOUR RESUME.<br />UNDERSTOOD BY AI.
                </h2>

                {/* Accent Short Green Bar */}
                <div className="w-10 h-1 bg-emerald-500 rounded-full" />

                <p className="font-sans text-sm sm:text-base text-[#55534e] max-w-md leading-relaxed">
                  Upload your resume and let the AI understand your experience, skills and career direction.
                </p>

                {/* Status Badge */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#efece4] border border-[#d5d2c8] rounded-lg font-mono text-xs font-bold text-[#33312c]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>RESUME ANALYSIS ENGINE / READY</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Outer Frame */}
              <div className="lg:col-span-6 flex">
                <div className="w-full bg-[#efece4]/40 border border-[#d5d2c8] rounded-2xl p-4 sm:p-6 shadow-sm relative">
                  
                  {/* Subtle Corner Markers */}
                  <span className="absolute top-2 left-3 font-mono text-[10px] text-[#88857d]">+</span>
                  <span className="absolute top-2 right-3 font-mono text-[10px] text-[#88857d]">+</span>
                  <span className="absolute bottom-2 left-3 font-mono text-[10px] text-[#88857d]">+</span>
                  <span className="absolute bottom-2 right-3 font-mono text-[10px] text-[#88857d]">+</span>

                  {/* ── STATE 1: IDLE UPLOAD DROPZONE ── */}
                  {uploadState === 'idle' && (
                    <div
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full min-h-[340px] rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer bg-[#F8F6F1]/90 hover:bg-[#F8F6F1] space-y-4 relative overflow-hidden ${
                        dragActive || isHovered
                          ? 'border-emerald-600 shadow-[0_0_20px_rgba(5,150,105,0.12)] scale-[1.01]'
                          : 'border-[#b5b2a8]'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => handleFileUpload(e.target.files?.[0])}
                        className="hidden"
                      />

                      {/* Icon with subtle hover elevation */}
                      <div className={`w-14 h-16 rounded-xl border border-[#111110] bg-[#F8F6F1] flex flex-col items-center justify-center relative shadow-sm transition-transform duration-300 ${
                        isHovered ? '-translate-y-1.5 border-emerald-600' : ''
                      }`}>
                        <FiFileText size={24} className={isHovered ? 'text-emerald-700' : 'text-[#111110]'} />
                        <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center absolute -top-1 -right-1 text-[10px] font-bold">
                          ↑
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="font-mono font-bold text-sm sm:text-base text-[#111110] uppercase tracking-wider">
                          {isHovered ? 'READY TO ANALYZE →' : 'DROP YOUR RESUME HERE'}
                        </div>
                        
                        <div className="w-8 h-0.5 bg-emerald-500 mx-auto my-1 rounded-full" />

                        <div className="font-mono text-xs text-[#66645e] uppercase tracking-widest pt-1">
                          PDF / DOCX
                        </div>
                      </div>

                      {/* SELECT RESUME Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            processUploadFlow(null)
                          }}
                          className="btn-tactile-dark-3d px-8 py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>SELECT RESUME →</span>
                        </button>
                      </div>

                      <div className="font-mono text-[10px] text-[#88857d] uppercase tracking-widest pt-2">
                        MAX 5MB / SINGLE DOCUMENT
                      </div>

                      <div className="font-sans text-[11px] text-[#66645e] flex items-center gap-1.5 pt-2">
                        <span>Your resume stays private and secure</span>
                        <FiLock size={12} className="text-[#88857d]" />
                      </div>
                    </div>
                  )}

                  {/* ── STATE 2: UPLOAD & PARSING PROGRESS ── */}
                  {uploadState === 'parsing' && (
                    <div className="w-full min-h-[340px] rounded-xl border border-[#111110] bg-[#F8F6F1] p-8 flex flex-col justify-between text-left space-y-6">
                      <div className="space-y-2">
                        <div className="font-mono text-[10px] font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                          <FiCpu size={14} className="animate-spin text-emerald-600" />
                          <span>RESUME UPLOADED</span>
                        </div>
                        <div className="font-mono font-black text-lg text-[#111110] uppercase truncate">
                          {uploadedFileName}
                        </div>
                      </div>

                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between text-[#111110] font-bold">
                          <span>PARSING RESUME</span>
                          <span>{parseProgress}%</span>
                        </div>
                        <div className="h-2 bg-[#efece4] border border-[#d5d2c8] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600 transition-all duration-300 rounded-full" style={{ width: `${parseProgress}%` }} />
                        </div>
                      </div>

                      <div className="space-y-2 font-mono text-xs border-t border-[#e2e0d6] pt-4">
                        <div className={`flex items-center gap-2 ${parsingStep >= 1 ? 'text-emerald-700 font-bold' : 'text-[#88857d]'}`}>
                          <span>✓</span> FILE RECEIVED
                        </div>
                        <div className={`flex items-center gap-2 ${parsingStep >= 2 ? 'text-emerald-700 font-bold' : 'text-[#88857d]'}`}>
                          <span>{parsingStep >= 2 ? '✓' : '○'}</span> DOCUMENT VALIDATED
                        </div>
                        <div className={`flex items-center gap-2 ${parsingStep >= 3 ? 'text-emerald-700 font-bold' : parsingStep === 2 ? 'text-[#111110] font-bold' : 'text-[#88857d]'}`}>
                          <span>{parsingStep >= 3 ? '✓' : '→'}</span> EXTRACTING CONTENT
                        </div>
                        <div className={`flex items-center gap-2 ${parsingStep >= 4 ? 'text-emerald-700 font-bold' : 'text-[#88857d]'}`}>
                          <span>{parsingStep >= 4 ? '✓' : '○'}</span> ANALYZING EXPERIENCE
                        </div>
                        <div className={`flex items-center gap-2 ${parsingStep >= 5 ? 'text-emerald-700 font-bold' : 'text-[#88857d]'}`}>
                          <span>{parsingStep >= 5 ? '✓' : '○'}</span> BUILDING PROFILE
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STATE 3: SUCCESS STATE (RESUME READY) ── */}
                  {uploadState === 'success' && (
                    <div className="w-full min-h-[340px] rounded-xl border border-emerald-300 bg-[#F8F6F1] p-8 flex flex-col justify-between text-left space-y-6 shadow-sm">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full font-mono text-xs font-bold text-emerald-800">
                          <FiCheckCircle size={14} />
                          <span>RESUME READY</span>
                        </div>

                        <div className="font-mono font-black text-xl text-[#111110] uppercase tracking-tight">
                          {uploadedFileName}
                        </div>
                        <p className="font-sans text-xs text-[#66645e]">
                          File successfully uploaded and indexed into AI intelligence system.
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setUploadState('dashboard')}
                          className="btn-tactile-dark-3d w-full py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>ANALYZE RESUME →</span>
                        </button>

                        <div className="font-mono text-[11px] text-[#88857d] text-center">
                          You can review your resume before analysis.
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* Bottom 3 Trust Badges */}
            <div className="border-t border-[#e2e0d6] pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs text-[#55534e]">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-9 h-9 rounded-lg bg-[#efece4] border border-[#d5d2c8] flex items-center justify-center text-[#111110] shrink-0">
                  <FiShield size={18} />
                </div>
                <div className="text-left space-y-0.5">
                  <div className="font-mono font-bold text-xs text-[#111110]">Your data is secure</div>
                  <div className="text-[11px] text-[#88857d]">256-bit encrypted</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start border-t md:border-t-0 md:border-l border-[#e2e0d6] pt-4 md:pt-0 md:pl-6">
                <div className="w-9 h-9 rounded-lg bg-[#efece4] border border-[#d5d2c8] flex items-center justify-center text-[#111110] shrink-0">
                  <FiFileText size={18} />
                </div>
                <div className="text-left space-y-0.5">
                  <div className="font-mono font-bold text-xs text-[#111110]">Supported formats</div>
                  <div className="text-[11px] text-[#88857d]">PDF, DOCX</div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start border-t md:border-t-0 md:border-l border-[#e2e0d6] pt-4 md:pt-0 md:pl-6">
                <div className="w-9 h-9 rounded-lg bg-[#efece4] border border-[#d5d2c8] flex items-center justify-center text-[#111110] shrink-0">
                  <FiTrash2 size={18} />
                </div>
                <div className="text-left space-y-0.5">
                  <div className="font-mono font-bold text-xs text-[#111110]">Files are private</div>
                  <div className="text-[11px] text-[#88857d]">We never share your data</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ════════ FULL ATS SCORE REPORT DASHBOARD ════════ */}
        {uploadState === 'dashboard' && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Top Action Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#e2e0d6] pb-4 gap-4 text-left">
              <div>
                <div className="font-mono text-xs font-bold text-[#88857d] uppercase tracking-[0.2em] mb-1">
                  // SYSTEM 02 / ATS REPORT
                </div>
                <h2 className="font-mono font-black text-2xl sm:text-3xl text-[#111110] tracking-tight uppercase">
                  ATS RESUME SCANNER & AUDITOR
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setUploadState('idle')}
                  className="btn-tactile-3d text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 font-mono font-bold cursor-pointer"
                >
                  <FiArrowLeft size={14} />
                  <span>UPLOAD DIFFERENT RESUME</span>
                </button>
              </div>
            </div>

            {/* ── ROW 1: RESUME PREVIEW | ATS SCORE | TARGET ROLE MATCH ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* RESUME PREVIEW */}
              <div className="lg:col-span-5 bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-6 space-y-4 shadow-sm relative text-left">
                <div className="font-mono text-xs font-bold text-[#66645e] uppercase tracking-wider">
                  RESUME PREVIEW
                </div>

                <div className="bg-[#F8F6F1] border border-[#e2e0d6] rounded-xl p-6 sm:p-7 space-y-4 font-sans text-xs text-[#33312c]">
                  <div className="space-y-1 border-b border-[#e2e0d6] pb-3">
                    <h3 className="font-mono font-black text-xl text-[#111110] tracking-tight">
                      PRAKASH DAS
                    </h3>
                    <div className="font-mono text-[11px] font-bold text-emerald-700 tracking-wider uppercase">
                      FULL STACK DEVELOPER
                    </div>
                    <div className="font-sans text-[11px] text-[#66645e] flex flex-wrap gap-2 pt-0.5">
                      <span>✉ prakashdas@email.com</span>
                      <span>• 📞 +91 98765 43210</span>
                      <span>• 📍 Bangalore, India</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono font-bold text-[10px] uppercase text-[#88857d] tracking-widest">
                      SUMMARY
                    </div>
                    <p className="leading-relaxed text-[11px] text-[#44423d]">
                      Full Stack Developer with 3+ years of experience building scalable web applications using the MERN stack. Passionate about clean code, system design and delivering great user experiences.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-mono font-bold text-[10px] uppercase text-[#88857d] tracking-widest">
                      EXPERIENCE
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline font-mono text-[11px] font-bold text-[#111110]">
                        <span>Software Engineer • <span className="font-normal text-[#66645e]">ABC Technologies</span></span>
                        <span className="text-[10px] text-[#88857d]">Jan 2022 – Present</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-[10px] text-[#55534e] leading-relaxed">
                        <li>Built and maintained scalable web applications using React, Node.js and MongoDB.</li>
                        <li>Designed RESTful APIs and integrated third-party services.</li>
                        <li>Improved application performance and fixed critical bugs.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-mono font-bold text-[10px] uppercase text-[#88857d] tracking-widest">
                      SKILLS
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS', 'Git', 'AWS', 'Docker'].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-[#efece4] border border-[#d5d2c8] rounded font-mono text-[10px] text-[#111110]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 border-t border-[#e2e0d6] pt-3">
                    <div className="font-mono font-bold text-[10px] uppercase text-[#88857d] tracking-widest">
                      EDUCATION
                    </div>
                    <div className="font-mono text-[10px] text-[#33312c]">
                      B.Tech in Computer Science • Techno India University (2017 – 2021)
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[11px] text-[#66645e] pt-1 px-1">
                  <div className="flex items-center gap-1.5 uppercase font-semibold text-[#111110]">
                    <FiFileText size={14} />
                    <span>PRAKASH_DAS_RESUME.PDF</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <FiCheckCircle size={13} />
                    <span>Upload complete</span>
                  </div>
                </div>
              </div>

              {/* ATS SCORE & TARGET ROLE MATCH */}
              <div className="lg:col-span-7 space-y-8 text-left">
                
                {/* ATS SCORE CARD */}
                <div className="bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-6 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#e2e0d6] pb-3">
                    <div className="font-mono text-xs font-bold text-[#66645e] uppercase tracking-wider">
                      ATS SCORE
                    </div>
                    <div className="font-mono text-[11px] text-[#88857d] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Analyzed just now</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-5 flex flex-col items-center justify-center space-y-2">
                      <AtsGauge score={84} />
                      <span className="px-3 py-1 bg-[#F8F6F1] border border-[#d5d2c8] rounded-full font-mono text-[10px] font-bold text-emerald-700">
                        +12% from last analysis ↑
                      </span>
                    </div>

                    <div className="sm:col-span-7 space-y-3.5 font-mono text-xs">
                      <div>
                        <div className="flex justify-between text-[#111110] font-semibold mb-1">
                          <span>Keyword Match</span>
                          <span>92%</span>
                        </div>
                        <div className="h-2 bg-[#d5d2c8] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#111110] font-semibold mb-1">
                          <span>Formatting</span>
                          <span>88%</span>
                        </div>
                        <div className="h-2 bg-[#d5d2c8] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: '88%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#111110] font-semibold mb-1">
                          <span>Skills Relevance</span>
                          <span>81%</span>
                        </div>
                        <div className="h-2 bg-[#d5d2c8] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: '81%' }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[#111110] font-semibold mb-1">
                          <span>Experience Relevance</span>
                          <span>76%</span>
                        </div>
                        <div className="h-2 bg-[#d5d2c8] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: '76%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F8F6F1] border border-[#e2e0d6] rounded-xl p-4 flex items-start gap-3">
                    <HiSparkles size={18} className="text-[#111110] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-mono text-xs font-bold text-[#111110] uppercase tracking-wider">
                        AI Summary
                      </div>
                      <p className="font-sans text-xs text-[#55534e] leading-relaxed">
                        "Your resume is well-structured and contains relevant skills. Improve technical depth and add more impact-driven points."
                      </p>
                    </div>
                  </div>
                </div>

                {/* TARGET ROLE MATCH CARD */}
                <div className="bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-6 space-y-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#e2e0d6] pb-3">
                    <div className="font-mono text-xs font-bold text-[#66645e] uppercase tracking-wider">
                      TARGET ROLE MATCH
                    </div>
                    <div className="relative">
                      <select
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        className="appearance-none bg-[#F8F6F1] border border-[#d5d2c8] rounded-xl px-4 py-1.5 pr-8 font-mono text-xs font-bold text-[#111110] focus:outline-none cursor-pointer"
                      >
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                      </select>
                      <FiChevronDown size={14} className="absolute right-2.5 top-2.5 text-[#66645e] pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-6 space-y-2">
                      <div className="font-mono font-black text-4xl sm:text-5xl text-[#111110]">
                        81%
                      </div>
                      <div className="font-mono text-xs font-bold text-[#66645e] uppercase tracking-wider">
                        Overall Match
                      </div>
                      <div className="h-2 bg-[#d5d2c8] rounded-full overflow-hidden w-full max-w-xs mt-2">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '81%' }} />
                      </div>
                      <p className="font-sans text-[11px] text-[#66645e] pt-2">
                        Good match! You are eligible for most of the required skills.
                      </p>
                    </div>

                    <div className="sm:col-span-6 space-y-2 font-mono text-xs">
                      {[
                        { name: 'React', status: 'pass' },
                        { name: 'Node.js', status: 'pass' },
                        { name: 'MongoDB', status: 'pass' },
                        { name: 'Docker', status: 'pass' },
                        { name: 'AWS', status: 'warn' },
                        { name: 'System Design', status: 'warn' },
                        { name: 'Kubernetes', status: 'fail' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-0.5 border-b border-[#e2e0d6]/60">
                          <span className="text-[#33312c] font-semibold">{item.name}</span>
                          {item.status === 'pass' && (
                            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">
                              ✓
                            </div>
                          )}
                          {item.status === 'warn' && (
                            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">
                              !
                            </div>
                          )}
                          {item.status === 'fail' && (
                            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px]">
                              ✕
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* ── ROW 2: STRENGTHS | GAPS TO IMPROVE | KEYWORDS FOUND ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch text-left">
              
              <div className="bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e2e0d6] pb-3">
                  <div className="font-mono text-xs font-bold text-[#111110] uppercase tracking-wider flex items-center gap-2">
                    <span>STRENGTHS</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Strong use of technical keywords', subtitle: 'Well optimized for ATS.' },
                    { title: 'Good skills relevance', subtitle: 'Your skills match the target role.' },
                    { title: 'Clear experience section', subtitle: 'Easy to read and well-structured.' },
                    { title: 'Proper formatting', subtitle: 'Clean layout with proper sections.' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border border-emerald-600 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <FiCheck size={12} />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-mono text-xs font-bold text-[#111110]">{item.title}</div>
                        <div className="font-sans text-[11px] text-[#66645e]">{item.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e2e0d6] pb-3">
                  <div className="font-mono text-xs font-bold text-[#111110] uppercase tracking-wider flex items-center gap-2">
                    <span>GAPS TO IMPROVE</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Lack of metrics', subtitle: 'Add quantifiable impact in experience.' },
                    { title: 'System Design exposure', subtitle: 'Add more system design related projects.' },
                    { title: 'Cloud experience', subtitle: 'Include AWS/GCP related experience.' },
                    { title: 'Advanced Technical Skills', subtitle: 'Consider adding Redis, Kafka, etc.' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border border-amber-600 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                        <FiAlertCircle size={12} />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-mono text-xs font-bold text-[#111110]">{item.title}</div>
                        <div className="font-sans text-[11px] text-[#66645e]">{item.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="flex items-center justify-between border-b border-[#e2e0d6] pb-3">
                  <div className="font-mono text-xs font-bold text-[#111110] uppercase tracking-wider">
                    KEYWORDS FOUND
                  </div>
                  <div className="font-mono text-xs font-bold text-[#66645e]">
                    24/32
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {[
                    { name: 'JavaScript', found: true },
                    { name: 'React', found: true },
                    { name: 'Node.js', found: true },
                    { name: 'MongoDB', found: true },
                    { name: 'Express.js', found: true },
                    { name: 'REST API', found: true },
                    { name: 'AWS', found: false },
                    { name: 'Docker', found: false },
                    { name: 'Kubernetes', found: false },
                    { name: 'Redis', found: false },
                    { name: 'GraphQL', found: false }
                  ].map((kw, i) => (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-xl border flex items-center justify-between ${
                        kw.found
                          ? 'bg-[#F8F6F1] border-[#d5d2c8] text-[#111110]'
                          : 'bg-[#e8e5db] border-[#d0cdc2] text-[#88857d]'
                      }`}
                    >
                      <span className="truncate">{kw.name}</span>
                      {kw.found ? (
                        <FiCheck size={13} className="text-emerald-600 shrink-0 ml-1" />
                      ) : (
                        <span className="text-red-500 font-bold shrink-0 ml-1">✕</span>
                      )}
                    </div>
                  ))}
                  <div className="px-3 py-2 rounded-xl border border-dashed border-[#b5b2a8] text-[#88857d] flex items-center justify-center font-bold">
                    +12 more
                  </div>
                </div>
              </div>

            </div>

            {/* ── ROW 3: AI IMPROVEMENT SUGGESTIONS ── */}
            <div className="bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-6 space-y-6 shadow-sm text-left">
              <div className="font-mono text-xs font-bold text-[#66645e] uppercase tracking-wider border-b border-[#e2e0d6] pb-3">
                AI IMPROVEMENT SUGGESTIONS
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-3 bg-[#F8F6F1] border border-[#e2e0d6] rounded-xl p-5 space-y-2">
                  <div className="font-mono text-[10px] font-bold text-[#88857d] uppercase tracking-widest">
                    CURRENT
                  </div>
                  <p className="font-sans text-xs text-[#55534e] leading-relaxed">
                    "{report.suggestion.current}"
                  </p>
                </div>

                <div className="hidden lg:flex lg:col-span-1 items-center justify-center text-[#88857d]">
                  <FiArrowRight size={24} />
                </div>

                <div className="lg:col-span-5 bg-[#F8F6F1] border border-emerald-200 rounded-xl p-5 space-y-2 shadow-sm">
                  <div className="font-mono text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                    AI SUGGESTION
                  </div>
                  <p className="font-sans text-xs text-[#111110] leading-relaxed">
                    Engineered a full-stack job portal using the{' '}
                    <span className="bg-emerald-100 text-emerald-900 font-bold px-1 rounded">MERN stack</span> with{' '}
                    <span className="bg-emerald-100 text-emerald-900 font-bold px-1 rounded">role-based authentication</span>,{' '}
                    <span className="bg-emerald-100 text-emerald-900 font-bold px-1 rounded">RESTful APIs</span> and optimized{' '}
                    <span className="bg-emerald-100 text-emerald-900 font-bold px-1 rounded">MongoDB</span> schemas resulting in{' '}
                    <span className="bg-emerald-100 text-emerald-900 font-bold px-1 rounded">40% faster performance</span>.
                  </p>
                </div>

                <div className="lg:col-span-3 space-y-4">
                  <div className="space-y-1.5 font-mono text-[11px] text-[#33312c]">
                    <div className="font-bold text-[#88857d] uppercase tracking-widest mb-1">IMPACT</div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <FiCheckCircle size={13} /> More specific
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <FiCheckCircle size={13} /> Quantifiable
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <FiCheckCircle size={13} /> ATS Optimized
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <FiCheckCircle size={13} /> Stronger Impact
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSuggestionApplied(true)}
                    className="btn-tactile-dark-3d w-full text-xs py-3 rounded-xl uppercase font-mono font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{suggestionApplied ? 'SUGGESTION APPLIED ✓' : 'APPLY SUGGESTION'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ── ROW 4: WHAT'S NEXT? ── */}
            <div className="space-y-4 pt-4 text-left">
              <div className="font-mono text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
                // WHAT'S NEXT?
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
                    <FiCheckCircle size={20} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-mono text-xs font-bold text-[#111110]">
                      Resume Optimized
                    </div>
                    <div className="font-sans text-[11px] text-[#66645e]">
                      Your resume is ready to apply.
                    </div>
                  </div>
                </div>

                <Link
                  to="/interview"
                  className="no-underline bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-[#111110] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#d5d2c8] text-[#111110] flex items-center justify-center shrink-0 group-hover:bg-[#111110] group-hover:text-white transition-colors">
                    <FiMessageSquare size={20} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-mono text-xs font-bold text-[#111110] flex items-center gap-1">
                      <span>AI Interview</span>
                      <FiArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="font-sans text-[11px] text-[#66645e]">
                      Practice interviews based on your profile.
                    </div>
                  </div>
                </Link>

                <Link
                  to="/roadmap"
                  className="no-underline bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-[#111110] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#d5d2c8] text-[#111110] flex items-center justify-center shrink-0 group-hover:bg-[#111110] group-hover:text-white transition-colors">
                    <FiCompass size={20} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-mono text-xs font-bold text-[#111110] flex items-center gap-1">
                      <span>Career Roadmap</span>
                      <FiArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="font-sans text-[11px] text-[#66645e]">
                      Get a personalized learning path.
                    </div>
                  </div>
                </Link>

                <Link
                  to="/analytics"
                  className="no-underline bg-[#efece4] border border-[#e2e0d6] rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-[#111110] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#d5d2c8] text-[#111110] flex items-center justify-center shrink-0 group-hover:bg-[#111110] group-hover:text-white transition-colors">
                    <FiBarChart2 size={20} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-mono text-xs font-bold text-[#111110] flex items-center gap-1">
                      <span>Track Progress</span>
                      <FiArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="font-sans text-[11px] text-[#66645e]">
                      Improve and grow continuously.
                    </div>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default ResumeSection
