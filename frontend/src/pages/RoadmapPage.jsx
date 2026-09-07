import React, { useState } from 'react';
import { FiCompass, FiMessageSquare } from 'react-icons/fi';
import Roadmap from '../components/roadmap/Roadmap';
import RoadmapChat from '../components/roadmap/RoadmapChat';

const RoadmapPage = () => {
  const [roadmapData, setRoadmapData] = useState(null);

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Main Split-Screen Content Layout */}
      <main className="flex-1 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1500px] w-full mx-auto lg:items-start">
        {/* Left Side: AI Chat Assistant (5 Columns) */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 lg:self-start h-[600px] lg:h-[calc(100vh-68px)]">
          <RoadmapChat onRoadmapUpdate={(newRoadmap) => setRoadmapData(newRoadmap)} />
        </div>

        {/* Right Side: Centered Visual Interactive Roadmap (7 Columns) */}
        <div className="lg:col-span-7 lg:h-[calc(100vh-68px)] overflow-y-auto pr-1 no-scrollbar flex justify-center items-start">
          {roadmapData ? (
            <Roadmap data={roadmapData} />
          ) : (
            <div className="w-full min-h-[420px] lg:min-h-full flex items-center justify-center">
              <div className="text-center px-6 py-12 rounded-2xl border border-white/10 bg-[#111113] max-w-md w-full mx-auto my-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                  <FiCompass className="w-8 h-8" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-white tracking-tight mb-2">
                  Your Roadmap Will Appear Here
                </h2>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed mb-6">
                  Ask the AI Career Assistant on the left to create a roadmap — for example{' '}
                  <span className="text-indigo-300 font-medium">"Create a DevOps Engineer roadmap"</span>{' '}
                  or{' '}
                  <span className="text-indigo-300 font-medium">"Build a MERN Stack roadmap"</span>.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/60 border border-white/10 text-zinc-400 text-xs">
                  <FiMessageSquare className="w-4 h-4 text-indigo-400" />
                  Start a chat to generate your roadmap
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RoadmapPage;