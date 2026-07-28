"use client";

import { useState } from "react";
import InterviewForm from "@/components/InterviewForm";
import QuestionCard from "@/components/QuestionCard";
import Loader from "@/components/Loader";
import { useInterview } from "@/hooks/useInterview";

export default function InterviewPage() {
  const { loading, sendMessage } = useInterview();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [nextQuestion, setNextQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");

  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [strengths, setStrengths] = useState<string[] | null>(null);
  const [improvements, setImprovements] = useState<string[] | null>(null);

  const [isCompleted, setIsCompleted] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const [showEvaluation, setShowEvaluation] = useState(false);
  const [viewingReport, setViewingReport] = useState(false);

  async function startInterview(c: string, r: string, d: string) {
    setCompany(c);
    setRole(r);
    setDifficulty(d);

    const res = await sendMessage("Start Interview", c, r, d);

    if (res && res.question) {
      setCurrentQuestion(res.question);
      setNextQuestion(res.question);
    }
    
    setQuestionNumber(1);
    setEvaluation(null);
    setScore(null);
    setStrengths(null);
    setImprovements(null);
    setIsCompleted(false);
    setReport(null);
    setShowEvaluation(false);
    setViewingReport(false);
    setAnswer("");
    setSubmittedAnswer("");
  }

  async function submitAnswer() {
    if (!answer.trim()) return;

    setSubmittedAnswer(answer);
    const res = await sendMessage(answer, company, role, difficulty);

    if (res) {
      setEvaluation(res.feedback);
      setScore(res.score);
      setStrengths(res.strengths);
      setImprovements(res.improvements);
      setNextQuestion(res.question);
      setIsCompleted(!!res.isCompleted);
      setReport(res.report);
      setShowEvaluation(true);
    }
  }

  function handleNextQuestion() {
    setCurrentQuestion(nextQuestion);
    setQuestionNumber((prev) => prev + 1);
    setEvaluation(null);
    setScore(null);
    setStrengths(null);
    setImprovements(null);
    setShowEvaluation(false);
    setAnswer("");
    setSubmittedAnswer("");
  }

  function handleViewReport() {
    setViewingReport(true);
  }

  function handleRestart() {
    setCompany("");
    setRole("");
    setDifficulty("");
    setQuestionNumber(1);
    setCurrentQuestion("");
    setNextQuestion("");
    setAnswer("");
    setSubmittedAnswer("");
    setEvaluation(null);
    setScore(null);
    setStrengths(null);
    setImprovements(null);
    setIsCompleted(false);
    setReport(null);
    setShowEvaluation(false);
    setViewingReport(false);
  }

  return (
    <div className="max-w-5xl mx-auto p-8 min-h-screen text-zinc-100">
      <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
        AI Interview Coach
      </h1>

      {!currentQuestion && (
        <div className="mt-8 transition-all duration-300">
          <InterviewForm onStart={startInterview} />
        </div>
      )}

      {currentQuestion && (
        <div className="space-y-8 mt-6">
          {viewingReport ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Final Interview Report
              </h2>
              {report && (
                <div className="text-zinc-300 whitespace-pre-line leading-relaxed text-lg bg-zinc-950/50 p-6 rounded-xl border border-zinc-800">
                  {report}
                </div>
              )}
              <button
                onClick={handleRestart}
                className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-4 rounded-xl font-bold tracking-wide shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all duration-300 cursor-pointer"
              >
                Start New Interview
              </button>
            </div>
          ) : (
            <>
              <QuestionCard question={currentQuestion} questionNumber={questionNumber} />

              {/* Your Answer Input Section */}
              {!showEvaluation ? (
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl space-y-4">
                  <h3 className="text-xl font-bold text-zinc-200">Your Answer</h3>
                  <textarea
                    className="w-full bg-zinc-950 p-4 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-zinc-100 placeholder-zinc-500 transition-all duration-200"
                    rows={6}
                    placeholder="Type your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <button
                    onClick={submitAnswer}
                    disabled={loading || !answer.trim()}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-violet-500/20 transition-all duration-300 cursor-pointer"
                  >
                    Submit Answer
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Read-only Submitted Answer */}
                  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl shadow-md">
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Your Answer</h3>
                    <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{submittedAnswer}</p>
                  </div>

                  {/* Feedback Evaluation Section */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-4 gap-4">
                      <h3 className="text-2xl font-bold text-zinc-100">Evaluation</h3>
                      {score !== null && score !== undefined && (
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-400 font-medium">Score:</span>
                          <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full font-bold text-lg">
                            {score}/10
                          </span>
                        </div>
                      )}
                    </div>

                    {evaluation && (
                      <p className="text-zinc-300 leading-relaxed text-lg">{evaluation}</p>
                    )}

                    {/* Strengths */}
                    {strengths && strengths.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {strengths.map((str, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                              <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements */}
                    {improvements && improvements.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                          Improvements
                        </h4>
                        <ul className="space-y-2">
                          {improvements.map((imp, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                              <span className="text-amber-400 font-bold mt-0.5">•</span>
                              <span>{imp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="pt-4 border-t border-zinc-800">
                      {isCompleted ? (
                        <button
                          onClick={handleViewReport}
                          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-3.5 px-8 rounded-xl font-bold tracking-wide shadow-lg shadow-violet-500/20 transition-all duration-300 cursor-pointer"
                        >
                          View Final Report
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-3.5 px-8 rounded-xl font-bold tracking-wide shadow-lg shadow-violet-500/20 transition-all duration-300 cursor-pointer"
                        >
                          Next Question
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {loading && <Loader />}
    </div>
  );
}