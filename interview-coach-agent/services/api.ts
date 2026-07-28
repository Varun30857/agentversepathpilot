/**
 * services/api.ts
 *
 * Client-side service API wrapper for interacting with the Next.js API routes.
 * Standardizes fetch calls, error handling, and request-response patterns.
 */

import { InterviewConfig, Message } from '@/types/interview';

export interface APIError {
  message: string;
  status?: number;
}

/**
 * Sends chat transcripts to the backend interview route to generate the next response.
 * Can request the next follow-up message or a final evaluation report.
 */
export async function sendInterviewResponse(
  messages: Message[],
  config: InterviewConfig,
  isCompleted: boolean = false
): Promise<any> {
  const response = await fetch('/api/interview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages, config, isCompleted }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      message: errorData.error || `HTTP error! status: ${response.status}`,
      status: response.status,
    } as APIError;
  }

  return response.json();
}
