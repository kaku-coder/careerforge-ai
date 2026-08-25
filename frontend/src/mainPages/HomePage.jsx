import React, { useState, useEffect, useRef } from 'react'
import { FiArrowRight } from 'react-icons/fi'

import interviewVideo from '../assets/candidate_robot_interview.mp4'
import resumeVideo from '../assets/robot_scanning_resume.mp4'

const interviewFrameModules = import.meta.glob('../assets/interviewJpg/ezgif-frame-*.jpg', {
  eager: true,
  import: 'default',
})

const resumeFrameModules = import.meta.glob('../assets/resumeJpg/ezgif-frame-*.jpg', {
  eager: true,
  import: 'default',
})

const TOTAL_FRAMES = 50

const interviewFrames = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, '0')
  return interviewFrameModules[`../assets/interviewJpg/ezgif-frame-${num}.jpg`]
})

const resumeFrames = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, '0')
  return resumeFrameModules[`../assets/resumeJpg/ezgif-frame-${num}.jpg`]
})

const INTERVIEW_STAGES = [
  {
    range: [0.00, 0.28],
    tag: '// SYSTEM 01 / AI INTERVIEW',
    title: 'Welcome To Career AI.',
    subtitle: 'Practice with an AI that adapts to your resume, target role, and skill level — delivering real interview pressure.',
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
    subtitle: 'Detailed breakdown of strengths and weaknesses — so your next practice session targets what matters.',
  },
]

const RESUME_STAGES = [
  {
    range: [0.00, 0.28],
    tag: '// RESUME 01 / ATS BUILDER',
    title: 'Craft Your Winning Resume.',
    subtitle: 'AI crafts a tailored, ATS-friendly resume from your experience — optimized for the role you want.',
  },
  {
    range: [0.28, 0.48],
    tag: '// ATS OPTIMIZED',
    title: 'Beat the Filter',
    subtitle: 'Every keyword, format, and section is calibrated to pass Applicant Tracking Systems on the first try.',
  },
  {
    range: [0.48, 0.65],
    tag: '// AI REVIEW',
    title: 'Instant Feedback',
    subtitle: 'Get a professional-grade review in seconds — tone, impact, clarity, and completeness scored.',
  },
  {
    range: [0.65, 0.82],
    tag: '// YOUR EDGE',
    title: 'Stand Out From the Stack',
    subtitle: 'A resume that tells your story with precision — making recruiters stop scrolling and start calling.',
  },
]

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

