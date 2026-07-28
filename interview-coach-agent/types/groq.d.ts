/**
 * types/groq.d.ts
 *
 * Ambient module declaration for 'groq-sdk' to allow TypeScript type checking
 * to succeed during the boilerplate/placeholder phase before dependencies are installed.
 */

declare module 'groq-sdk' {
  export default class Groq {
    constructor(options: { apiKey: string; dangerouslyAllowBrowser?: boolean });
    chat: {
      completions: {
        create(options: {
          messages: Array<{ role: string; content: string }>;
          model: string;
          temperature?: number;
        }): Promise<any>;
      };
    };
  }
}
