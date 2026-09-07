import React, { useState } from 'react';
import { FiCheck, FiChevronDown, FiHelpCircle, FiZap } from 'react-icons/fi';

const RoadmapTopic = ({ topic }) => {
  const [expanded, setExpanded] = useState(false);

  if (!topic) return null;

  return (
    <div className="rounded-xl bg-zinc-950/60 border border-white/10 overflow-hidden transition-all hover:border-white/20 shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left focus:outline-none transition-colors hover:bg-zinc-800/40"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${
              topic.completed
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-zinc-800 text-zinc-500 border border-white/10'
            }`}
          >
            {topic.completed ? <FiCheck className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />}
          </div>
          <span
            className={`text-sm font-medium truncate ${
              topic.completed ? 'text-zinc-300 line-through decoration-zinc-600' : 'text-zinc-200'
            }`}
          >
            {topic.title}
          </span>
        </div>

        <FiChevronDown
          className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
            expanded ? 'rotate-180 text-indigo-400' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="px-4 pb-3.5 pt-2 border-t border-white/10 bg-zinc-900/40 space-y-2.5 text-xs">
          {topic.reason && (
            <div className="flex items-start gap-2.5 text-zinc-300 leading-relaxed">
              <FiHelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-indigo-300 mr-1.5">Why:</span>
                {topic.reason}
              </div>
            </div>
          )}

          {topic.action && (
            <div className="flex items-start gap-2.5 text-zinc-300 leading-relaxed">
              <FiZap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 mr-1.5">Action:</span>
                {topic.action}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoadmapTopic;
