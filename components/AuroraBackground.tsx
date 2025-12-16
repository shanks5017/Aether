import React from 'react';

const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-obsidian">
      {/* Orb 1: Violet - Reduced Opacity */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[100px] opacity-15 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(76,29,149,1) 0%, rgba(5,5,5,0) 70%)',
          animationDelay: '0s'
        }}
      />
      
      {/* Orb 2: Cyan - Reduced Opacity */}
      <div 
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,1) 0%, rgba(5,5,5,0) 70%)',
          animationDelay: '2s',
          animationDuration: '25s'
        }}
      />
      
      {/* Orb 3: Deep Blue - Reduced Opacity */}
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] rounded-full mix-blend-screen filter blur-[110px] opacity-15 animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,1) 0%, rgba(5,5,5,0) 70%)',
          animationDelay: '4s',
          animationDuration: '30s'
        }}
      />

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;