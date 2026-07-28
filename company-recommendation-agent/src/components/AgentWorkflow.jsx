import React from 'react';
import { Cpu, Building2, CheckCircle2, Sparkles, Database, Sliders } from 'lucide-react';

export function AgentWorkflow({ currentStep, onRunPipeline }) {
  return (
    <div className="glass-panel rounded-2xl p-5 mb-8 border border-slate-800 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Company Recommendation Agent Architecture
          </h2>
          <p className="text-xs text-slate-400">
            Utility-based agent turn execution: Profile JSON input to ranked company recommendations
          </p>
        </div>

        <button
          onClick={onRunPipeline}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Cpu className="w-4 h-4 animate-spin-slow" />
          Run Recommendation Agent Evaluation
        </button>
      </div>

      {/* Pipeline Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        
        {/* Step 1 */}
        <div className={`p-4 rounded-xl border transition-all ${
          currentStep >= 1 
            ? 'bg-slate-900/90 border-indigo-500/40 shadow-lg shadow-indigo-500/10' 
            : 'bg-slate-950/40 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10">
              Input Stage
            </span>
            <Database className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="text-xs font-bold text-slate-200 mb-1">Student Profile Payload</h3>
          <p className="text-[11px] text-slate-400">
            Degree, CGPA, skills, projects, certifications & preferred domain.
          </p>
        </div>

        {/* Step 2 */}
        <div className={`p-4 rounded-xl border transition-all ${
          currentStep >= 2 
            ? 'bg-slate-900/90 border-purple-500/40 shadow-lg shadow-purple-500/10' 
            : 'bg-slate-950/40 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-2 py-0.5 rounded bg-purple-500/10">
              Utility Scoring
            </span>
            <Sliders className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-xs font-bold text-slate-200 mb-1">Match Percentage Engine</h3>
          <p className="text-[11px] text-slate-400">
            Calculates 0–100 utility score for 20 tech catalog companies.
          </p>
        </div>

        {/* Step 3 */}
        <div className={`p-4 rounded-xl border transition-all ${
          currentStep >= 3 
            ? 'bg-slate-900/90 border-pink-500/40 shadow-lg shadow-pink-500/10' 
            : 'bg-slate-950/40 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 px-2 py-0.5 rounded bg-pink-500/10">
              Ranking & Reasons
            </span>
            <Building2 className="w-4 h-4 text-pink-400" />
          </div>
          <h3 className="text-xs font-bold text-slate-200 mb-1">Top 10 Selection</h3>
          <p className="text-[11px] text-slate-400">
            Sorts recommendations descending & generates 3 reasons per company.
          </p>
        </div>

        {/* Step 4 */}
        <div className={`p-4 rounded-xl border transition-all ${
          currentStep >= 4 
            ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-500/10' 
            : 'bg-slate-950/40 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
              Output Payload
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-xs font-bold text-slate-200 mb-1">Strict JSON Output</h3>
          <p className="text-[11px] text-slate-400">
            Top 10 ranked recommendations & best company fit object.
          </p>
        </div>

      </div>
    </div>
  );
}
