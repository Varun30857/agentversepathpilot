/**
 * agents/interview/parser.ts
 *
 * Provides utility methods to parse, clean, and deserialize text responses or JSON blobs
 * returned from the LLM completions endpoint.
 */

/**
 * Sanitizes markdown elements, code block wrappers, or leading/trailing whitespace
 * from LLM raw content blocks.
 */
export function sanitizeMarkdownJSON(rawText: string): string {
  let cleaned = rawText.trim();
  
  // Strip ```json and ``` if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```/, '');
  }
  
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  
  return cleaned.trim();
}

/**
 * Safely parses JSON strings, returning a fallback object if parsing fails.
 */
export function safeJSONParse<T = any>(rawText: string, fallback: T): T {
  try {
    const cleaned = sanitizeMarkdownJSON(rawText);
    return JSON.parse(cleaned) as T;
  } catch (error) {
    console.error('Failed to parse LLM response as JSON:', error);
    return fallback;
  }
}