const ScrollSection = ({
  frames,
  stages,
  containerRef,
  isVideoPhase = true,
  videoSrc,
  reverse = false,
  stageCtaLink = '/register',
  videoTag = '// AI POWERED',
  videoTitle = <>Your Career,<br />Our Intelligence.</>,
  videoSubtitle = 'AI-powered system to analyze, prepare and accelerate your career every step of the way.',
  videoCta1Text = 'Get Started',
  videoCta1Link = '/register',
  videoCta2Text = 'Try Interview',
  videoCta2Link = '/interview',
}) => {
  const progress = useScrollProgress(containerRef)
  const isMobile = useIsMobile()

  const activeFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))
  const foundIndex = stages.findIndex(
    (s) => progress >= s.range[0] && progress < s.range[1]
  )
  const activeStageIndex = foundIndex === -1 ? (progress < stages[0].range[0] ? 0 : stages.length - 1) : foundIndex

  const splitT = Math.max(0, Math.min(1, (progress - 0.03) / 0.1))
  const showVideo = isVideoPhase && progress >= 0.82
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

  if (isMobile) {
    return (
      <div ref={containerRef} className="relative" style={{ height: '600vh' }}>
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F8F6F1]">

          {showVideo && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 px-6">
              <video
                src={videoSrc}
                autoPlay loop muted playsInline
                className="w-full max-w-sm rounded-xl shadow-xl object-cover"
                style={{ aspectRatio: '16/10' }}
              />
              <div className="space-y-2.5 text-center">
                <div className="font-mono text-[10px] font-bold text-[#88857d] uppercase tracking-[0.2em]">
                  {videoTag}
                </div>
                <h2 className="font-sans font-black text-xl text-[#111110] tracking-tight leading-[1.1]">
                  {videoTitle}
                </h2>
                <p className="font-sans text-[11px] text-[#66645e] max-w-xs mx-auto leading-relaxed">
                  {videoSubtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <a href={videoCta1Link} className="no-underline inline-flex items-center gap-2 px-6 py-3 bg-[#111110] text-[#F8F6F1] font-mono text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#262522] transition-all">
                    <span>{videoCta1Text}</span><FiArrowRight size={13} />
                  </a>
                  <a href={videoCta2Link} className="no-underline inline-flex items-center gap-2 px-5 py-3 bg-[#F8F6F1] border border-[#d6d3c7] text-[#111110] font-mono text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-2xs hover:bg-[#efece4] transition-all">
                    <span>{videoCta2Text}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          <div
            className="absolute inset-0 flex flex-col"
            style={{
              opacity: showVideo ? 0 : 1,
              transition: 'opacity 0.6s ease',
              pointerEvents: showVideo ? 'none' : 'auto',
            }}
          >
            {/* Mobile: Text on top */}
            <div className="flex-[0.45] flex items-end justify-center px-6 pb-1">
              <div className="w-full">
                {stages.map((stage, i) => {
                  const isVisible = activeStageIndex === i
                  return (
                    <div
                      key={i}
                      className="absolute left-6 right-6 bottom-[52%]"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `opacity 0.7s ${ease}, transform 0.7s ${ease}`,
                        pointerEvents: isVisible ? 'auto' : 'none',
                      }}
                    >
                      <div className="font-mono text-[9px] font-bold text-[#88857d] uppercase tracking-[0.2em] mb-2">
                        {stage.tag}
                      </div>
                      <h2 className="font-sans font-black text-xl text-[#111110] tracking-tight leading-[1.1] mb-2">
                        {stage.title}
                      </h2>
                      <p className="font-sans text-[11px] text-[#66645e] leading-relaxed mb-4">
                        {stage.subtitle}
                      </p>
                      <a href={stageCtaLink} className="no-underline inline-flex items-center gap-2.5 px-6 py-3 bg-[#111110] text-[#F8F6F1] font-mono text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#262522] transition-all">
                        <span>Get Started</span><FiArrowRight size={13} />
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mobile: Image sequence on bottom */}
            <div className="flex-[0.55] flex items-start justify-center px-5 pt-1">
            <div
              className="relative w-full h-full max-h-[50vh] rounded-xl overflow-hidden shadow-lg"
              style={{
                opacity: splitT,
                transform: `translateY(${(1 - splitT) * 15}%)`,
                transition: `opacity 0.7s ${ease}, transform 0.7s ${ease}`,
                willChange: 'opacity, transform',
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
                      willChange: 'opacity',
                    }}
                    draggable={false}
                  />
                ))}
                <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
                  boxShadow: 'inset 0 0 40px rgba(17,17,16,0.15)',
                }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

  // Desktop layout — image takes 58%, text takes 42%
  return (
    <div ref={containerRef} className="relative" style={{ height: '600vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#F8F6F1]">

        {showVideo && (
          <div className="absolute inset-0 z-30 flex items-center justify-center gap-12 lg:gap-20 px-8 sm:px-14 lg:px-20">
            <div className="flex-1 flex justify-end">
              <video
                src={videoSrc}
                autoPlay loop muted playsInline
                className="w-full max-w-lg rounded-xl shadow-xl object-cover"
                style={{ aspectRatio: '16/10' }}
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="font-mono text-[10px] sm:text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
                {videoTag}
              </div>
              <h2 className="font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-[#111110] tracking-tight leading-[1.08]">
                {videoTitle}
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#66645e] max-w-md leading-relaxed">
                {videoSubtitle}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={videoCta1Link}
                  className="no-underline inline-flex items-center gap-3 px-8 py-4 bg-[#111110] text-[#F8F6F1] font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-[#262522] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all group cursor-pointer border border-[#111110]"
                >
                  <span>{videoCta1Text}</span>
                  <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
                <a
                  href={videoCta2Link}
                  className="no-underline inline-flex items-center gap-3 px-7 py-4 bg-[#F8F6F1] border border-[#d6d3c7] text-[#111110] font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-2xs hover:bg-[#efece4] hover:border-[#111110] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span>{videoCta2Text}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        <div
          className="absolute inset-0"
          style={{
            opacity: showVideo ? 0 : 1,
            transition: 'opacity 0.6s ease',
            pointerEvents: showVideo ? 'none' : 'auto',
          }}
        >
          {/* Text column — centered on page load, splits to side on scroll */}
          <div
            className="absolute top-0 h-full flex items-center overflow-hidden"
            style={{
              left: splitT < 1 ? 0 : (reverse ? 'auto' : 0),
              right: splitT < 1 ? 0 : (reverse ? 0 : 'auto'),
              width: splitT < 1 ? '100%' : '42%',
              paddingLeft: splitT < 1 ? '2rem' : (reverse ? 'auto' : '6%'),
              paddingRight: splitT < 1 ? '2rem' : (reverse ? '6%' : 'auto'),
              justifyContent: splitT < 1 ? 'center' : (reverse ? 'flex-end' : 'flex-start'),
              transition: `width 0.8s ${ease}, padding 0.8s ${ease}, left 0.8s ${ease}, right 0.8s ${ease}`,
            }}
          >
            <div
              className="w-full relative h-full flex items-center justify-center"
              style={{
                maxWidth: splitT < 1 ? '720px' : '440px',
                transition: `max-width 0.8s ${ease}`,
              }}
            >
              {stages.map((stage, i) => {
                const isVisible = activeStageIndex === i
                const isCentered = splitT < 1
                return (
                  <div
                    key={i}
                    className={`absolute w-full px-4 flex flex-col ${
                      isCentered ? 'items-center text-center' : 'items-start text-left'
                    }`}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
                        pointerEvents: isVisible ? 'auto' : 'none',
                        willChange: 'opacity, transform',
                      }}
                  >
                    <div className="font-mono text-[10px] sm:text-xs font-bold text-[#88857d] uppercase tracking-[0.2em] mb-4">
                      {stage.tag}
                    </div>
                    <h2 className={`font-sans font-black text-3xl sm:text-4xl lg:text-5xl text-[#111110] tracking-tight leading-[1.08] mb-4 ${
                      isCentered ? 'text-center max-w-xl' : 'text-left max-w-lg'
                    }`}>
                      {stage.title}
                    </h2>
                    <p className={`font-sans text-sm sm:text-base text-[#66645e] max-w-md leading-relaxed mb-8 ${
                      isCentered ? 'text-center mx-auto' : 'text-left'
                    }`}>
                      {stage.subtitle}
                    </p>
                    <div className={`w-full flex ${isCentered ? 'justify-center' : 'justify-start'}`}>
                      <a
                        href={stageCtaLink}
                        className="no-underline inline-flex items-center gap-3 px-8 py-4 bg-[#111110] text-[#F8F6F1] font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-[#262522] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all group cursor-pointer border border-[#111110]"
                      >
                        <span>Get Started</span>
                        <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Image column */}
          <div
            className="absolute top-0 h-full flex items-center overflow-hidden"
            style={{
              right: reverse ? 'auto' : 0,
              left: reverse ? 0 : 'auto',
              width: '58%',
              paddingRight: reverse ? 'auto' : '4%',
              paddingLeft: reverse ? '4%' : 'auto',
              transition: `padding 0.8s ${ease}`,
            }}
          >
            <div
              className="relative w-full h-[85vh] rounded-xl overflow-hidden shadow-lg"
              style={{
                opacity: splitT,
                transform: `translateX(${(1 - splitT) * (reverse ? -35 : 35)}%)`,
                transition: `opacity 0.7s ${ease}, transform 0.7s ${ease}`,
                willChange: 'opacity, transform',
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
  )
}

const HomePage = () => {
  const interviewRef = useRef(null)
  const resumeRef = useRef(null)

  return (
    <div className="bg-[#F8F6F1]">

      <ScrollSection
        containerRef={interviewRef}
        frames={interviewFrames}
        stages={INTERVIEW_STAGES}
        isVideoPhase={true}
        videoSrc={interviewVideo}
        stageCtaLink="/interview"
        videoTag="// AI INTERVIEW"
        videoTitle={<>Your Career,<br />Our Intelligence.</>}
        videoSubtitle="AI-powered system to analyze, prepare and accelerate your career every step of the way."
        videoCta1Text="Get Started"
        videoCta1Link="/interview"
        videoCta2Text="Try Interview"
        videoCta2Link="/interview"
      />

      <ScrollSection
        containerRef={resumeRef}
        frames={resumeFrames}
        stages={RESUME_STAGES}
        isVideoPhase={true}
        videoSrc={resumeVideo}
        reverse={true}
        stageCtaLink="/resume"
        videoTag="// ATS RESUME ENGINE"
        videoTitle={<>Craft a Resume<br />That Gets Interviews.</>}
        videoSubtitle="AI-powered system to analyze, format and optimize your resume for maximum ATS pass rates."
        videoCta1Text="Build Resume"
        videoCta1Link="/resume"
        videoCta2Text="Analyze ATS"
        videoCta2Link="/resume"
      />

    </div>
  )
}

export default HomePage
