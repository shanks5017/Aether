import React from 'react';

const NoiseOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.07] mix-blend-overlay">
       <div className="absolute inset-0 bg-noise w-full h-full animate-pulse"></div>
    </div>
  );
};

export default NoiseOverlay;