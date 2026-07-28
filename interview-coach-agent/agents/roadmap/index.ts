/**
 * agents/roadmap/index.ts
 *
 * Entry point for the Learning Roadmap Agent.
 * This agent generates personalized, weekly structured study guides and resources
 * to help candidates bridge identified skill gaps.
 */

import { BaseAgent, AgentRole, AgentResponse } from '@/types/agent';

export class LearningRoadmapAgent implements BaseAgent<any, any> {
  name = 'Learning Roadmap Agent';
  role: AgentRole = 'roadmap';

  async run(input: { missingSkills: string[] }): Promise<AgentResponse<any>> {
    const startTime = Date.now();
    try {
      // Map missing skills to generic study milestones
      const milestones = input.missingSkills.map((skill, index) => ({
        week: index + 1,
        topic: `Master ${skill}`,
        resources: [`https://google.com/search?q=learn+${encodeURIComponent(skill)}`],
      }));

      return {
        success: true,
        data: { milestones },
        metadata: {
          latencyMs: Date.now() - startTime,
        },
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Learning Roadmap Agent failed to run.',
        metadata: {
          latencyMs: Date.now() - startTime,
        },
      };
    }
  }
}

export default LearningRoadmapAgent;
