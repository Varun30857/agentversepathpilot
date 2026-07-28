"use client";

import React, { useState, KeyboardEvent } from "react";
import { CareerRequest } from "@/types/career";

interface CareerFormProps {
  onSubmit: (data: CareerRequest) => void;
  isLoading: boolean;
}

const PRESET_COMPANIES = ["Google", "Meta", "Netflix", "Stripe", "OpenAI", "Microsoft"];
const PRESET_ROLES = ["Frontend Engineer", "Fullstack Engineer", "AI Engineer", "Software Engineer", "Product Manager"];
const PRESET_STRENGTHS = ["React & Next.js", "TypeScript", "Problem Solving", "System Design", "Communication", "Data Structures"];
const PRESET_IMPROVEMENTS = ["System Design Scale", "Mock Interviews", "Database Optimization", "Behavioral Answers", "Algorithms"];

export default function CareerForm({ onSubmit, isLoading }: CareerFormProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [interviewScore, setInterviewScore] = useState<number>(75);
  
  const [strengths, setStrengths] = useState<string[]>([]);
  const [strengthInput, setStrengthInput] = useState("");

  const [improvements, setImprovements] = useState<string[]>([]);
  const [improvementInput, setImprovementInput] = useState("");

  const [error, setError] = useState<string | null>(null);

  // Add Strength tag
  const addStrength = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !strengths.includes(trimmed)) {
      setStrengths([...strengths, trimmed]);
      setStrengthInput("");
    }
  };

  const removeStrength = (index: number) => {
    setStrengths(strengths.filter((_, i) => i !== index));
  };

  // Add Improvement tag
  const addImprovement = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !improvements.includes(trimmed)) {
      setImprovements([...improvements, trimmed]);
      setImprovementInput("");
    }
  };

  const removeImprovement = (index: number) => {
    setImprovements(improvements.filter((_, i) => i !== index));
  };

  const handleKeyDownStrength = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStrength(strengthInput);
    }
  };

  const handleKeyDownImprovement = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImprovement(improvementInput);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) {
      setError("Please specify a target company.");
      return;
    }
    if (!role) {
      setError("Please specify a target role.");
      return;
    }
    if (strengths.length === 0) {
      setError("Please add at least one strength.");
      return;
    }
    if (improvements.length === 0) {
      setError("Please add at least one area for improvement.");
      return;
    }

    setError(null);
    onSubmit({
      company,
      role,
      interviewScore,
      strengths,
      improvements
    });
  };

  // Dynamic feedback for the score slider
  const getScoreFeedback = (score: number) => {
    if (score < 50) return { label: "Needs Significant Improvement", color: "text-red-400 border-red-500/20 bg-red-500/5" };
    if (score < 75) return { label: "Decent / Near Average", color: "text-amber-400 border-amber-500/20 bg-amber-500/5" };
    if (score < 90) return { label: "Strong Candidate", color: "text-green-400 border-green-500/20 bg-green-500/5" };
    return { label: "Elite Readiness!", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" };
  };

  const scoreFeedback = getScoreFeedback(interviewScore);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-8 bg-zinc-950/40 p-6 sm:p-10 rounded-3xl border border-zinc-800/80 backdrop-blur-md shadow-xl">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white bg-gradient-to-r from-blue-400 to-indigo-200 bg-clip-text text-transparent">
          Candidate Evaluation Details
        </h2>
        <p className="text-sm text-zinc-400">
          Provide information from the previous pipeline runs to get a consolidated final report.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: General Profile */}
        <div className="space-y-6">
          {/* Target Company */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-200">Target Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
            />
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {PRESET_COMPANIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCompany(c)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition ${
                    company === c
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/40"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Target Role */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-200">Target Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
            />
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {PRESET_ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition ${
                    role === r
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/40"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Interview Score Slider */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-zinc-200">Interview Performance Score</label>
              <span className="text-lg font-black text-white bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-850">
                {interviewScore}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={interviewScore}
              onChange={(e) => setInterviewScore(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-zinc-900 appearance-none cursor-pointer accent-blue-500 focus:outline-none"
            />
            <div className={`mt-2 p-2 px-3 text-xs rounded-lg border text-center font-medium ${scoreFeedback.color}`}>
              {scoreFeedback.label}
            </div>
          </div>
        </div>

        {/* Right Side: Skill Tags */}
        <div className="space-y-6">
          {/* Strengths Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-200">Candidate Strengths</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={strengthInput}
                onChange={(e) => setStrengthInput(e.target.value)}
                onKeyDown={handleKeyDownStrength}
                placeholder="Type and press Enter"
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
              />
              <button
                type="button"
                onClick={() => addStrength(strengthInput)}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-350 hover:text-white hover:border-zinc-700 transition"
              >
                +
              </button>
            </div>
            {/* Tag container */}
            <div className="flex flex-wrap gap-1.5 py-1 min-h-[40px]">
              {strengths.map((str, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  {str}
                  <button
                    type="button"
                    onClick={() => removeStrength(idx)}
                    className="hover:text-red-400 transition"
                  >
                    &times;
                  </button>
                </span>
              ))}
              {strengths.length === 0 && (
                <span className="text-xs text-zinc-500 italic flex items-center">No strengths added yet.</span>
              )}
            </div>
            {/* Presets */}
            <div className="flex flex-wrap gap-1 mt-1">
              {PRESET_STRENGTHS.map((ps) => (
                <button
                  key={ps}
                  type="button"
                  onClick={() => addStrength(ps)}
                  disabled={strengths.includes(ps)}
                  className="text-[10px] px-2 py-0.5 rounded bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-750 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  +{ps}
                </button>
              ))}
            </div>
          </div>

          {/* Improvements Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-200">Areas for Improvement</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={improvementInput}
                onChange={(e) => setImprovementInput(e.target.value)}
                onKeyDown={handleKeyDownImprovement}
                placeholder="Type and press Enter"
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
              />
              <button
                type="button"
                onClick={() => addImprovement(improvementInput)}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-350 hover:text-white hover:border-zinc-700 transition"
              >
                +
              </button>
            </div>
            {/* Tag container */}
            <div className="flex flex-wrap gap-1.5 py-1 min-h-[40px]">
              {improvements.map((imp, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                >
                  {imp}
                  <button
                    type="button"
                    onClick={() => removeImprovement(idx)}
                    className="hover:text-red-400 transition"
                  >
                    &times;
                  </button>
                </span>
              ))}
              {improvements.length === 0 && (
                <span className="text-xs text-zinc-500 italic flex items-center">No areas added yet.</span>
              )}
            </div>
            {/* Presets */}
            <div className="flex flex-wrap gap-1 mt-1">
              {PRESET_IMPROVEMENTS.map((pi) => (
                <button
                  key={pi}
                  type="button"
                  onClick={() => addImprovement(pi)}
                  disabled={improvements.includes(pi)}
                  className="text-[10px] px-2 py-0.5 rounded bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:border-zinc-750 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  +{pi}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Submission */}
      <div className="flex justify-end pt-4 border-t border-zinc-850">
        <button
          type="submit"
          disabled={isLoading}
          className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)] active:scale-98 disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating Evaluation Report...
            </span>
          ) : (
            "Generate Final Career Report"
          )}
        </button>
      </div>
    </form>
  );
}
