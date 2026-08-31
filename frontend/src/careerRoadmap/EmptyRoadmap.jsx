import { memo } from 'react'
import { FiTarget, FiZap, FiFolder, FiTrendingUp } from 'react-icons/fi'

const features = [
  { icon: FiTarget, label: 'Current skills' },
  { icon: FiZap, label: 'Experience' },
  { icon: FiFolder, label: 'Projects' },
  { icon: FiTrendingUp, label: 'Career goal & skill gaps' }
]

const EmptyRoadmap = () => (
  <div className="flex flex-col items-center justify-center text-center h-full py-10">
    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
      <span className="text-2xl">✨</span>
    </div>
    <h3 className="text-white font-semibold text-lg">Your roadmap will appear here</h3>
    <p className="text-sm text-zinc-500 mt-2 max-w-xs">
      Start chatting with your AI Career Coach. It will analyze your:
    </p>

    <div className="mt-5 space-y-2 w-full max-w-[260px]">
      {features.map((f) => {
        const Icon = f.icon
        return (
          <div
            key={f.label}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 text-sm"
          >
            <Icon size={15} className="text-red-400 shrink-0" />
            {f.label}
          </div>
        )
      })}
    </div>

    <p className="text-xs text-zinc-600 mt-6">
      ...and create your personalized roadmap.
    </p>
  </div>
)

export default memo(EmptyRoadmap)
