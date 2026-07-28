/**
 * agents/interview/index.ts
 *
 * Exposes the main InterviewCoachAgent class that orchestrates the interview,
 * calling the prompt generator, the evaluator, and maintaining memory.
 */

import { BaseAgent, AgentRole, AgentResponse } from '@/types/agent';
import { InterviewSession } from '@/types/interview';
import { getSystemPrompt } from "./prompt";
import { evaluateInterview } from './evaluator';
import { groq } from '@/services/groq';
import { safeJSONParse } from './parser';

export class InterviewCoachAgent implements BaseAgent<InterviewSession, any> {
  name = 'AI Interview Prep Coach';
  role: AgentRole = 'interview';

  /**
   * Orchestrates the agent execution. Runs appropriate sub-methods based
   * on the current state of the interview session.
   */
  async run(session: InterviewSession): Promise<AgentResponse<any>> {
    const startTime = Date.now();

    try {
      // Calculate how many user messages are in the history
      // The first user message is usually "Start Interview"
      const userMessagesCount = session.messages.filter((m) => m.role === "user").length;
      const questionIndex = userMessagesCount; // 1 for first question, 2 for second, etc.

      const systemPrompt = getSystemPrompt(
        session.config.company,
        session.config.role,
        session.config.difficulty,
        questionIndex
      );

      console.log(`Calling Groq for phase/question index ${questionIndex}...`);

      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...session.messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      });

      console.log("Groq Response:", completion);

      const reply =
        completion.choices?.[0]?.message?.content ??
        "No response received from Groq.";

      // Parse JSON from reply, with a safe fallback
      const parsed = safeJSONParse(reply, {
        question: null,
        evaluation: null,
        score: null,
        strengths: null,
        improvements: null,
        isCompleted: false,
        report: null
      });

      return {
        success: true,
        data: {
          role: "assistant",
          question: parsed.question,
          content: reply, // Keep the raw reply in content for message history continuity
          feedback: parsed.evaluation,
          score: parsed.score,
          strengths: parsed.strengths || [],
          improvements: parsed.improvements || [],
          nextQuestion: parsed.question,
          isCompleted: !!parsed.isCompleted,
          report: parsed.report,
          timestamp: new Date().toLocaleTimeString(),
        },
        metadata: {
          latencyMs: Date.now() - startTime,
          modelName: "llama-3.1-8b-instant",
        },
      };
    } catch (err: any) {
      console.error("Groq Error:", err);

      return {
        success: false,
        error: err?.message || "Groq request failed.",
        metadata: {
          latencyMs: Date.now() - startTime,
        },
      };
    }
  }
}