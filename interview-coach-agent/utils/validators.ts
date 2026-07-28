/**
 * utils/validators.ts
 *
 * Implements validation schemas and type guards to check data integrity
 * before processing configurations or API payloads.
 */

import { InterviewConfig } from '@/types/interview';

/**
 * Validates candidate configuration input fields.
 */
export function validateInterviewConfig(config: any): config is InterviewConfig {
  if (!config || typeof config !== 'object') return false;

  const { role, company, difficulty } = config;

  if (typeof role !== 'string' || !role.trim()) return false;
  if (typeof company !== 'string' || !company.trim()) return false;

  const validDifficulties = ['easy', 'medium', 'hard'];

  if (
    typeof difficulty !== "string" ||
    !validDifficulties.includes(difficulty.toLowerCase())
  ) {
    return false;
  }
  return true;
}

/**
 * Ensures message history contains valid roles and content strings.
 */
export function validateMessageHistory(messages: any[]): boolean {
  if (!Array.isArray(messages)) return false;

  const validRoles = ['user', 'assistant', 'system'];

  return messages.every((msg) => {
    if (!msg || typeof msg !== 'object') return false;
    const { role, content } = msg;
    return validRoles.includes(role) && typeof content === 'string' && content.trim().length > 0;
  });
}
