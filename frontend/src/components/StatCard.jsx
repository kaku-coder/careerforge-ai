import React from 'react'

const StatCard = ({ title, value, unit, badgeText, subtitleText }) => {
  return (
    <div className="w-full h-full min-h-[145px] sm:min-h-[160px] bg-[#1c1b18] text-[#F8F6F1] p-5 rounded-2xl border border-[#2b2925] flex flex-col items-center justify-between text-center space-y-3 shadow-lg min-w-0 transition-all duration-300 hover:border-[#423f3a]">
      {/* Title */}
      <div className="font-mono text-xs text-[#a3a097] uppercase tracking-wider font-semibold text-center w-full truncate">
        {title}
      </div>

      {/* Main Value Number */}
      <div className="font-sans font-black text-3xl text-white text-center flex items-baseline justify-center gap-1 w-full">
        <span>{value}</span>
        {unit && <span className="text-xs text-[#a3a097] font-medium">{unit}</span>}
      </div>

      {/* Footer Badge & Subtitle (Centered Alignment) */}
      <div className="flex items-center justify-center gap-2 pt-2.5 border-t border-[#262420] w-full text-center min-w-0">
        {badgeText && (
          <span className="px-2 py-0.5 bg-[#262420] text-[#c5c2b8] font-mono text-xs font-semibold rounded shrink-0 whitespace-nowrap">
            {badgeText}
          </span>
        )}
        {subtitleText && (
          <span className="font-sans text-xs text-[#a3a097] truncate text-center">
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  )
}

export default StatCard
