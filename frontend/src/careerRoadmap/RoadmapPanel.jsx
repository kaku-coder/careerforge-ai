import { useState, useMemo } from 'react'
import { FiTrendingUp, FiChevronDown, FiChevronUp, FiTarget, FiCheck } from 'react-icons/fi'
import CareerProfile from './CareerProfile'
import RoadmapNode from './RoadmapNode'
import EmptyRoadmap from './EmptyRoadmap'

const RoadmapPanel = ({ profile, roadmap, started, onMarkCompleted, isUpdatingRoadmap }) => {
  const [expandedId, setExpandedId] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)

  const items = useMemo(() => {
    const arr = roadmap?.items || []
    return [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }, [roadmap])

  const progress = roadmap?.progress ?? 0
  const currentStep = roadmap?.currentStep || ''
  const total = items.filter((i) => i.status !== 'goal').length
  const completed = items.filter((i) => i.status === 'completed').length

  const currentIndex = items.findIndex((i) => i.status === 'current')

  const toggleExpand = (id) => setExpandedId((prev) => (prev === id ? null : id))

  return (
    <div className="flex flex-col h-[70vh] lg:h-[calc(100vh-200px)] min-h-[480px] rounded-2xl bg-[#101013]/80 border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden">
      {/* Roadmap header */}
      <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="font-semibold text-white">YOUR CAREER ROADMAP</span>
          </div>
          {isUpdatingRoadmap && (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-red-300">
              <span className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              ✨ Updating your roadmap...
            </span>
          )}
        </div>

        {currentStep && (
          <p className="text-xs text-zinc-500 mt-1 font-medium">{currentStep}</p>
        )}

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400">Career Progress</span>
            <span className="font-mono text-zinc-200 font-semibold">{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-500">
            <FiTrendingUp size={12} className="text-red-400" />
            <span>{completed} of {total} skills completed</span>
          </div>
        </div>
      </div>

      {/* Collapsible profile */}
      <div className="border-b border-white/10">
        <button
          type="button"
          onClick={() => setProfileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
          aria-expanded={profileOpen}
        >
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Your Profile
          </span>
          {profileOpen ? (
            <FiChevronUp size={16} className="text-zinc-500" />
          ) : (
            <FiChevronDown size={16} className="text-zinc-500" />
          )}
        </button>
        {profileOpen && (
          <div className="px-5 pb-4 animate-in slide-in-from-top-2 duration-200">
            <CareerProfile profile={profile} started={started} />
          </div>
        )}
      </div>

      {/* Roadmap content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 no-scrollbar">
        {!started || items.length === 0 ? (
          <EmptyRoadmap />
        ) : (
          <div className="space-y-1">
            {items.map((item, idx) => (
              <RoadmapNode
                key={item._id || idx}
                item={item}
                idx={idx}
                isCurrent={item.status === 'current'}
                isCurrentIndex={idx === currentIndex}
                expanded={expandedId === item._id}
                onToggle={() => toggleExpand(item._id)}
                onMarkCompleted={() => onMarkCompleted(item._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RoadmapPanel
