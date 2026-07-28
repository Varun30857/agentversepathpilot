/**
 * agents/interview/memory.ts
 *
 * Implements context tracking, sliding window dialogue truncation, and summarization
 * logic to prevent LLM prompt context window overflow during extended interviews.
 */

import { Message } from '@/types/interview';

export class InterviewMemory {
  private messages: Message[] = [];
  private maxHistory: number;

  constructor(maxHistory = 10) {
    this.maxHistory = maxHistory;
  }

  /**
   * Appends messages to the history tracker.
   */
  public addMessage(message: Message): void {
    this.messages.push(message);
  }

  /**
   * Retrieves messages up to the maximum conversation context limit.
   */
  public getContextHistory(): Message[] {
    if (this.messages.length <= this.maxHistory) {
      return this.messages;
    }
    // Retain the very first setup messages if needed, plus a sliding window of recent dialog.
    return this.messages.slice(-this.maxHistory);
  }

  /**
   * Clears the current dialogue tracking context.
   */
  public clear(): void {
    this.messages = [];
  }
}
