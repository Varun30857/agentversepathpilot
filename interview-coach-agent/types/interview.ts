export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface InterviewConfig {
  company: string;
  role: string;
  difficulty: string;
}

export interface InterviewSession {
  id: string;
  config: InterviewConfig;
  currentQuestionIndex: number;
  questions: string[];
  messages: Message[];
  isCompleted: boolean;
}

export interface InterviewRequest {
  company: string;
  role: string;
  difficulty: string;
  messages: Message[];
}

export interface InterviewResponse {
  role: "assistant";
  question: string | null;
  content: string;
  feedback: string | null;
  score: number | null;
  strengths: string[] | null;
  improvements: string[] | null;
  nextQuestion: string | null;
  isCompleted?: boolean;
  report?: string | null;
}

export interface InterviewFeedback {
  overallScore: number;
  qualitativeFeedback: string;
  strengths: string[];
  weaknesses: string[];
  tips: string[];
}