"use client";

import { useEffect, useState } from "react";

const messages = [
  "Connecting to PathPilot AI Memory...",
  "Gathering student interview scores & profiles...",
  "Analyzing skill gaps and technical benchmarks...",
  "Retrieving custom roadmap steps...",
  "Compiling strengths and improvements matrix...",
  "Synthesizing final career readiness recommendation..."
];

export default function Loader() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl transition-all duration-350">
      <div className="relative flex flex-col items-center p-8 max-w-md w-full mx-4 rounded-3xl border border-zinc-800/40 bg-zinc-950/70 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] text-center">
        {/* Glow Effects */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-violet-500/10 rounded-full blur-[60px] pointer-events-none" />

        {/* Animated Rings */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '1.2s' }} />
          <div className="absolute inset-2 rounded-full border-4 border-b-violet-500 border-t-transparent border-r-transparent border-l-transparent animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }} />
          <div className="absolute inset-4 rounded-full border-4 border-r-indigo-500 border-t-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '0.6s' }} />
          
          {/* Inner pulsating core */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 animate-pulse shadow-lg shadow-blue-500/50" />
        </div>

        {/* Loading Text */}
        <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-violet-400 bg-clip-text text-transparent">
          Career Advisor Agent
        </h3>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Generating Insights
        </p>

        {/* Dynamic cycling messages */}
        <div className="h-12 mt-6 flex items-center justify-center">
          <p className="text-sm font-medium text-zinc-300 animate-pulse max-w-[280px]">
            {messages[currentMessageIndex]}
          </p>
        </div>

        {/* Premium Progress Bar */}
        <div className="w-full h-1 mt-6 overflow-hidden rounded-full bg-zinc-900 relative">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 animate-infinite-loading absolute inset-y-0 left-0 w-1/2" />
        </div>
      </div>

      <style>{`
        @keyframes infinite-loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-infinite-loading {
          animation: infinite-loading 1.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
