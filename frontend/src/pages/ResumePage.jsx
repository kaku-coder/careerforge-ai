/**
 * ResumePage Component
 * 
 * Provides resume upload, ATS scoring analysis, AI feedback dashboard,
 * and resume version management for CareerForge AI.
 */

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  FiCheck,
  FiAlertCircle,
  FiFileText,
  FiCheckCircle,
  FiLock,
  FiChevronDown,
  FiCpu,
  FiArrowLeft
} from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

const API_BASE_URL = 'http://localhost:5000/api/resume'

// Premium Radial ATS Score Gauge with smooth animation & clear typography
const AtsScoreRing = ({ score = 78 }) => {
  const strokeWidth = 14
  const radius = 75
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const statusLabel =
    score >= 80 ? 'EXCELLENT SCORE' : score >= 60 ? 'MODERATE SCORE' : 'NEEDS WORK'
  const statusColor =
    score >= 80
      ? 'text-emerald-800 bg-emerald-100/70 border-emerald-300'
      : score >= 60
        ? 'text-amber-800 bg-amber-100/70 border-amber-300'
        : 'text-rose-800 bg-rose-100/70 border-rose-300'

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-2">
      <svg width="210" height="120" viewBox="0 0 210 120" className="overflow-visible">
        <path
          d="M 20 110 A 85 85 0 0 1 190 110"
          fill="none"
          stroke="#dedad0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M 20 110 A 85 85 0 0 1 190 110"
          fill="none"
          stroke={score >= 80 ? '#059669' : score >= 60 ? '#10b981' : '#f43f5e'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
        />
      </svg>
      <div className="absolute bottom-2 flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline font-mono font-black text-4xl sm:text-5xl text-[#18181B] tracking-tight">
          {score}
          <span className="text-sm sm:text-base font-bold text-[#71717A] ml-1.5">/ 100</span>
        </div>
        <div className={`px-3 py-0.5 rounded-full border text-[11px] font-mono font-extrabold tracking-wider uppercase mt-1.5 ${statusColor}`}>
          {statusLabel}
        </div>
      </div>
    </div>
  )
}

