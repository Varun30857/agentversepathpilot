import React from 'react';
import { UserCheck, Target, CalendarRange, CheckCircle2, Play, Sparkles } from 'lucide-react';

export function AgentWorkflow({ currentStep, onRunPipeline }) {
  const steps = [
    {
      id: 1,
      title: "Profile Ingestion",
      desc: "Ingests education, skills, projects & study hours",
      icon: UserCheck
    },
    {
      id: 2,
      title: "Goal Decomposition",
      desc: "Maps skill gaps & preferred domain requirements",
      icon: Target
    },
    {
      id: 3,
      title: "Schedule Generation",
      desc: "Creates progressive 4–8 week task curriculum",
      icon: CalendarRange
    },
    {
      id: 4,
      title: "JSON Output Ready",
      desc: "Structured roadmap payload formatted & validated",
      icon: CheckCircle2
    }
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Goal-Based AI Agent Pipeline
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous multi-phase process for creating personalized placement roadmap schedules
          </p>
        </div>

        <button
          onClick={onRunPipeline}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer transform active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>Execute Roadmap Agent Turn</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all ${
                isActive
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : isCompleted
                  ? 'bg-slate-900/80 border-slate-700/60'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${
                  isActive ? 'bg-emerald-500 text-slate-950' : isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : isCompleted
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-slate-900 text-slate-500'
                }`}>
                  Step {step.id}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-100 mb-1">
                {step.title}
              </h3>
              <p className="text-[11px] text-slate-400 leading-snug">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
