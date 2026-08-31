import { memo } from 'react'
import { FiTarget, FiBarChart2, FiCode, FiClock, FiCalendar } from 'react-icons/fi'

const CareerProfile = ({ profile, started }) => {
  if (!started || !profile) {
    return (
      <p className="text-xs text-zinc-500">
        Your profile details will appear here as you chat with the AI Career Coach.
      </p>
    )
  }

  const rows = [
    { icon: FiTarget, label: 'Target Role', value: profile.targetRole || '—' },
    { icon: FiBarChart2, label: 'Level', value: profile.currentLevel || '—' },
    {
      icon: FiCode,
      label: 'Skills',
      value: profile.skills?.length
        ? profile.skills.map((s) => s.name).join(', ')
        : '—'
    },
    {
      icon: FiClock,
      label: 'Learning Time',
      value: profile.dailyLearningTime
        ? `${Number(profile.dailyLearningTime)} hrs/day`
        : '—'
    },
    { icon: FiCalendar, label: 'Deadline', value: profile.deadline || '—' }
  ]

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 space-y-3">
      {rows.map((row) => {
        const Icon = row.icon
        return (
          <div key={row.label} className="flex items-start gap-2.5">
            <Icon size={14} className="text-red-400 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                {row.label}
              </div>
              <div className="text-xs text-zinc-200 font-medium break-words">{row.value}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(CareerProfile)