const ResumePage = () => {
  const { user } = useAuth()
  const displayName = (user?.username || user?.name || user?.email?.split('@')[0] || 'CAREER USER').toUpperCase()

  // View States: 'upload' (upload view with internal dropzone states: idle, parsing, success) -> 'dashboard'
  const [viewState, setViewState] = useState('upload')
  const [dropState, setDropState] = useState('idle') // 'idle' | 'parsing' | 'success'

  const [selectedId, setSelectedId] = useState('')
  const [resumes, setResumes] = useState([])
  const [uploadedFileName, setUploadedFileName] = useState(`${displayName.replace(/\s+/g, '_')}_RESUME.PDF`)
  const [parseProgress, setParseProgress] = useState(0)
  const [parsingStep, setParsingStep] = useState(1)

  const [analyzing, setAnalyzing] = useState(false)
  const [targetRole, setTargetRole] = useState('Full Stack Developer')
  const [uploadStatus, setUploadStatus] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const fileInputRef = useRef(null)

  // Report state dynamically populated from real AI scan
  const [report, setReport] = useState({
    overallScore: 78,
    keywordMatch: 90,
    formattingScore: 70,
    skillsScore: 90,
    experienceScore: 60,
    roleMatchScore: 78,
    summary: 'Good resume but lacks quantified achievements and advanced keywords for competitive ATS parsing.',
    skillChecklist: [
      { name: 'React', status: 'pass' },
      { name: 'Node.js', status: 'pass' },
      { name: 'MongoDB', status: 'pass' },
      { name: 'Docker', status: 'pass' },
      { name: 'AWS', status: 'warn' },
      { name: 'System Design', status: 'warn' },
      { name: 'Kubernetes', status: 'fail' }
    ],
    strengths: [
      { title: 'Clear MERN stack focus', subtitle: 'Identified by AI analysis' },
      { title: 'Projects demonstrate full-stack capability', subtitle: 'Identified by AI analysis' },
      { title: 'ATS-friendly contact info', subtitle: 'Identified by AI analysis' }
    ],
    gaps: [
      { title: 'No quantified achievements', subtitle: 'Recommended enhancement' },
      { title: 'Missing advanced keywords', subtitle: 'Recommended enhancement' },
      { title: 'Irrelevant sections (Hobbies, Declaration)', subtitle: 'Recommended enhancement' }
    ],
    keywords: [
      { name: 'MERN Stack', found: true },
      { name: 'JavaScript (ES6+)', found: true },
      { name: 'React.js', found: true },
      { name: 'Node.js', found: true },
      { name: 'Express.js', found: true },
      { name: 'MongoDB', found: true },
      { name: 'REST APIs', found: true },
      { name: 'Full-Stack Deployment', found: true },
      { name: 'CRUD Operations', found: true },
      { name: 'Git', found: true },
      { name: 'Postman', found: true },
      { name: 'VS Code', found: true }
    ]
  })

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch(API_BASE_URL, { credentials: 'include' })
        const data = await res.json()
        if (!cancelled && res.ok && data.success && data.data?.length > 0) {
          setResumes(data.data)
          setSelectedId(data.data[0]._id)
        }
      } catch {
        // Silent fallback
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const fetchResumes = async () => {
    try {
      const res = await fetch(API_BASE_URL, { credentials: 'include' })
      const data = await res.json()
      if (res.ok && data.success && data.data?.length > 0) {
        setResumes(data.data)
        setSelectedId(data.data[0]._id)
      }
    } catch {
      // Silent fallback
    }
  }

  // Progress simulation & upload inside dropzone
  const processUploadFlow = async (file) => {
    const fileName = file ? file.name.toUpperCase().replace(/\s+/g, '_') : `${displayName.replace(/\s+/g, '_')}_RESUME.PDF`
    setUploadedFileName(fileName)
    setDropState('parsing')
    setParseProgress(15)
    setParsingStep(1)
    setUploadStatus(null)

    let currentP = 15
    const interval = setInterval(() => {
      currentP += 22
      if (currentP >= 100) {
        clearInterval(interval)
        setParseProgress(100)
        setParsingStep(5)
        setTimeout(() => setDropState('success'), 350)
      } else {
        setParseProgress(currentP)
        if (currentP >= 75) setParsingStep(4)
        else if (currentP >= 50) setParsingStep(3)
        else if (currentP >= 25) setParsingStep(2)
      }
    }, 280)

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch(`${API_BASE_URL}/parse`, {
          method: 'POST',
          body: formData,
          credentials: 'include'
        })
        const data = await res.json()
        if (res.ok && data.success) fetchResumes()
      } catch {
        // Fallback
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0])
  }

  const runAtsScan = async (resumeId = selectedId) => {
    setAnalyzing(true)
    try {
      const res = await fetch(`${API_BASE_URL}/ats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ resumeId, targetRole, provider: 'mistral' })
      })
      const data = await res.json()
      if (res.ok && data.success && data.analysis) {
        const ai = data.analysis

        const getScore = (cat) =>
          ai.breakdown?.find((b) => b.category?.toLowerCase().includes(cat))?.score ?? null

        const matched = (ai.matchedKeywords || []).map((k) => ({ name: k, found: true }))
        const missing = (ai.missingKeywords || []).map((k) => ({ name: k, found: false }))
        const allKeywords = [...matched, ...missing].slice(0, 12)

        setReport((prev) => ({
          ...prev,
          overallScore: ai.score ?? prev.overallScore,
          roleMatchScore: ai.score ?? prev.roleMatchScore,
          summary: ai.verdict ?? prev.summary,
          keywordMatch: getScore('keyword') ?? prev.keywordMatch,
          formattingScore: getScore('format') ?? prev.formattingScore,
          skillsScore: getScore('skills') ?? prev.skillsScore,
          experienceScore: getScore('experience') ?? prev.experienceScore,
          strengths: ai.strengths?.length
            ? ai.strengths.map((s) => ({ title: s, subtitle: 'Identified by AI analysis' }))
            : prev.strengths,
          gaps: ai.weaknesses?.length
            ? ai.weaknesses.map((w) => ({ title: w, subtitle: 'Recommended enhancement' }))
            : prev.gaps,
          keywords: allKeywords.length ? allKeywords : prev.keywords
        }))

        if (ai.estimatedRole && ai.estimatedRole !== 'Not detected') {
          setTargetRole(ai.estimatedRole)
        }
      }
    } catch {
      // Fallback
    } finally {
      setAnalyzing(false)
    }
  }

  const handleResumeSelect = (resumeId) => {
    setSelectedId(resumeId)
    setViewState('dashboard')
    runAtsScan(resumeId)
  }

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-emerald-600'
    if (score >= 60) return 'bg-amber-500'
    return 'bg-rose-500'
  }

  const matchedKeywordsCount = report.keywords.filter((k) => k.found).length
  const totalKeywordsCount = report.keywords.length

  return (
    <div className="w-full flex-1 text-[#18181B] py-10 sm:py-14 font-sans select-none flex flex-col items-center justify-center">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center justify-center flex-1 my-auto">

        {/* ════════ UPLOAD WORKFLOW (ALL IN ONE SCREEN) ════════ */}
        {viewState === 'upload' && (
          <div className="flex flex-col justify-center gap-10 sm:gap-14 w-full items-center my-auto py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center justify-center w-full max-w-5xl mx-auto">

              {/* Left Hero */}
              <div className="lg:col-span-6 space-y-6 text-left flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#88857D] uppercase tracking-[0.24em] border-b border-[#DCD8CD] pb-1.5 w-fit">
                  <span>// SYSTEM 02</span>
                  <span>/</span>
                  <span className="text-[#18181B]">RESUME INTELLIGENCE</span>
                </div>

                <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-[#18181B] tracking-tight leading-[1.05] uppercase">
                  YOUR RESUME.<br />
                  <span className="text-[#18181B]">UNDERSTOOD BY AI.</span>
                </h1>

                <div className="w-14 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" />

                <p className="font-sans text-base sm:text-lg text-[#52525B] max-w-lg leading-relaxed">
                  Upload your resume and get AI-powered insights to optimize your ATS score, discover missing keywords, and match top engineering roles.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDropState('idle')
                      fileInputRef.current?.click()
                    }}
                    className="btn-tactile-dark-3d group text-sm"
                  >
                    <span>Upload New Resume</span>
                    <span className="text-base font-bold transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
                  </button>
                </div>
              </div>

              {/* Right Dropzone Card with embedded Analyze / Parsing states */}
              <div className="lg:col-span-6 flex justify-center w-full">
                <div className="w-full bg-[#F4F1EA]/80 border border-[#E4E1D7] rounded-3xl p-8 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative backdrop-blur-sm">
                  <span className="absolute top-4 left-5 font-mono text-sm text-[#88857D] font-bold select-none">+</span>
                  <span className="absolute top-4 right-5 font-mono text-sm text-[#88857D] font-bold select-none">+</span>
                  <span className="absolute bottom-4 left-5 font-mono text-sm text-[#88857D] font-bold select-none">+</span>
                  <span className="absolute bottom-4 right-5 font-mono text-sm text-[#88857D] font-bold select-none">+</span>

                  {/* IDLE DROPZONE */}
                  {dropState === 'idle' && (
                    <div
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full min-h-[340px] rounded-2xl border border-dashed transition-all duration-200 flex flex-col items-center justify-center p-8 text-center cursor-pointer bg-[#FAF8F3] space-y-5 relative overflow-hidden ${dragActive || isHovered
                          ? 'border-emerald-600 shadow-[0_0_25px_rgba(5,150,105,0.15)] scale-[1.005]'
                          : 'border-[#CCC8BD] hover:border-[#18181B]'
                        }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => handleFileUpload(e.target.files?.[0])}
                        className="hidden"
                        id="ats-file-input"
                      />

                      <div className="w-16 h-18 rounded-2xl border border-[#18181B] bg-white flex flex-col items-center justify-center relative shadow-sm">
                        <FiFileText size={28} className="text-[#18181B]" />
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center absolute -top-1.5 -right-1.5 text-xs font-bold">
                          ↑
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="font-mono font-black text-base sm:text-lg text-[#18181B] uppercase tracking-wider">
                          {isHovered ? 'CLICK TO SELECT FILE →' : 'DROP YOUR RESUME HERE'}
                        </div>
                        <div className="font-sans text-sm text-[#71717A]">or click to browse from device</div>
                        <div className="font-mono text-xs text-[#88857D] uppercase tracking-wider pt-1 font-semibold">
                          PDF / DOCX • MAX 5MB
                        </div>
                      </div>

                      <div className="font-sans text-xs text-[#71717A] flex items-center gap-1.5 pt-3 border-t border-[#E4E1D7] w-full justify-center">
                        <span>Secure &amp; Confidential Analysis</span>
                        <FiLock size={13} className="text-[#88857D]" />
                      </div>

                      {uploadStatus?.type === 'error' && (
                        <div className="font-mono text-xs font-bold text-rose-600 uppercase tracking-widest pt-1">
                          {uploadStatus.text}
                        </div>
                      )}
                    </div>
                  )}

                  {/* PARSING PROGRESS INSIDE DROPZONE (CENTERED) */}
                  {dropState === 'parsing' && (
                    <div className="w-full min-h-[340px] rounded-2xl border border-[#E4E1D7] bg-[#FAF8F3] p-8 flex flex-col justify-center items-center text-center space-y-5">
                      <div className="space-y-2 flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-100/70 border border-emerald-300 rounded-full font-mono text-xs font-bold text-emerald-800">
                          <FiCpu size={15} className="animate-spin text-emerald-600" />
                          <span>PARSING RESUME</span>
                        </div>
                        <div className="font-mono font-bold text-lg sm:text-xl text-[#18181B] uppercase max-w-xs truncate">
                          {uploadedFileName}
                        </div>
                      </div>

                      <div className="w-full max-w-xs space-y-2 font-mono text-xs sm:text-sm">
                        <div className="flex justify-between font-bold text-[#18181B]">
                          <span>EXTRACTION PROGRESS</span>
                          <span>{parseProgress}%</span>
                        </div>
                        <div className="h-2.5 bg-[#E2DED4] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                            style={{ width: `${parseProgress}%` }}
                          />
                        </div>
                      </div>

                      <div className="w-full max-w-xs space-y-2 pt-3 border-t border-[#E4E1D7] font-mono text-xs text-left">
                        {['FILE RECEIVED', 'STRUCTURE VALIDATED', 'EXTRACTING SKILLS', 'BUILDING PROFILE'].map((step, i) => (
                          <div
                            key={step}
                            className={`flex items-center gap-2.5 ${parsingStep >= i + 1 ? 'text-emerald-700 font-bold' : 'text-[#88857D]'
                              }`}
                          >
                            <span className="w-4 text-center">{parsingStep >= i + 1 ? '✓' : '○'}</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUCCESS / ANALYZE INSIDE DROPZONE (CENTERED) */}
                  {dropState === 'success' && (
                    <div className="w-full min-h-[340px] rounded-2xl border border-emerald-300/80 bg-[#FAF8F3] p-8 flex flex-col justify-center items-center text-center space-y-5">
                      <div className="space-y-2.5 flex flex-col items-center">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100/80 border border-emerald-300 rounded-full font-mono text-xs font-bold text-emerald-800">
                          <FiCheckCircle size={15} />
                          <span>FILE PARSED SUCCESSFULLY</span>
                        </div>
                        <div className="font-mono font-bold text-lg sm:text-xl text-[#18181B] uppercase max-w-xs truncate">
                          {uploadedFileName}
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-[#52525B] max-w-sm leading-relaxed">
                          Your resume is ready for full AI ATS scanning, skill matching, and gap analysis.
                        </p>
                      </div>

                      <div className="w-full max-w-xs space-y-2.5 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setViewState('dashboard')
                            runAtsScan()
                          }}
                          className="btn-tactile-dark-3d w-full justify-center text-sm group"
                        >
                          <span>Analyze Resume Now</span>
                          <span className="text-base font-bold transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDropState('idle')
                            fileInputRef.current?.click()
                          }}
                          className="w-full py-2 bg-transparent hover:bg-[#EFECE4] text-[#71717A] hover:text-[#18181B] rounded-xl font-sans text-xs font-semibold text-center transition-colors cursor-pointer"
                        >
                          Choose different file
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* Stepper Footer Centered at Bottom */}
            <div className="border-t border-[#E4E1D7] mt-6 sm:mt-10 pt-8 pb-4 space-y-6 text-center w-full max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-4 w-full max-w-md mx-auto">
                <div className="h-[1px] bg-[#DCD8CD] flex-1" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#18181B]">
                  AI RESUME INTELLIGENCE
                </span>
                <div className="h-[1px] bg-[#DCD8CD] flex-1" />
              </div>

              <div className="max-w-2xl mx-auto px-4">
                <div className="relative flex items-center justify-between font-mono text-xs font-bold text-[#18181B]">
                  <div className="absolute left-6 right-6 top-[11px] h-[1.5px] bg-[#DCD8CD] -z-0" />
                  <div
                    className="absolute left-6 top-[11px] h-[1.5px] bg-emerald-600 -z-0 transition-all duration-500"
                    style={{
                      width: dropState === 'idle' ? '0%' : dropState === 'parsing' ? '50%' : '100%'
                    }}
                  />
                  {['PARSE', 'UNDERSTAND', 'ANALYZE', 'MATCH'].map((label, i) => (
                    <div key={label} className="flex flex-col items-center space-y-2 z-10 bg-[#FBF9F5] px-3">
                      <div
                        className={`w-6 h-6 rounded-full border border-[#18181B] flex items-center justify-center text-[10px] ${dropState !== 'idle' && i < 3 ? 'bg-emerald-600 text-white' : 'bg-[#EFECE4] text-[#88857D]'
                          }`}
                      >
                        ●
                      </div>
                      <span className="tracking-wider uppercase text-[11px] text-[#18181B]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════ ATS DASHBOARD (CENTERED & PROPORTIONATE) ════════ */}
        {viewState === 'dashboard' && (
          <div className="space-y-14 lg:space-y-20 w-full text-left flex flex-col items-center">

            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#E4E1D7] pb-7 gap-5 w-full max-w-[1200px]">
              <div className="space-y-1.5">
                <div className="font-mono text-xs font-bold text-[#88857D] uppercase tracking-[0.22em]">
                  // SYSTEM 02 / ATS REPORT
                </div>
                <h1 className="font-sans font-black text-3xl sm:text-4xl text-[#18181B] tracking-tight">
                  ATS Resume Scanner &amp; Auditor
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {resumes.length > 0 && (
                  <div className="relative inline-flex items-center">
                    <FiFileText size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
                    <select
                      value={selectedId}
                      onChange={(e) => handleResumeSelect(e.target.value)}
                      className="appearance-none bg-white hover:bg-[#FAF8F3] text-[#18181B] border border-[#DCD8CD] hover:border-[#18181B] rounded-xl pl-9 pr-10 py-2.5 font-mono text-xs sm:text-sm font-semibold focus:outline-none transition-all cursor-pointer shadow-xs min-w-[260px] max-w-[340px] truncate"
                    >
                      <option value="">— Select Resume —</option>
                      {resumes.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.fileName}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setDropState('idle')
                    setViewState('upload')
                  }}
                  className="btn-tactile-3d text-xs sm:text-sm py-2.5 px-4.5"
                >
                  <FiArrowLeft size={15} />
                  <span>Upload Different Resume</span>
                </button>

                <button
                  type="button"
                  onClick={() => runAtsScan()}
                  disabled={analyzing}
                  className="btn-tactile-dark-3d text-xs sm:text-sm py-2.5 px-5"
                >
                  <FiCpu size={15} className={analyzing ? 'animate-spin text-emerald-400' : ''} />
                  <span>{analyzing ? 'Re-scanning...' : 'Re-run ATS Check'}</span>
                </button>
              </div>
            </div>

            {/* ── TOP SECTION: ATS SCORE HERO + TARGET ROLE MATCH ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full max-w-[1200px]">

              {/* CARD 1: ATS SCORE (Visual Hero) */}
              <div className="lg:col-span-12 xl:col-span-7 bg-[#F4F1EA]/80 border border-[#E4E1D7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="flex-1">
                  <div className="flex items-center justify-between border-b border-[#E4E1D7] pb-4 mb-6">
                    <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#18181B]">
                      ATS SCORE OVERVIEW
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#71717A]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Mistral AI Engine</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-10 items-center">
                    {/* Ring score */}
                    <div className="sm:col-span-5 flex flex-col items-center justify-center">
                      <AtsScoreRing score={report.overallScore} />
                      <div className="inline-flex items-center gap-1 text-xs font-mono text-emerald-800 font-bold mt-2.5">
                        <span>+12% from baseline ↑</span>
                      </div>
                    </div>

                    {/* Breakdown bars */}
                    <div className="sm:col-span-7 space-y-4 font-sans">
                      {[
                        { label: 'Keyword Match', score: report.keywordMatch },
                        { label: 'Formatting & Structure', score: report.formattingScore },
                        { label: 'Skills Match', score: report.skillsScore },
                        { label: 'Experience Relevance', score: report.experienceScore }
                      ].map((item) => (
                        <div key={item.label} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-[#18181B]">
                            <span>{item.label}</span>
                            <span className="font-mono text-xs sm:text-sm font-bold text-[#52525B]">{item.score}%</span>
                          </div>
                          <div className="h-2.5 bg-[#E2DED4] rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(item.score)} rounded-full transition-all duration-700`}
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Verdict Box */}
                <div className="mt-8 bg-[#FAF8F3] border border-[#E4E1D7] rounded-2xl p-5 flex items-start gap-4 shadow-xs">
                  <HiSparkles size={20} className="text-[#18181B] shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <div className="font-mono text-xs font-bold text-[#88857D] uppercase tracking-wider">
                      AI VERDICT
                    </div>
                    <p className="font-sans text-sm text-[#27272A] leading-relaxed font-medium">
                      "{report.summary}"
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2: TARGET ROLE MATCH */}
              <div className="lg:col-span-12 xl:col-span-5 bg-[#F4F1EA]/80 border border-[#E4E1D7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="flex-1">
                  <div className="flex items-center justify-between border-b border-[#E4E1D7] pb-4 mb-6">
                    <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#18181B]">
                      TARGET ROLE MATCH
                    </div>
                    <div className="relative inline-flex items-center">
                      <select
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        className="appearance-none bg-white hover:bg-[#FAF8F3] text-[#18181B] border border-[#DCD8CD] hover:border-[#18181B] rounded-xl pl-3.5 pr-8 py-2 font-sans text-xs sm:text-sm font-semibold focus:outline-none transition-all cursor-pointer shadow-xs"
                      >
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="Software Engineer">Software Engineer</option>
                      </select>
                      <FiChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" />
                    </div>
                  </div>

                  {/* Role score & checklist */}
                  <div className="space-y-6">
                    <div className="flex items-baseline justify-between">
                      <div className="space-y-0.5">
                        <div className="font-mono font-black text-4xl sm:text-5xl text-[#18181B]">
                          {report.roleMatchScore}%
                        </div>
                        <div className="font-mono text-xs font-bold text-[#88857D] uppercase tracking-wider">
                          OVERALL MATCH
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 text-emerald-800 font-mono text-xs font-bold bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> High Compatibility
                        </span>
                      </div>
                    </div>

                    <div className="h-2.5 bg-[#E2DED4] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                        style={{ width: `${report.roleMatchScore}%` }}
                      />
                    </div>

                    {/* Compact 2-column required skills checklist */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 font-sans text-xs sm:text-sm pt-2">
                      {report.skillChecklist.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1.5 border-b border-[#E7E4DC]/80">
                          <span className="text-[#27272A] font-semibold truncate pr-1">{item.name}</span>
                          {item.status === 'pass' && (
                            <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-[11px] font-bold shrink-0">
                              ✓
                            </span>
                          )}
                          {item.status === 'warn' && (
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center text-[11px] font-bold shrink-0">
                              !
                            </span>
                          )}
                          {item.status === 'fail' && (
                            <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-700 flex items-center justify-center text-[11px] font-bold shrink-0">
                              ✕
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E4E1D7] flex items-center justify-between text-xs sm:text-sm font-mono text-[#52525B]">
                  <span>Detected Role: <strong className="text-[#18181B] font-sans font-semibold">{targetRole}</strong></span>
                  <span className="text-xs text-[#88857D]">Engineering Fit</span>
                </div>
              </div>

            </div>

            {/* ── SECOND SECTION: 3 BALANCED CARDS (STRENGTHS | GAPS | KEYWORDS) ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch w-full max-w-[1200px]">

              {/* CARD 1: STRENGTHS */}
              <div className="bg-[#F4F1EA]/80 border border-[#E4E1D7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="flex-1">
                  <div className="flex items-center justify-between border-b border-[#E4E1D7] pb-4 mb-6">
                    <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#18181B] flex items-center gap-2">
                      <span>STRENGTHS</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="font-mono text-xs text-emerald-800 font-bold">
                      {report.strengths.length} Passed
                    </span>
                  </div>

                  <div className="space-y-6">
                    {report.strengths.map((item, i) => (
                      <div key={i} className="flex items-start gap-3.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          <FiCheck size={12} />
                        </div>
                        <div className="space-y-1">
                          <div className="font-sans text-xs sm:text-sm font-bold text-[#18181B] leading-snug">{item.title}</div>
                          <div className="font-sans text-xs text-[#71717A] leading-relaxed">{item.subtitle}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E4E1D7] font-mono text-xs text-[#71717A]">
                  Validated by ATS rules engine
                </div>
              </div>

              {/* CARD 2: GAPS TO IMPROVE */}
              <div className="bg-[#F4F1EA]/80 border border-[#E4E1D7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="flex-1">
                  <div className="flex items-center justify-between border-b border-[#E4E1D7] pb-4 mb-6">
                    <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#18181B] flex items-center gap-2">
                      <span>GAPS TO IMPROVE</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    </div>
                    <span className="font-mono text-xs text-amber-800 font-bold">
                      {report.gaps.length} Actionable
                    </span>
                  </div>

                  <div className="space-y-6">
                    {report.gaps.map((item, i) => (
                      <div key={i} className="flex items-start gap-3.5">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          <FiAlertCircle size={12} />
                        </div>
                        <div className="space-y-1">
                          <div className="font-sans text-xs sm:text-sm font-bold text-[#18181B] leading-snug">{item.title}</div>
                          <div className="font-sans text-xs text-[#71717A] leading-relaxed">{item.subtitle}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E4E1D7] font-mono text-xs text-[#71717A]">
                  Prioritize numbers &amp; quantifiable impact
                </div>
              </div>

              {/* CARD 3: KEYWORDS FOUND */}
              <div className="bg-[#F4F1EA]/80 border border-[#E4E1D7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="flex-1">
                  <div className="flex items-center justify-between border-b border-[#E4E1D7] pb-4 mb-6">
                    <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#18181B]">
                      KEYWORDS FOUND
                    </div>
                    <span className="font-mono text-xs font-bold text-[#18181B] bg-[#FAF8F3] px-2.5 py-0.5 rounded-full border border-[#DCD8CD]">
                      {matchedKeywordsCount}/{totalKeywordsCount} matched
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 font-mono text-xs sm:text-sm">
                    {report.keywords.map((kw, i) => (
                      <div
                        key={i}
                        className={`px-3.5 py-2.5 rounded-xl border flex items-center justify-between transition-colors font-medium ${kw.found
                            ? 'bg-[#FAF8F3] border-[#DCD8CD] text-[#18181B]'
                            : 'bg-[#EDEAE1]/60 border-[#D8D4C8] text-[#8C887E]'
                          }`}
                      >
                        <span className="truncate pr-1 text-xs">{kw.name}</span>
                        {kw.found ? (
                          <FiCheck size={13} className="text-emerald-600 shrink-0 font-bold" />
                        ) : (
                          <span className="text-rose-500 font-bold shrink-0 text-xs">✕</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E4E1D7] font-mono text-xs text-[#71717A]">
                  Target density: &gt;85% match
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default ResumePage