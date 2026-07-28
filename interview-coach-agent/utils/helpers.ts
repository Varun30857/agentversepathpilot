/**
 * utils/helpers.ts
 *
 * Generic, framework-agnostic helper functions used across the application.
 */

/**
 * Combines Tailwind CSS class names filtering out falsy values.
 * Offers a lightweight fallback for libraries like clsx and tailwind-merge.
 */
export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

/**
 * Helper to format date timestamps consistently.
 */
export function formatTimestamp(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Generates a clean random string identifier (UUID fallback).
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
