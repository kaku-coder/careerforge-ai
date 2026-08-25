import React, { useState, useEffect, useRef } from 'react'
import { FiArrowRight } from 'react-icons/fi'

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
    range: [0.15, 0.35],
    tag: '// SYSTEM 01',
    title: 'AI Interview Engine',
    subtitle: 'Practice with an AI that adapts to your resume, target role, and skill level — delivering real interview pressure.',
  },
  {
    range: [0.35, 0.55],
    tag: '// LIVE FEEDBACK',
    title: 'Real-Time Scoring',
    subtitle: 'Every answer is analyzed for technical depth, communication clarity, problem-solving approach, and confidence.',
  },
  {
    range: [0.55, 0.75],
    tag: '// SYSTEM DESIGN',
    title: 'Think Under Pressure',
    subtitle: 'Whiteboard-style system design challenges with AI-guided hints when you get stuck.',
  },
  {
    range: [0.75, 0.95],
    tag: '// YOUR RESULTS',
    title: 'Know Exactly Where You Stand',
    subtitle: 'Detailed breakdown of strengths and weaknesses — so your next practice session targets what matters.',
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

  // Canvas expansion: starts at 0.6 scale, expands to 1.0 between 0-15%
  const canvasScale = Math.min(1, 0.6 + progress * 2.67)
  const borderRadius = Math.max(0, 24 - progress * 160)

  // Find active text stage
  const activeStage = STAGES.find(
    (s) => progress >= s.range[0] && progress < s.range[1]
  )

  return (
    <div className="bg-[#111110]">

      {/* Scroll container — 600vh for plenty of scroll room */}
      <div ref={containerRef} className="relative" style={{ height: '600vh' }}>

        {/* Sticky viewport */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#111110] flex items-center justify-center">

          {/* Canvas wrapper — expands from card to fullscreen */}
          <div
            className="relative overflow-hidden"
            style={{
              width: `${canvasScale * 100}vw`,
              height: `${canvasScale * 100}vh`,
              maxWidth: '100vw',
              maxHeight: '100vh',
              borderRadius: `${borderRadius}px`,
              transition: 'none',
            }}
          >
            {/* Frame images */}
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
                  WebkitFontSmoothing: 'antialiased',
                  willChange: 'opacity',
                }}
                draggable={false}
              />
            ))}

            {/* Dark overlay that deepens as canvas expands */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `rgba(17,17,16,${Math.min(0.55, progress * 0.8)})`,
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(17,17,16,0.5) 100%)',
              }}
            />

            {/* Text overlays — revealed by scroll */}
            {progress > 0.1 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
                {STAGES.map((stage, i) => {
                  const isVisible = progress >= stage.range[0] && progress < stage.range[1]
                  const fadeIn = isVisible ? 1 : 0
                  const translateY = isVisible ? 0 : 30

                  return (
                    <div
                      key={i}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                      style={{
                        opacity: fadeIn,
                        transform: `translateY(${translateY}px)`,
                        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: isVisible ? 'auto' : 'none',
                      }}
                    >
                      <div className="font-mono text-[10px] sm:text-xs font-bold text-[#F8F6F1]/50 uppercase tracking-[0.2em] mb-4">
                        {stage.tag}
                      </div>
                      <h2 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-[#F8F6F1] tracking-tight leading-[1.05] max-w-3xl mb-4">
                        {stage.title}
                      </h2>
                      <p className="font-sans text-sm sm:text-base text-[#F8F6F1]/60 max-w-lg leading-relaxed">
                        {stage.subtitle}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Frame counter — top left */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-3">
              <div className="font-mono text-[10px] font-bold text-[#F8F6F1]/40 uppercase tracking-widest">
                AI Interview
              </div>
              <div className="h-3 w-px bg-[#F8F6F1]/15" />
              <div className="font-mono text-[10px] font-bold text-[#F8F6F1]/30 tracking-wider">
                {String(activeFrame + 1).padStart(2, '0')} / {TOTAL_FRAMES}
              </div>
            </div>

            {/* Progress bar — bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F8F6F1]/10 z-20">
              <div
                className="h-full bg-[#F8F6F1]/50"
                style={{ width: `${(activeFrame / TOTAL_FRAMES) * 100}%` }}
              />
            </div>

            {/* Scroll hint — only at start */}
            {progress < 0.08 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500" style={{ opacity: Math.max(0, 1 - progress * 15) }}>
                <div className="font-mono text-[9px] font-bold text-[#F8F6F1]/30 uppercase tracking-[0.25em]">
                  Scroll to explore
                </div>
                <div className="w-4 h-7 border border-[#F8F6F1]/20 rounded-full flex justify-center pt-1.5">
                  <div className="w-0.5 h-1.5 bg-[#F8F6F1]/30 rounded-full animate-float" />
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  )
}

export default HomePage
