import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const range01 = (p, s, e) => clamp((p - s) / (e - s), 0, 1)

const S = {
  upload: [0.0, 0.12],
  scan: [0.12, 0.26],
  pipeline: [0.26, 0.38],
  score: [0.38, 0.52],
  signals: [0.52, 0.64],
  improve: [0.64, 0.75],
  role: [0.75, 0.86],
  connect: [0.86, 0.94],
  final: [0.94, 1.0],
}

const STRENGTHS = ['REST APIs', 'React', 'MongoDB', 'Authentication', 'MERN']
const GAPS = ['System Design', 'AWS', 'Kubernetes', 'Redis']
const SCAN_LABELS = ['PARSING', 'SKILLS DETECTED', 'EXPERIENCE FOUND', 'PROJECTS FOUND', 'KEYWORDS INDEXED']
const PIPELINE = ['RESUME', 'PARSING ENGINE', 'SKILL EXTRACTION', 'ATS ANALYSIS', 'ROLE MATCH']
const CONNECT = ['RESUME', '84 ATS', 'AI INTERVIEW', 'SYSTEM DESIGN GAP', 'CAREER ROADMAP']
const METRICS = [
  ['KEYWORD MATCH', 92],
  ['FORMATTING', 88],
  ['SKILLS RELEVANCE', 81],
  ['EXPERIENCE RELEVANCE', 76],
]
const MATRIX = [
  ['React', 'ok'],
  ['Node.js', 'ok'],
  ['MongoDB', 'ok'],
  ['Docker', 'ok'],
  ['AWS', 'warn'],
  ['System Design', 'warn'],
  ['Kubernetes', 'no'],
]
const GAIN_CHIPS = ['+ IMPACT', '+ TECHNICAL SPECIFICITY', '+ ATS RELEVANCE']

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrollableHeight = rect.height - window.innerHeight
      if (scrollableHeight <= 0) return
      const scrolled = -rect.top
      const p = clamp(scrolled / scrollableHeight, 0, 1)
      setProgress(p)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref])

  return progress
}

const Tag = ({ children }) => (
  <div className="font-mono text-[10px] sm:text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
    {children}
  </div>
)

const Connector = ({ lit }) => (
  <div className="flex flex-col items-center w-24 h-7 -my-0.5">
    <div className={`w-px h-3 ${lit ? 'bg-emerald-500/80' : 'bg-[#111110]/20'}`} />
    <span
      className={`mt-0.5 w-1 h-1 rounded-full ${lit ? 'bg-emerald-500 animate-pulse' : 'bg-[#111110]/20'}`}
    />
    <svg className="mt-0.5 w-2.5 h-2.5" viewBox="0 0 10 6" fill="none">
      <path d="M0 0H10L5 6L0 0Z" fill={lit ? '#10b981' : '#88857d'} />
    </svg>
  </div>
)

const ResumeDoc = ({ className = 'w-[300px]', faded = false, name = 'CAREER USER' }) => (
  <div
    className={`${className} bg-[#FCFBF7] border border-[#111110]/25 px-6 py-5 font-sans shadow-[0_18px_60px_-16px_rgba(17,17,16,0.30)] select-none ${
      faded ? 'opacity-35' : ''
    }`}
  >
    <div className="font-black text-lg leading-none tracking-tight text-[#111110]">{name}</div>
    <div className="text-[9px] uppercase tracking-[0.25em] text-[#66645e] mt-1">
      Full Stack Developer
    </div>
    <div className="border-b border-[#111110]/15 my-3" />
    <div className="font-mono text-[9px] text-[#111110]/85 leading-relaxed">
      React · Node.js · MongoDB · AWS
    </div>
    <div className="space-y-1.5 mt-3">
      <div className="h-1 w-full bg-[#111110]/10" />
      <div className="h-1 w-4/5 bg-[#111110]/10" />
      <div className="h-1 w-full bg-[#111110]/10" />
      <div className="h-1 w-3/5 bg-[#111110]/10" />
    </div>
  </div>
)

