import React from 'react';

const ProgressBar = ({ progress = 0, className = "" }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full bg-zinc-800/80 rounded-full h-2 overflow-hidden border border-white/5 ${className}`}>
      <div
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
