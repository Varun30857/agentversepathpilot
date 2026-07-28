"use client";

import React, { useEffect, useState } from "react";
import { CareerResponse } from "@/types/career";

interface CareerReportProps {
  data: CareerResponse;
  onReset: () => void;
}

export default function CareerReport({ data, onReset }: CareerReportProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate the score progress
    const target = data.placementReadiness;
    if (target === 0) return;

    const duration = 1200; // ms
    const stepTime = 16; // ms (~60fps)
    const totalSteps = duration / stepTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.min(target, Math.round(easeProgress * target));

      setAnimatedScore(currentVal);

      if (currentStep >= totalSteps) {
        setAnimatedScore(target);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [data.placementReadiness]);

  // Circle dimensions for SVG
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Determine readiness rating class
  const getReadinessStatus = (score: number) => {
    if (score < 50) return { label: "Needs Training", color: "text-red-400", border: "border-red-500/20", glow: "shadow-red-500/20" };
    if (score < 75) return { label: "Progressing", color: "text-amber-400", border: "border-amber-500/20", glow: "shadow-amber-500/20" };
    if (score < 90) return { label: "Market Ready", color: "text-green-400", border: "border-green-500/20", glow: "shadow-green-500/20" };
    return { label: "Industry Leader", color: "text-emerald-400", border: "border-emerald-500/20", glow: "shadow-emerald-500/20" };
  };

  const status = getReadinessStatus(data.placementReadiness);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header card with glow */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center gap-8">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Animated Radial Readiness Circle */}
        <div className="relative flex-shrink-0 flex flex-col items-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG circle */}
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-zinc-800"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Foreground circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-blue-500 transition-all duration-75"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{animatedScore}%</span>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Readiness</span>
            </div>
          </div>
          <div className={`mt-3 px-3 py-1 rounded-full border text-xs font-semibold ${status.color} ${status.border}`}>
            {status.label}
          </div>
        </div>

        {/* Executive Recommendation Summary */}
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Executive Advice Summary</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">Consolidated Analysis</h2>
          </div>
          <p className="text-zinc-300 leading-relaxed text-sm">
            {data.recommendation}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Recommended Companies */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-500" />
              Target Company Fits
            </h3>
            <p className="text-xs text-zinc-400">Based on your evaluation profile, these companies present the highest synergy.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.recommendedCompanies.map((company, index) => (
              <div
                key={company}
                className="relative overflow-hidden p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/20 backdrop-blur-sm shadow hover:border-zinc-700 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </div>
                {/* Visual Emblem */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 border border-blue-500/10">
                    {company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition">{company}</h4>
                    <span className="text-[10px] font-medium text-zinc-500">Tier-{index + 1} Target Match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Motivation section inside a beautiful gradient callout card */}
          <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-tr from-zinc-950 via-zinc-950/90 to-indigo-950/30 border border-zinc-800/60 shadow-lg">
            <div className="absolute top-2 left-2 text-6xl font-serif text-indigo-500/10 pointer-events-none">“</div>
            <div className="relative space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Advisor Mindset</span>
              <p className="text-sm italic font-medium text-zinc-350 leading-relaxed">
                "{data.motivation}"
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Roadmap timeline */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-violet-500" />
              Strategic Learning Roadmap
            </h3>
            <p className="text-xs text-zinc-400">Implement this sequenced roadmap to maximize your probability of placement.</p>
          </div>

          <div className="relative pl-6 space-y-6 border-l border-zinc-800/80 ml-3">
            {data.roadmap.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Step node indicator */}
                <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-violet-500 group-hover:bg-violet-500 group-hover:text-white transition duration-300">
                  {idx + 1}
                </div>
                
                {/* Step contents */}
                <div className="p-4 rounded-xl border border-zinc-850 bg-zinc-950/20 hover:border-zinc-800 hover:bg-zinc-950/40 transition duration-300">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Milestone {idx + 1}</h4>
                  <p className="text-sm text-zinc-200 leading-relaxed font-medium">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-center pt-8 border-t border-zinc-900">
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-sm font-bold text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 active:scale-98 transition duration-300"
        >
          Evaluate Another Candidate
        </button>
      </div>
    </div>
  );
}
