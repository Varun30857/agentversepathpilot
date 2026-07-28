"use client";

interface QuestionCardProps {
  question: string;
  questionNumber?: number;
}

export default function QuestionCard({
  question,
  questionNumber = 1,
}: QuestionCardProps) {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="text-sm uppercase tracking-wider opacity-80">
        Question {questionNumber}
      </div>

      <h2 className="text-2xl font-bold mt-2 mb-4">
        AI Interview Question
      </h2>

      <p className="text-lg leading-8">
        {question}
      </p>
    </div>
  );
}