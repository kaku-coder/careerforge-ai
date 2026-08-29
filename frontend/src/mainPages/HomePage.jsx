import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import interviewVideo from '../assets/candidate_robot_interview.mp4'
import resumeVideo from '../assets/robot_scanning_resume.mp4'
import roadmapVideo from '../assets/developer_coding_roadmap.mp4'

const interviewFrameModules = import.meta.glob('../assets/interviewJpg/ezgif-frame-*.jpg', {
  eager: true,
  import: 'default',
})

const resumeFrameModules = import.meta.glob('../assets/resumeJpg/ezgif-frame-*.jpg', {
  eager: true,
  import: 'default',
})

const roadmapFrameModules = import.meta.glob('../assets/roadmapjpg/ezgif-frame-*.jpg', {
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

const roadmapFrames = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, '0')
  return roadmapFrameModules[`../assets/roadmapjpg/ezgif-frame-${num}.jpg`]
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

const ROADMAP_STAGES = [
  {
    range: [0.00, 0.28],
    tag: '// ROADMAP 01 / AI PLANNER',
    title: 'Your Personalized Learning Path.',
    subtitle: 'Tell us your target role and salary goal — AI builds a structured, month-by-month roadmap from where you are today.',
  },
  {
    range: [0.28, 0.48],
    tag: '// TOPIC BY TOPIC',
    title: 'Learn What Actually Matters',
    subtitle: 'Every skill, framework, and concept ranked by relevance to your target role — no more random tutorials.',
  },
  {
    range: [0.48, 0.65],
    tag: '// CURATED RESOURCES',
    title: 'Watch. Read. Build.',
    subtitle: 'Handpicked YouTube videos and articles for every topic, so you always know what to study next.',
  },
  {
    range: [0.65, 0.82],
    tag: '// TRACK PROGRESS',
    title: 'Stay on Track to the Offer',
    subtitle: 'Mark topics done, see your weekly progress, and let the roadmap adapt as you level up.',
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

  const showVideo = isVideoPhase && progress >= 0.82
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

  return (
    <div ref={containerRef} className="relative" style={{ height: isMobile ? '450vh' : '550vh' }}>
      <div className="sticky top-[76px] w-full h-[calc(100vh-76px)] overflow-hidden bg-[#F8F6F1] flex items-center justify-center">
        
        {/* Video Overlay Phase (progress >= 0.82) */}
        {showVideo && (
          <div className="absolute inset-0 z-30 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 px-6 lg:px-20 py-8 bg-[#F8F6F1]">
            <div className="w-full max-w-md lg:max-w-lg aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-[#e2e0d6] bg-[#141412] shrink-0">
              <video
                src={videoSrc}
                autoPlay loop muted playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-md text-center lg:text-left space-y-3 lg:space-y-4">
              <div className="font-mono text-[10px] sm:text-xs font-bold text-[#88857d] uppercase tracking-[0.2em]">
                {videoTag}
              </div>
              <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#111110] tracking-tight leading-[1.08]">
                {videoTitle}
              </h2>
              <p className="font-sans text-xs sm:text-sm lg:text-base text-[#66645e] leading-relaxed">
                {videoSubtitle}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                <Link to={videoCta1Link} className="btn-tactile-dark-3d group relative z-30">
                  <span>{videoCta1Text}</span>
                  <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link to={videoCta2Link} className="btn-tactile-3d group relative z-30">
                  <span>{videoCta2Text}</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stages Animation Phase */}
        <div
          className={`w-full h-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center items-center gap-6 lg:gap-12 py-6 ${
            isMobile ? 'flex-col' : (reverse ? 'lg:flex-row-reverse' : 'lg:flex-row')
          }`}
          style={{
            opacity: showVideo ? 0 : 1,
            transition: 'opacity 0.6s ease',
            pointerEvents: showVideo ? 'none' : 'auto',
          }}
        >
          {/* Text Container - Centered horizontally in section */}
          <div className="w-full flex-1 max-w-xl flex items-center justify-center relative min-h-[170px] lg:min-h-[260px]">
            {stages.map((stage, i) => {
              const isVisible = activeStageIndex === i
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex flex-col items-center lg:items-start text-center lg:text-left justify-center px-2"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.5s ${ease}, transform 0.5s ${ease}`,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                >
                  <div className="font-mono text-[10px] sm:text-xs font-bold text-[#88857d] uppercase tracking-[0.2em] mb-2">
                    {stage.tag}
                  </div>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#111110] tracking-tight leading-[1.08] mb-3 max-w-lg">
                    {stage.title}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm lg:text-base text-[#66645e] leading-relaxed mb-6 max-w-md">
                    {stage.subtitle}
                  </p>
                  <div className="w-full flex justify-center lg:justify-start">
                    <Link to={stageCtaLink} className="btn-tactile-dark-3d group relative z-30">
                      <span>Get Started</span>
                      <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Image Frame Container - Centered horizontally in section */}
          <div className="w-full flex-1 max-w-xl flex items-center justify-center">
            <div className="relative w-full aspect-[16/10] max-h-[38vh] lg:max-h-[58vh] rounded-2xl overflow-hidden shadow-2xl border border-[#e2e0d6] bg-[#141412]">
              {frames.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: index === activeFrame ? 1 : 0,
                    willChange: 'opacity',
                  }}
                  draggable={false}
                />
              ))}
              <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
                boxShadow: 'inset 0 0 40px rgba(17,17,16,0.15)',
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
  const roadmapRef = useRef(null)

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

      <ScrollSection
        containerRef={roadmapRef}
        frames={roadmapFrames}
        stages={ROADMAP_STAGES}
        isVideoPhase={true}
        videoSrc={roadmapVideo}
        stageCtaLink="/roadmap"
        videoTag="// ROADMAP ENGINE"
        videoTitle={<>Map Every Step<br />To the Job.</>}
        videoSubtitle="AI-powered learning plans that turn your target role into a clear, day-by-day career path."
        videoCta1Text="Build Roadmap"
        videoCta1Link="/roadmap"
        videoCta2Text="Explore Paths"
        videoCta2Link="/roadmap"
      />

    </div>
  )
}

export default HomePage