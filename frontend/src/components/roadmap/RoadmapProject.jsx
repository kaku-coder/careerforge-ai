import React from 'react';
import { FiTarget, FiCode } from 'react-icons/fi';

const RoadmapProject = ({ project }) => {
  if (!project) return null;

  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <div className="rounded-2xl bg-zinc-950/80 border border-white/10 p-5 md:p-6 transition-all hover:border-indigo-500/40 shadow-inner">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FiTarget className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Practical Project
          </span>
        </div>

        <h4 className="text-base md:text-lg font-bold text-white mb-1.5">
          {project.title}
        </h4>

        {project.description && (
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-4">
            {project.description}
          </p>
        )}

        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-xs text-zinc-500 font-medium flex items-center gap-1 mr-1">
              <FiCode className="w-3.5 h-3.5" /> Skills:
            </span>
            {project.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900 text-zinc-200 border border-white/10 shadow-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapProject;
