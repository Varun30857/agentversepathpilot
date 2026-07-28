/**
 * services/groq.ts
 *
 * Configures and exports the central Groq SDK client instance.
 * All backend agents route their LLM generation calls through this service.
 */

import Groq from 'groq-sdk';

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey && typeof window === 'undefined') {
  console.warn('Warning: GROQ_API_KEY is not defined in the environment variables.');
}

export const groq = new Groq({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: false,
});
