/**
 * utils/constants.ts
 *
 * Defines application-wide constants, static list options, and model configurations.
 */

export const GROQ_MODELS = {
  DEFAULT: 'llama3-8b-8192',
  PREMIUM: 'llama3-70b-8192',
  FAST: 'gemma2-9b-it',
};

export const INTERVIEW_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

export const FOCUS_AREAS = [
  'General Technical',
  'System Design',
  'Data Structures & Algorithms',
  'Behavioral',
] as const;

export const DEFAULT_QUESTIONS = [
  {
    id: 'q1',
    text: 'Tell me about yourself and your experience related to your target role.',
    focusArea: 'Introductory / Behavioral',
    suggestedPoints: ['Brief summary of experience', 'Relevance to role details', 'Recent achievements'],
  },
  {
    id: 'q2',
    text: 'Can you describe a challenging technical problem you solved recently?',
    focusArea: 'Technical Problem Solving',
    suggestedPoints: ['Describe the problem clearly', 'Explain the choices and trade-offs', 'Provide the outcome and metrics'],
  },
];
