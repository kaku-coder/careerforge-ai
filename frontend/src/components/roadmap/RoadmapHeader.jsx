import React from 'react';
import { FiCompass, FiClock, FiLayers, FiCheckCircle } from 'react-icons/fi';
import ProgressBar from './ProgressBar';

const RoadmapHeader = ({ data }) => {
  if (!data) return null;

  const totalSteps = data.steps ? data.steps.length : 0;
  const completedSteps = data.steps ? data.steps.filter(s => s.status === 'completed').length : 0;

  return (
    <div className="rounded-2xl bg-[#111113] border border-white/10 p-6 md:p-8 shadow-2xl mb-8 relative overflow-hidden text-center flex flex-col items-center justify-center">
      {/* Background Accent Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-indigo-500/15 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Category Badge */}
      <div className="inline-flex items-center justify-center mb-3">
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5 shadow-sm">
          <FiCompass className="w-3.5 h-3.5" />
          YOUR LEARNING ROADMAP
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2 text-center">
        {data.title}
      </h1>

      {/* Goal Pill */}
      {data.goal && (
        <p className="text-xs md:text-sm font-medium text-indigo-300/90 mb-3 inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/10">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          Goal: {data.goal}
        </p>
      )}

      {/* Summary Description */}
      {data.summary && (
        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto mb-6 text-center">
          {data.summary}
        </p>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 w-full max-w-lg mx-auto">
        {data.estimatedDuration && (
          <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 flex items-center justify-center gap-2.5 text-left">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <FiClock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Duration</div>
              <div className="text-xs font-bold text-zinc-200">{data.estimatedDuration}</div>
            </div>
          </div>
        )}

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 flex items-center justify-center gap-2.5 text-left">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
            <FiLayers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Total Steps</div>
            <div className="text-xs font-bold text-zinc-200">{totalSteps} Steps</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 flex items-center justify-center gap-2.5 text-left">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
            <FiCheckCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Completed</div>
            <div className="text-xs font-bold text-zinc-200">{completedSteps} / {totalSteps}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="w-full max-w-lg mx-auto space-y-2 pt-2 border-t border-white/5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300 tracking-wide uppercase text-[11px]">Overall Progress</span>
          <span className="font-mono font-bold text-indigo-400 text-sm">{data.progress}%</span>
        </div>
        <ProgressBar progress={data.progress} className="h-2.5" />
      </div>
    </div>
  );
};

export default RoadmapHeader;
