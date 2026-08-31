import { memo } from 'react'
import {
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiFlag,
  FiArrowRight,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi'

const statusConfig = {
  completed: {
    dot: 'bg-emerald-500',
    border: 'border-emerald-500/30',
    card: 'bg-white/[0.04] border-white/10',
    label: 'text-emerald-400'
  },
  current: {
    dot: 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]',
    border: 'border-red-500/60',
    card: 'bg-red-500/10 border-red-500/50',
    label: 'text-red-400'
  },
  next: {
    dot: 'bg-zinc-300',
    border: 'border-white/20',
    card: 'bg-white/[0.03] border-white/15',
    label: 'text-zinc-300'
  },
  upcoming: {
    dot: 'bg-zinc-600',
    border: 'border-white/10',
    card: 'bg-white/[0.02] border-white/10',
    label: 'text-zinc-500'
  },
  goal: {
    dot: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
    border: 'border-amber-500/50',
    card: 'bg-amber-500/[0.07] border-amber-500/40',
    label: 'text-amber-400'
  }
}

const priorityColor = {
  high: 'text-red-400 bg-red-500/10 border-red-500/30',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  low: 'text-zinc-400 bg-white/5 border-white/10'
}

const RoadmapNode = ({
  item,
  idx,
  isCurrent,
  expanded,
  onToggle,
  onMarkCompleted
}) => {
  const cfg = statusConfig[item.status] || statusConfig.upcoming
  const isCompleted = item.status === 'completed'
  const isGoal = item.status === 'goal'

  const icon = isCompleted ? (
    <FiCheck size={16} className="text-emerald-400" />
  ) : isGoal ? (
    <FiFlag size={16} className="text-amber-400" />
  ) : isCurrent ? (
    <span className="animate-pulse text-[10px] font-bold text-white">▶</span>
  ) : null

  return (
    <div className="relative pl-8">
      {/* connector line */}
      {!isGoal && (
        <span className="absolute left-[15px] top-8 bottom-[-4px] w-[2px] bg-white/10" />
      )}

      {/* dot */}
      <span
        className={`absolute left-[9px] top-[18px] w-3.5 h-3.5 rounded-full border-2 border-[#101013] ${cfg.dot} z-10`}
      />

      <div
        className={`rounded-xl border ${cfg.card} p-4 transition-all duration-300 cursor-pointer hover:border-white/25 group`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
        aria-expanded={expanded}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${cfg.border}`}
            >
              {icon}
            </div>
            <span className={`font-semibold truncate ${cfg.label}`}>{item.title}</span>
          </div>
          {expanded ? (
            <FiChevronUp size={16} className="text-zinc-500 shrink-0" />
          ) : (
            <FiChevronDown size={16} className="text-zinc-500 shrink-0" />
          )}
        </div>

        {isCurrent && !expanded && (
          <div className="mt-2 text-[11px] text-red-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Current Focus
          </div>
        )}

        {expanded && (
          <div className="mt-3 pt-3 border-t border-white/10 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <p className="text-xs text-zinc-400 leading-relaxed">{item.description || 'No description.'}</p>

            {isGoal ? (
              <div>
                <p className="text-[11px] text-zinc-500 mb-1">🎉 Target Role</p>
                <p className="text-sm text-amber-200 font-medium">
                  {item.projectSuggestion || 'Your final career goal.'}
                </p>
              </div>
            ) : (
              <>
                {item.whyNext && (
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3">
                    <div className="text-[11px] text-zinc-400 mb-1 flex items-center gap-1.5">
                      🤖 <span className="font-medium">Why this is your next step</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{item.whyNext}</p>
                  </div>
                )}

                {item.skills?.length > 0 && (
                  <div>
                    <div className="text-[11px] font-medium text-zinc-400 mb-1.5">What to learn</div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-zinc-300"
                        >
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <FiClock size={12} className="text-zinc-500" />
                    <span>
                      Estimated <span className="text-zinc-200 font-medium">{item.estimatedDays} days</span>
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border w-fit ${priorityColor[item.priority] || priorityColor.medium}`}
                  >
                    <FiAlertCircle size={11} />
                    <span className="uppercase text-[10px] tracking-wide">
                      {item.priority} priority
                    </span>
                  </div>
                </div>

                {item.interviewImportance && (
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                    🎤 Interview importance: <span className="text-zinc-200">{item.interviewImportance}</span>
                  </div>
                )}
              </>
            )}

            {isCompleted ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                <FiCheck size={13} /> Completed
              </div>
            ) : (
              !isGoal && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onMarkCompleted()
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <FiCheck size={13} />
                  Mark as Completed
                </button>
              )
            )}

            {!isGoal && (
              <div className="flex items-center gap-1.5 pt-1 text-[11px] text-zinc-500">
                <span>Next</span>
                <FiArrowRight size={12} />
                <span className="text-zinc-300">sequence node</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(RoadmapNode)
