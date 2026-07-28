"use client";

import CareerForm from "@/components/CareerForm";
import CareerReport from "@/components/CareerReport";
import Loader from "@/components/Loader";
import { useCareer } from "@/hooks/useCareer";

export default function CareerPage() {
  const { loading, error, data, getCareerAdvice, reset } = useCareer();

  return (
    <div className="flex-1 min-h-screen bg-black text-zinc-100 flex flex-col font-sans select-none overflow-x-hidden relative">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="relative w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-zinc-900/60 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            P
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-none">PathPilot AI</h1>
            <span className="text-[9px] text-zinc-500 font-semibold tracking-wider uppercase">Hackathon Core</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-zinc-400 font-semibold">Advisor Agent Online</span>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="relative flex-1 max-w-5xl w-full mx-auto px-6 py-12 sm:py-16 flex flex-col justify-center items-center z-10">
        
        {/* Decorative badge */}
        <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800/80 bg-zinc-950/60 text-[10px] font-bold text-zinc-400 shadow-inner">
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500" />
          Consolidated Pipelines Final Agent
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-450 bg-clip-text text-transparent">
            Career Advisor Agent
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Consolidating metrics from the Profile, Skill Gap, Company Fit, and Interview Coach agents to generate your personalized placement forecast.
          </p>
        </div>

        {/* Dynamic rendering states */}
        {loading && <Loader />}
        
        {!loading && data ? (
          <CareerReport data={data} onReset={reset} />
        ) : (
          <div className="w-full">
            {error && (
              <div className="max-w-4xl mx-auto mb-6 p-4 rounded-2xl bg-red-950/20 border border-red-800/30 text-red-400 text-xs font-semibold">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}
            <CareerForm onSubmit={getCareerAdvice} isLoading={loading} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-[10px] text-zinc-650 border-t border-zinc-950 bg-black/40 z-10">
        &copy; {new Date().getFullYear()} PathPilot AI. All rights reserved.
      </footer>
    </div>
  );
}