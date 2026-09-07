import React, { useState } from 'react';
import Roadmap from '../components/roadmap/Roadmap';
import RoadmapChat from '../components/roadmap/RoadmapChat';
import mockRoadmapData from '../data/roadmapData.js';

const RoadmapPage = () => {
  const [roadmapData, setRoadmapData] = useState(mockRoadmapData);

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
          <Roadmap data={roadmapData} />
        </div>
      </main>
    </div>
  );
};

export default RoadmapPage;
