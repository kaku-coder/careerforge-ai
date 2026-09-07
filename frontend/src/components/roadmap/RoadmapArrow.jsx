import React from 'react';
import { FiArrowDown } from 'react-icons/fi';

const RoadmapArrow = () => {
  return (
    <div className="flex flex-col items-center justify-center my-4 py-1 group">
      <div className="w-0.5 h-7 bg-gradient-to-b from-indigo-500/40 via-purple-500/30 to-zinc-700/50 group-hover:from-indigo-400 group-hover:to-purple-400 transition-colors" />
      <div className="p-2 rounded-full bg-[#111113] border border-white/10 text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/40 transition-all shadow-lg">
        <FiArrowDown className="w-4 h-4" />
      </div>
      <div className="w-0.5 h-7 bg-gradient-to-b from-zinc-700/50 via-purple-500/30 to-indigo-500/40 group-hover:from-purple-400 group-hover:to-indigo-400 transition-colors" />
    </div>
  );
};

export default RoadmapArrow;
