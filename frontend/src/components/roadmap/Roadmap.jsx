import React from 'react';
import RoadmapHeader from './RoadmapHeader';
import RoadmapStep from './RoadmapStep';
import RoadmapArrow from './RoadmapArrow';

const Roadmap = ({ data }) => {
  if (!data) return null;

  const steps = data.steps || [];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 md:px-4 py-6 md:py-8 flex flex-col items-center">
      {/* Centered Summary Header */}
      <RoadmapHeader data={data} />

      {/* Centered Steps Flow */}
      <div className="w-full flex flex-col items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id || index}>
            <RoadmapStep step={step} stepNumber={index + 1} />
            {index < steps.length - 1 && <RoadmapArrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
