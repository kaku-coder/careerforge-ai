import React from 'react';
import { FiCheckCircle, FiClock, FiPlayCircle, FiSkipForward, FiInfo } from 'react-icons/fi';
import ProgressBar from './ProgressBar';
import RoadmapTopic from './RoadmapTopic';
import RoadmapProject from './RoadmapProject';

const statusConfig = {
  completed: {
    label: 'COMPLETED',
    icon: FiCheckCircle,
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  in_progress: {
    label: 'IN PROGRESS',
    icon: FiPlayCircle,
    badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30 ring-1 ring-indigo-500/20'
  },
  not_started: {
    label: 'NOT STARTED',
    icon: FiClock,
    badgeClass: 'bg-zinc-800/80 text-zinc-400 border-zinc-700/50'
  },
  skipped: {
    label: 'SKIPPED',
    icon: FiSkipForward,
    badgeClass: 'bg-zinc-900 text-zinc-500 border-zinc-800 line-through'
  }
};

const RoadmapStep = ({ step, stepNumber }) => {
  if (!step) return null;

  const currentStatus = statusConfig[step.status] || statusConfig.not_started;
  const StatusIcon = currentStatus.icon;

  const totalTopics = step.topics ? step.topics.length : 0;
  const completedTopics = step.topics ? step.topics.filter(t => t.completed).length : 0;
  const stepProgress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const formattedOrder = String(stepNumber || step.order || 1).padStart(2, '0');

  return (
    <div className={`w-full max-w-3xl mx-auto rounded-2xl bg-[#111113] border border-white/10 p-6 md:p-8 shadow-2xl transition-all duration-300 hover:border-white/20 relative overflow-hidden ${
      step.status === 'in_progress' ? 'ring-1 ring-indigo-500/30' : ''
    }`}>
      {/* Step Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3.5">
          <span className="text-2xl font-extrabold text-zinc-500 font-mono tracking-tight">
            {formattedOrder}
          </span>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {step.title}
            </h3>
            {step.subtitle && (
              <p className="text-xs text-zinc-400 font-medium mt-0.5">
                {step.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {step.duration && (
            <span className="text-xs px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 border border-white/10 font-medium flex items-center gap-1.5 shadow-sm">
              <FiClock className="w-3.5 h-3.5 text-zinc-400" />
              {step.duration}
            </span>
          )}
          <span className={`text-[11px] font-semibold tracking-wider px-3 py-1 rounded-full border flex items-center gap-1.5 shadow-sm ${currentStatus.badgeClass}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {currentStatus.label}
          </span>
        </div>
      </div>

      {/* Why This Step Box with Generous Internal Padding */}
      {step.reason && (
        <div className="mt-5 p-4 md:p-5 rounded-xl bg-zinc-950/70 border border-white/10 shadow-inner">
          <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1.5 flex items-center gap-1.5">
            <FiInfo className="w-3.5 h-3.5" /> Why This Step?
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-normal">
            {step.reason}
          </p>
        </div>
      )}

      {/* Topics Progress Bar with Spacing */}
      {totalTopics > 0 && (
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium tracking-wide">Topics Progress</span>
            <span className="text-zinc-300 font-mono font-semibold">{completedTopics}/{totalTopics} ({stepProgress}%)</span>
          </div>
          <ProgressBar progress={stepProgress} className="h-2.5" />
        </div>
      )}

      {/* Topics List with Vertical Gap */}
      {step.topics && step.topics.length > 0 && (
        <div className="mt-5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Topics ({totalTopics})
          </div>
          <div className="space-y-1.5">
            {step.topics.map((topic, idx) => (
              <RoadmapTopic key={idx} topic={topic} />
            ))}
          </div>
        </div>
      )}

      {/* Practical Project Component */}
      {step.project && <RoadmapProject project={step.project} />}
    </div>
  );
};

export default RoadmapStep;
