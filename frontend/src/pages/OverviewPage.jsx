import React from 'react'

const OverviewPage = () => {
  return (
    <div className="w-full flex flex-col text-[#111110] min-h-[calc(100vh-56px)]">
      {/* Hero Section */}
      <section
        style={{ paddingLeft: '40px', paddingRight: '40px' }}
        className="relative w-full border-b border-[#e2e0d6] pt-16 pb-24"
      >
        {/* Top Tagline */}
        <div className="flex items-center gap-3 font-mono text-[12px] md:text-[13px] tracking-[0.1em] text-[#66645e] uppercase mb-8">
          <span>// PERSONAL CAREER SYSTEM / 01</span>
          <div className="flex items-center gap-2 text-[#16a34a] font-medium ml-2">
            <span className="w-2 h-2 bg-[#4ade80] inline-block"></span>
            <span>SYSTEM STATUS: ONLINE</span>
          </div>
        </div>

        {/* Big Bold Headline */}
        <h1 className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.94] tracking-[-0.03em] text-[#111110] uppercase my-8 max-w-5xl">
          YOUR CAREER,<br />
          UNDER ANALYSIS.
        </h1>

        {/* Subtitle Description */}
        <p className="font-sans text-[15px] md:text-base text-[#66645e] max-w-xl leading-relaxed">
          One engine. Three connected systems. Resume signals feed interviews, interviews feed the roadmap, roadmap progress raises your readiness score.
        </p>
      </section>

      {/* Stats 3-Column Section */}
      <section className="w-full border-b border-[#e2e0d6]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e0d6]">
          {/* Column 1: ATS Score */}
          <div
            style={{ paddingLeft: '40px', paddingRight: '40px' }}
            className="py-10 flex flex-col justify-between"
          >
            <div className="font-mono text-[11px] tracking-[0.12em] text-[#66645e] uppercase mb-10">
              ATS SCORE
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-sans font-black text-6xl lg:text-7xl text-[#111110]">
                82
              </span>
              <span className="font-mono text-base text-[#88857d] font-normal">
                / 100
              </span>
            </div>
          </div>

          {/* Column 2: Interview Readiness */}
          <div
            style={{ paddingLeft: '40px', paddingRight: '40px' }}
            className="py-10 flex flex-col justify-between"
          >
            <div className="font-mono text-[11px] tracking-[0.12em] text-[#66645e] uppercase mb-10">
              INTERVIEW READINESS
            </div>
            <div>
              <span className="font-sans font-black text-6xl lg:text-7xl text-[#111110]">
                74%
              </span>
            </div>
          </div>

          {/* Column 3: Roadmap Progress */}
          <div
            style={{ paddingLeft: '40px', paddingRight: '40px' }}
            className="py-10 flex flex-col justify-between"
          >
            <div className="font-mono text-[11px] tracking-[0.12em] text-[#66645e] uppercase mb-10">
              ROADMAP PROGRESS
            </div>
            <div>
              <span className="font-sans font-black text-6xl lg:text-7xl text-[#111110]">
                35%
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OverviewPage
