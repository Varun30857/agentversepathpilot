"use client";

import { useState } from "react";

interface Props {
  onStart: (
    company: string,
    role: string,
    difficulty: string,
    questionCount: number
  ) => void;
}

export default function InterviewForm({ onStart }: Props) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [questionCount, setQuestionCount] = useState(5);

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl space-y-6">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-2">
        Interview Configuration
      </h2>
      <p className="text-sm text-zinc-400 mb-6">
        Customize your mock interview parameters to begin a tailored assessment session.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-zinc-400 mb-2">Target Company</label>
          <input
            className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-650 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g. Google, Zoho, Meta, Amazon, Microsoft..."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-400 mb-2">Target Role</label>
          <input
            className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-650 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g. Full Stack Developer, Backend Engineer..."
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Difficulty Level</label>
            <select
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-400 mb-2">Number of Questions</label>
            <select
              className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
            >
              <option value={5}>5 Questions</option>
              <option value={6}>6 Questions</option>
              <option value={8}>8 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={12}>12 Questions</option>
              <option value={15}>15 Questions</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={() => onStart(company, role, difficulty, questionCount)}
        className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-4 px-8 rounded-xl font-bold tracking-wide shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-300 cursor-pointer"
      >
        Start Interview
      </button>
    </div>
  );
}