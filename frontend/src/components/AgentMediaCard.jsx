import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiTv } from 'react-icons/fi'

/**
 * AgentMediaCard Component
 * Displays a feature card with a poster image, which cross-fades into an autoplays-on-hover video preview.
 */
const AgentMediaCard = ({
  to = '#',
  title,
  description,
  icon: IconComponent,
  imageSrc,
  videoSrc,
  badgeText = 'AI AGENT',
  ctaText = 'EXPLORE AGENT'
}) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMouseEnter = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser blocks media play
        })
      }
    }
  }

  const handleMouseLeave = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={() => {
        // Allow brief video preview on mobile touch before navigation if needed
      }}
      className="no-underline group relative flex flex-col justify-between bg-[#141412] text-[#F8F6F1] rounded-xl sm:rounded-2xl border border-[#282723] hover:border-[#525048] transition-all duration-300 sm:duration-500 hover:-translate-y-1 sm:hover:-translate-y-1.5 shadow-lg sm:shadow-xl hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] overflow-hidden h-full"
    >
      {/* Glow highlight effect on hover */}
      <div className="absolute -inset-px rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-20" />

      {/* Top Media Container (Image + Video Overlay) */}
      <div className="relative w-full aspect-[16/10] bg-[#1a1916] overflow-hidden">
        {/* Static Image Poster */}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105 ${
              isPlaying ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#262521] to-[#171614] flex items-center justify-center text-[#55534d]">
            <FiTv size={32} className="sm:w-9 sm:h-9" />
          </div>
        )}

        {/* Video Overlay (Only plays & turns visible on hover/touch) */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${
              isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Dark Vignette Overlay for readable text/badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141412] via-transparent to-black/40 pointer-events-none" />

        {/* Badge in top left */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/70 backdrop-blur-md text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#d5d2c8] uppercase rounded-full border border-white/10 shadow-sm flex items-center gap-1">
            {badgeText}
          </span>
        </div>

        {/* Live Hover Status Badge in top right */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
          <div
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider transition-all duration-300 flex items-center gap-1 sm:gap-1.5 border ${
              isPlaying
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-black/50 text-[#a3a097] border-white/10'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-white/40'
              }`}
            />
            <span>{isPlaying ? 'PREVIEWING' : 'PREVIEW'}</span>
          </div>
        </div>

        {/* Play Icon floating overlay indicator on non-hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
            isPlaying ? 'opacity-0 scale-75' : 'opacity-60 group-hover:opacity-0 group-hover:scale-110'
          }`}
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
            <FiPlay size={16} className="ml-0.5 sm:w-4.5 sm:h-4.5" />
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex flex-col items-center justify-between flex-grow text-center relative z-10">
        <div className="flex flex-col items-center justify-center w-full text-center">
          {/* Header Row: Centered Icon + Title */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 mb-2 sm:mb-2.5 w-full text-center">
            {IconComponent && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#22211e] border border-[#35332f] flex items-center justify-center text-[#F8F6F1] shrink-0 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors duration-300">
                <IconComponent size={15} className="sm:w-4 sm:h-4" />
              </div>
            )}
            <h3 className="font-sans font-bold text-base sm:text-lg text-[#F8F6F1] group-hover:text-white transition-colors m-0 text-center">
              {title}
            </h3>
          </div>

          {/* Centered Description Paragraph */}
          <p className="font-sans text-xs sm:text-sm text-[#a3a097] leading-relaxed m-0 group-hover:text-[#c5c2b8] transition-colors text-center max-w-xs mx-auto">
            {description}
          </p>
        </div>

        {/* Centered Bottom CTA Footer */}
        <div className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-[#262522] font-mono text-[10px] sm:text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1.5 sm:gap-2 w-full text-center group-hover:border-[#383631] transition-colors">
          <span className="tracking-wider uppercase">{ctaText}</span>
          <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#1c1b18] border border-[#33312c] flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-400 group-hover:text-black transition-all duration-300 shrink-0">
            <FiArrowRight size={10} className="sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AgentMediaCard
