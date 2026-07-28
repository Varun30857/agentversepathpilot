/**
 * types/agent.ts
 *
 * Defines shared interfaces and types for the multi-agent AI system.
 * Standardizes communication contracts and lifecycle methods for all agents.
 */

export type AgentRole =
  | 'profile'          // Profile Intelligence Agent
  | 'skill-gap'        // Skill Gap Agent
  | 'roadmap'          // Learning Roadmap Agent
  | 'company'          // Company Recommendation Agent
  | 'interview'        // Interview Coach Agent
  | 'career-advisor';  // Career Advisor Agent

export interface AgentMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AgentResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    latencyMs?: number;
    tokensUsed?: number;
    modelName?: string;
  };
}

export interface BaseAgent<TInput = any, TOutput = any> {
  name: string;
  role: AgentRole;
  run(input: TInput): Promise<AgentResponse<TOutput>>;
}