const ResumeIntelligenceSection = () => {
  const ref = useRef(null)
  const progress = useScrollProgress(ref)
  const { user } = useAuth()

  const userName = (user?.username || user?.name || user?.email?.split('@')[0] || 'CAREER USER').toUpperCase()

  const stages = [
    {
      key: 'upload',
      s: S.upload[0],
      e: S.upload[1],
      render: (t) => (
        <div className="h-full w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 px-6 sm:px-10">
          <div className="lg:flex-1 text-center lg:text-left space-y-5 max-w-xl">
            <Tag>// SYSTEM 02 / RESUME INTELLIGENCE</Tag>
            <h2 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-[#111110] tracking-tight leading-[1.02]">
              YOUR RESUME.
              <br />
              <span className="text-[#66645e]">UNDERSTOOD BY AI.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#66645e] leading-relaxed max-w-md mx-auto lg:mx-0">
              Upload your resume and let the AI identify strengths, weaknesses and opportunities
              before you apply.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2 font-mono text-[10px] sm:text-[11px] font-semibold text-[#111110] uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Resume Analysis Engine</span>
              <span className="text-[#88857d]">/ Ready</span>
            </div>
          </div>

          <div className="w-full max-w-[380px]">
            <div
              className="border border-[#111110]/30 bg-[#FCFBF7]/70 px-8 py-10 text-center relative overflow-hidden"
              style={{ opacity: range01(t, 0.15, 0.5), transform: `translateY(${(1 - range01(t, 0.15, 0.5)) * 16}px)` }}
            >
              <span className="absolute top-3 left-4 font-mono text-xs text-[#88857d]">+</span>
              <span className="absolute bottom-3 right-4 font-mono text-xs text-[#88857d]">+</span>
              <div className="font-sans font-bold text-sm sm:text-base uppercase tracking-[0.08em] text-[#111110]">
                Drop Your Resume Here
              </div>
              <div className="font-mono text-[11px] text-[#66645e] mt-1.5">PDF / DOCX</div>
              <div className="mt-6 inline-flex items-center gap-2 bg-[#111110] text-[#F8F6F1] font-mono text-[11px] font-semibold uppercase tracking-[0.15em] px-5 py-3 cursor-pointer select-none hover:bg-[#2a2a28] transition-colors">
                SELECT FILE <FiArrowRight size={12} />
              </div>
              <div className="font-mono text-[10px] text-[#88857d] mt-5 uppercase tracking-[0.15em]">
                MAX 5MB / SINGLE DOCUMENT
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'scan',
      s: S.scan[0],
      e: S.scan[1],
      render: (t) => {
        const scanY = t * 100
        return (
          <div className="h-full w-full flex flex-col items-center justify-center gap-7 px-6 relative">
            <div className="absolute top-6 left-6 sm:left-10 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#88857d]">
              // FEED → PROCESSING
            </div>
            <Tag>// SCAN · AI INGEST</Tag>
            <div className="relative">
              <div className="relative overflow-hidden">
                <ResumeDoc className="w-[290px] sm:w-[330px]" name={userName} />
                <div
                  className="absolute left-0 right-0 h-[2px] bg-emerald-500 pointer-events-none"
                  style={{ top: `${scanY}%`, boxShadow: '0 0 14px 3px rgba(16,185,129,0.5)' }}
                />
              </div>
              <div className="absolute -right-3 -top-3 bg-[#111110] text-[#F8F6F1] font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.15em]">
                {t < 0.5 ? 'PARSING' : 'ANALYZING'}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-xl">
              {SCAN_LABELS.map((label, i) => {
                const lt = range01(t, 0.08 + i * 0.17, 0.35 + i * 0.17)
                return (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 border border-[#111110]/15 text-[#66645e]"
                    style={{ opacity: lt, transform: `translateY(${(1 - lt) * 8}px)` }}
                  >
                    <span className={`w-1 h-1 rounded-full ${lt > 0.99 ? 'bg-emerald-500' : 'bg-[#111110]/25'}`} />
                    {label}
                  </div>
                )
              })}
            </div>
          </div>
        )
      },
    },
    {
      key: 'pipeline',
      s: S.pipeline[0],
      e: S.pipeline[1],
      render: (t) => (
        <div className="h-full w-full flex flex-col items-center justify-center gap-7 px-6 text-center">
          <div className="space-y-3">
            <Tag>// SYSTEM UNDERSTANDING</Tag>
            <h3 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-[#111110] tracking-tight">
              AI DECODES YOUR RESUME
            </h3>
          </div>
          <div className="flex flex-col items-center mt-2 scale-[0.85] sm:scale-100">
            {PIPELINE.map((label, i) => {
              const t0 = i / PIPELINE.length
              const t1 = (i + 0.6) / PIPELINE.length
              const activeT = range01(t, t0, t1)
              const lit = t >= (i + 0.5) / PIPELINE.length
              return (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className={`font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 border bg-[#FCFBF7] ${
                      activeT >= 1
                        ? 'border-emerald-500/70 text-[#111110]'
                        : activeT > 0
                          ? 'border-[#111110]/40 text-[#111110]'
                          : 'border-[#111110]/15 text-[#88857d]'
                    }`}
                    style={{ opacity: activeT > 0 ? 1 : 0.55 }}
                  >
                    {label}
                  </div>
                  {i < PIPELINE.length - 1 && <Connector lit={lit} />}
                </div>
              )
            })}
          </div>
        </div>
      ),
    },
    {
      key: 'score',
      s: S.score[0],
      e: S.score[1],
      render: (t) => (
        <div className="h-full w-full flex items-center justify-center gap-10 lg:gap-24 px-6 sm:px-10">
          <div className="hidden lg:block shrink-0">
            <div
              style={{
                opacity: range01(t, 0, 0.35),
                transform: `translateX(-${t * 70}px) scale(${1 - t * 0.08})`,
              }}
            >
              <ResumeDoc className="w-[320px]" faded name={userName} />
            </div>
          </div>

          <div className="w-full max-w-[520px] space-y-5">
            <div style={{ opacity: range01(t, 0.05, 0.3) }}>
              <Tag>// ATS ANALYSIS</Tag>
            </div>
            <div
              className="flex items-end gap-2"
              style={{
                opacity: range01(t, 0.15, 0.4),
                transform: `translateY(${(1 - range01(t, 0.15, 0.4)) * 14}px)`,
              }}
            >
              <span className="font-sans font-black text-[6.5rem] sm:text-[8.5rem] leading-[0.85] tracking-tighter text-[#111110]">
                84
              </span>
              <span className="font-mono text-lg sm:text-xl text-[#66645e] font-bold mb-3">/ 100</span>
            </div>
            <div className="font-sans font-bold text-sm sm:text-base uppercase tracking-[0.2em] text-[#111110]">
              ATS Score
            </div>
            <div className="space-y-3 pt-1">
              {METRICS.map(([label, val], i) => {
                const mt = range01(t, 0.12 + i * 0.18, 0.34 + i * 0.18)
                return (
                  <div key={label} style={{ opacity: mt, transform: `translateY(${(1 - mt) * 10}px)` }}>
                    <div className="flex justify-between font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.18em] text-[#66645e]">
                      <span>{label}</span>
                      <span className="text-[#111110] font-bold">{val}%</span>
                    </div>
                    <div className="mt-1.5 h-[3px] bg-[#111110]/10">
                      <div className="h-full bg-[#111110]" style={{ width: `${val * mt}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'signals',
      s: S.signals[0],
      e: S.signals[1],
      render: (t) => (
        <div className="h-full w-full flex flex-col items-center justify-center gap-8 px-6 text-center">
          <Tag>// AI DETECTED SIGNALS</Tag>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14 w-full max-w-2xl">
            <div className="text-left">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-4">
                Strengths
              </div>
              <div className="flex flex-wrap gap-2">
                {STRENGTHS.map((label, i) => {
                  const st = range01(t, 0.08 + i * 0.14, 0.3 + i * 0.14)
                  return (
                    <span
                      key={label}
                      className="inline-block px-3 py-1.5 border border-emerald-500/40 bg-emerald-50/70 text-emerald-700 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em]"
                      style={{ opacity: st, transform: `translateY(${(1 - st) * 8}px)` }}
                    >
                      {label}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="text-left">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-4">
                Gaps
              </div>
              <div className="flex flex-wrap gap-2">
                {GAPS.map((label, i) => {
                  const st = range01(t, 0.1 + i * 0.16, 0.32 + i * 0.16)
                  return (
                    <span
                      key={label}
                      className="inline-block px-3 py-1.5 border border-amber-500/40 bg-amber-50/60 text-amber-700 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em]"
                      style={{ opacity: st, transform: `translateY(${(1 - st) * 8}px)` }}
                    >
                      {label}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'improve',
      s: S.improve[0],
      e: S.improve[1],
      render: (t) => (
        <div className="h-full w-full flex flex-col items-center justify-center gap-7 px-6 max-w-3xl mx-auto">
          <Tag>// AI IMPROVEMENT</Tag>
          <div className="w-full max-w-2xl space-y-5">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#88857d] mb-2">
                Current
              </div>
              <div className="border border-[#111110]/15 bg-[#FCFBF7]/80 p-4 font-sans text-sm text-[#66645e]">
                “Built a job portal using MERN.”
              </div>
            </div>
            <div className="flex justify-center">
              <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 20 12" fill="none">
                <path d="M10 0V10M10 10L5 5.5M10 10L15 5.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-2">
                AI Suggestion
              </div>
              <div className="border border-emerald-500/40 bg-[#FCFBF7]/80 p-4 font-sans text-sm text-[#111110] leading-relaxed">
                ”Built a <span className="bg-emerald-100/60 border-b-2 border-emerald-500 pb-0.5">MERN-based job platform</span> with{' '}
                <span className="bg-emerald-100/60 border-b-2 border-emerald-500 pb-0.5">role-based authentication</span>,{' '}
                <span className="bg-emerald-100/60 border-b-2 border-emerald-500 pb-0.5">REST APIs</span> and{' '}
                <span className="bg-emerald-100/60 border-b-2 border-emerald-500 pb-0.5">MongoDB-backed job discovery</span>.”
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {GAIN_CHIPS.map((label, i) => {
              const ct = range01(t, 0.35 + i * 0.14, 0.55 + i * 0.14)
              return (
                <span
                  key={label}
                  className="inline-flex items-center border border-emerald-500/50 text-emerald-700 bg-emerald-50/70 font-mono text-[9px] sm:text-[10px] font-bold px-2.5 py-1 uppercase tracking-[0.12em]"
                  style={{ opacity: ct, transform: `translateY(${(1 - ct) * 8}px)` }}
                >
                  {label}
                </span>
              )
            })}
          </div>
          <Link to="/resume" className="btn-tactile-dark-3d" style={{ opacity: range01(t, 0.6, 0.85) }}>
            <span>Apply Suggestion</span>
            <FiArrowRight size={15} />
          </Link>
        </div>
      ),
    },
    {
      key: 'role',
      s: S.role[0],
      e: S.role[1],
      render: (t) => (
        <div className="h-full w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 px-6 sm:px-10 max-w-5xl mx-auto">
          <div className="w-full max-w-[460px]">
            <Tag>// TARGET ROLE MATCH</Tag>
            <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#111110] tracking-tight mt-3 mb-6 uppercase">
              Full Stack Developer
            </h3>
            <div className="space-y-[9px]">
              {MATRIX.map(([skill, status], i) => {
                const mt = range01(t, 0.05 + i * 0.11, 0.25 + i * 0.11)
                const icon =
                  status === 'ok' ? (
                    <span className="text-emerald-600">✓</span>
                  ) : status === 'warn' ? (
                    <span className="text-amber-600">⚠</span>
                  ) : (
                    <span className="text-[#c9c6bb]">×</span>
                  )
                return (
                  <div
                    key={skill}
                    className="flex items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.12em] text-[#111110]"
                    style={{ opacity: mt, transform: `translateX(${(1 - mt) * 10}px)` }}
                  >
                    <span className="flex-1 border-b border-dotted border-[#111110]/25 pb-0.5">{skill}</span>
                    {icon}
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className="border border-[#111110]/25 bg-[#FCFBF7]/70 p-8 w-full max-w-xs flex flex-col items-center"
            style={{ opacity: range01(t, 0.2, 0.45), transform: `translateY(${(1 - range01(t, 0.2, 0.45)) * 14}px)` }}
          >
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#88857d]">
              Role Match
            </div>
            <div className="font-sans font-black text-7xl sm:text-8xl tracking-tighter text-[#111110] leading-none mt-2">
              81<span className="text-2xl sm:text-3xl text-[#66645e] font-bold">%</span>
            </div>
            <p className="mt-5 font-sans text-xs sm:text-sm text-[#66645e] leading-relaxed text-center">
              Your resume matches most requirements for this role, but backend architecture and
              cloud experience are limiting your score.
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'connect',
      s: S.connect[0],
      e: S.connect[1],
      render: (t) => (
        <div className="h-full w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 px-6 sm:px-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center scale-[0.85] sm:scale-100">
            {CONNECT.map((label, i) => {
              const t0 = i / CONNECT.length
              const t1 = (i + 0.6) / CONNECT.length
              const activeT = range01(t, t0, t1)
              const lit = t >= (i + 0.5) / CONNECT.length
              return (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className={`font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 border bg-[#FCFBF7] ${
                      activeT >= 1
                        ? 'border-emerald-500/70 text-[#111110]'
                        : activeT > 0
                          ? 'border-[#111110]/40 text-[#111110]'
                          : 'border-[#111110]/15 text-[#88857d]'
                    }`}
                    style={{ opacity: activeT > 0 ? 1 : 0.55 }}
                  >
                    {label}
                  </div>
                  {i < CONNECT.length - 1 && <Connector lit={lit} />}
                </div>
              )
            })}
          </div>

          <div className="max-w-sm text-left space-y-3">
            <div style={{ opacity: range01(t, 0.1, 0.35) }}>
              <Tag>// AI CAREER CONNECTION</Tag>
            </div>
            <p
              className="font-sans font-black text-2xl sm:text-3xl text-[#111110] tracking-tight"
              style={{ opacity: range01(t, 0.25, 0.5), transform: `translateY(${(1 - range01(t, 0.25, 0.5)) * 12}px)` }}
            >
              ONE SYSTEM.
              <br />
              YOUR WHOLE CAREER.
            </p>
            <p
              className="font-sans text-sm text-[#66645e] leading-relaxed"
              style={{ opacity: range01(t, 0.35, 0.6) }}
            >
              Your resume isn't analyzed in isolation. The AI turns it into interview questions,
              pinpoints system-design gaps, and builds your career roadmap from what it learns.
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'final',
      s: S.final[0],
      e: S.final[1],
      render: (t) => (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-grid-lines"
            style={{ transform: `scale(${1 + t * 0.55})`, opacity: 0.45 + t * 0.4 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, transparent 26%, rgba(17,17,16,${t * 0.5}) 76%)`,
            }}
          />

          <div
            className="absolute left-1/2 top-1/2"
            style={{
              opacity: 1 - t,
              transform: `translate(-50%, -50%) scale(${1 - t * 0.45}) translateY(${t * 28}px)`,
            }}
          >
            <ResumeDoc className="w-[260px]" name={userName} />
          </div>

          <div
            className="absolute left-1/2 top-1/2 flex flex-col items-center gap-4"
            style={{ transform: `translate(-50%, -50%) scale(${1 + t * 1.15})` }}
          >
            <div className="border-[2.5px] border-emerald-500 bg-[#F8F6F1] px-8 py-4 shadow-[0_0_70px_-12px_rgba(16,185,129,0.55)]">
              <div className="font-sans font-black text-2xl sm:text-3xl text-[#111110] tracking-tight whitespace-nowrap">
                SYSTEM DESIGN
              </div>
            </div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Next Intelligence Target
            </div>
          </div>

          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full px-6"
            style={{ opacity: range01(t, 0.25, 0.5) }}
          >
            <div className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.15em] text-[#66645e]">
              84 ATS SCORE&nbsp;&nbsp;·&nbsp;&nbsp;81% ROLE MATCH&nbsp;&nbsp;·&nbsp;&nbsp;SYSTEM DESIGN / GAP
              DETECTED
            </div>
            <div className="mt-5 flex flex-col items-center gap-3">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#88857d]">
                // NEXT · YOUR CAREER PATH
              </div>
              <Link to="/roadmap" className="btn-tactile-dark-3d">
                <span>Build My Roadmap</span>
                <FiArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div ref={ref} className="relative w-full bg-[#F8F6F1]" style={{ height: '900vh' }}>
      <div className="sticky top-[76px] h-[calc(100vh-76px)] overflow-hidden">
        {stages.map(({ key, s, e, render }) => {
          const t = range01(progress, s, e)
          const inT = clamp(t * 12, 0, 1)
          const outT = clamp((1 - t) * 12, 0, 1)
          const op = inT * outT
          return (
            <div
              key={key}
              className="absolute inset-0 flex items-center justify-center will-change-[opacity,transform,filter]"
              style={{
                opacity: op,
                transform: `translate3d(0, ${(1 - op) * 26}px, 0) scale(${1 - (1 - op) * 0.015})`,
                filter: `blur(${(1 - op) * 3}px)`,
                pointerEvents: op < 0.5 ? 'none' : 'auto',
              }}
            >
              {render(t)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ResumeIntelligenceSection