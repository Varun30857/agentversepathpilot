/**
 * agents/career-advisor/index.ts
 *
 * Entry point for the Career Advisor Agent.
 * This agent acts as the main orchestrator/concierge of the multi-agent system,
 * synthesizing information from all other agents to give strategic career advice.
 */

import { BaseAgent, AgentRole, AgentResponse } from '@/types/agent';

export class CareerAdvisorAgent implements BaseAgent<any, any> {
  name = 'Career Advisor Agent';
  role: AgentRole = 'career-advisor';

  async run(input: { profileData: any; roadmapData: any; interviewScores: number[] }): Promise<AgentResponse<any>> {
    const startTime = Date.now();
    try {
      // Mock synthesis report
      return {
        success: true,
        data: {
          summary: 'You are on track. Continue focusing on React Server Components, and practice behavioural STAR scenarios with your coach agent.',
          readinessPercentage: 82,
        },
        metadata: {
          latencyMs: Date.now() - startTime,
        },
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Career Advisor Agent failed to run.',
        metadata: {
          latencyMs: Date.now() - startTime,
        },
      };
    }
  }
}

export default CareerAdvisorAgent;
