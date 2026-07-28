/**
 * agents/skill-gap/index.ts
 *
 * Entry point for the Skill Gap Agent.
 * This agent compares a candidate's profile against target job descriptions
 * to identify missing technical/behavioral competencies.
 */

import { BaseAgent, AgentRole, AgentResponse } from '@/types/agent';

export class SkillGapAgent implements BaseAgent<any, any> {
  name = 'Skill Gap Agent';
  role: AgentRole = 'skill-gap';

  async run(input: { candidateSkills: string[]; targetRoleSkills: string[] }): Promise<AgentResponse<any>> {
    const startTime = Date.now();
    try {
      const gaps = input.targetRoleSkills.filter(s => !input.candidateSkills.includes(s));
      return {
        success: true,
        data: {
          missingSkills: gaps,
          gapPercentage: (gaps.length / input.targetRoleSkills.length) * 100,
        },
        metadata: {
          latencyMs: Date.now() - startTime,
        },
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Skill Gap Agent failed to run.',
        metadata: {
          latencyMs: Date.now() - startTime,
        },
      };
    }
  }
}

export default SkillGapAgent;
