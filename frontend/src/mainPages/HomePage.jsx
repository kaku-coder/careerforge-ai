import React, { useState, useEffect, useRef } from 'react'
import { FiArrowRight } from 'react-icons/fi'

import interviewVideo from '../assets/candidate_robot_interview.mp4'

const frameModules = import.meta.glob('../assets/interviewJpg/ezgif-frame-*.jpg', {
  eager: true,
  import: 'default',
})

const TOTAL_FRAMES = 50

const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, '0')
  const key = `../assets/interviewJpg/ezgif-frame-${num}.jpg`
  return frameModules[key]
})

const STAGES = [
  {
    range: [0.08, 0.28],
    tag: '// SYSTEM 01',
    title: 'AI Interview Engine',
    subtitle: 'Practice with an AI that adapts to your resume, target role, and skill level \u2014 delivering real interview pressure.',
  },
  {
    range: [0.28, 0.48],
    tag: '// LIVE FEEDBACK',
    title: 'Real-Time Scoring',
    subtitle: 'Every answer is analyzed for technical depth, communication clarity, problem-solving approach, and confidence.',
  },
  {
    range: [0.48, 0.65],
    tag: '// SYSTEM DESIGN',
    title: 'Think Under Pressure',
    subtitle: 'Whiteboard-style system design challenges with AI-guided hints when you get stuck.',
  },
  {
    range: [0.65, 0.82],
    tag: '// YOUR RESULTS',
    title: 'Know Exactly Where You Stand',
    subtitle: 'Detailed breakdown of strengths and weaknesses \u2014 so your next practice session targets what matters.',
  },
]

const HomePage = () => {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const scrollableHeight = rect.height - window.innerHeight
      if (scrollableHeight <= 0) return
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / scrollableHeight))
      setProgress(p)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))
  const isVideoPhase = progress >= 0.82

  const activeStageIndex = STAGES.findIndex(
    (s) => progress >= s.range[0] && progress < s.range[1]
  )

  const splitT = Math.max(0, Math.min(1, (progress - 0.06) / 0.08))

  return (
    <div className="bg-[#F8F6F1]">

      <div ref={containerRef} className="relative" style={{ height: '600vh' }}>

        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F8F6F1]">

          {isVideoPhase && (
            <div className="absolute inset-0 z-30 flex items-center gap-12 lg:gap-16 px-10 sm:px-16 lg:px-24">
              <div className="flex-1 flex justify-center">
                <video
                  src={interviewVideo}
                  autoPlay loop muted playsInline
                  className="w-full max-w-lg rounded-2xl shadow-xl object-cover"
                  style={{ aspectRatio: '16/10' }}
                />
              </div>
              <div className="flex-1 space-y-5">
                <div className="font-mono text-[10px] sm:text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
                  // AI POWERED
                </div>
                <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-[#111110] tracking-tight leading-[1.08]">
                  Your Career,<br />Our Intelligence.
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#66645e] max-w-md leading-relaxed">
                  AI-powered system to analyze, prepare and accelerate your career every step of the way.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="/register" className="no-underline inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#111110] text-[#F8F6F1] font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#262522] transition-all">
                    <span>Get Started</span><FiArrowRight size={14} />
                  </a>
                  <a href="/interview" className="no-underline inline-flex items-center gap-2.5 px-6 py-3.5 bg-white border border-[#e2e0d6] text-[#111110] font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-xs hover:bg-[#efece4] transition-all">
                    <span>Try Interview</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          <div
            className="absolute inset-0 flex"
            style={{
              opacity: isVideoPhase ? 0 : 1,
              transition: 'opacity 0.6s ease',
              pointerEvents: isVideoPhase ? 'none' : 'auto',
            }}
          >
            <div
              className="h-full flex items-center overflow-hidden"
              style={{
                width: splitT < 1 ? '100%' : '50%',
                paddingLeft: splitT < 1 ? `${50 - splitT * 42}%` : '8%',
                transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1), padding 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div
                className="w-full"
                style={{
                  maxWidth: '480px',
                  transform: `translateX(${splitT < 1 ? (1 - splitT) * 10 : 0}%)`,
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {STAGES.map((stage, i) => {
                  const isVisible = activeStageIndex === i
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: isVisible ? 'auto' : 'none',
                      }}
                    >
                      <div className="font-mono text-[10px] sm:text-xs font-bold text-[#88857d] uppercase tracking-[0.2em] mb-5">
                        {stage.tag}
                      </div>
                      <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-[#111110] tracking-tight leading-[1.08] mb-5">
                        {stage.title}
                      </h2>
                      <p className="font-sans text-sm sm:text-base text-[#66645e] max-w-md leading-relaxed mb-8">
                        {stage.subtitle}
                      </p>
                      <div>
                        <a href="/register" className="no-underline inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#111110] text-[#F8F6F1] font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#262522] transition-all">
                          <span>Get Started</span><FiArrowRight size={14} />
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div
              className="h-full flex items-center overflow-hidden"
              style={{
                width: splitT < 1 ? '0%' : '50%',
                paddingRight: splitT >= 1 ? '8%' : '0',
                transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1), padding 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div
                className="relative w-full h-full max-h-[80vh] rounded-2xl overflow-hidden shadow-lg"
                style={{
                  opacity: splitT,
                  transform: `translateX(${(1 - splitT) * 30}%)`,
                  transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {frames.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt=""
                    className="absolute inset-0 w-full h-full"
                    style={{
                      opacity: index === activeFrame ? 1 : 0,
                      objectFit: 'cover',
                      imageRendering: 'auto',
                      willChange: 'opacity',
                    }}
                    draggable={false}
                  />
                ))}
                <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
                  boxShadow: 'inset 0 0 60px rgba(17,17,16,0.15)',
                }} />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default HomePage
