"use client";

import { useState } from "react";

interface Props {
  onStart: (
    company: string,
    role: string,
    difficulty: string
  ) => void;
}

export default function InterviewForm({ onStart }: Props) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 rounded-xl p-6 space-y-5">
      <h2 className="text-2xl font-bold">Interview Configuration</h2>

      <input
        className="w-full p-3 rounded bg-zinc-800"
        placeholder="Company (Google, Zoho...)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className="w-full p-3 rounded bg-zinc-800"
        placeholder="Role (Software Engineer...)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <select
        className="w-full p-3 rounded bg-zinc-800"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        onClick={() => onStart(company, role, difficulty)}
        className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-lg font-semibold"
      >
        Start Interview
      </button>
    </div>
  );
}