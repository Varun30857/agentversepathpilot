/**
 * agents/interview/index.ts
 *
 * Exposes the main InterviewCoachAgent class that orchestrates the interview,
 * calling the prompt generator, the evaluator, and maintaining memory.
 */

import { BaseAgent, AgentRole, AgentResponse } from '@/types/agent';
import { InterviewSession } from '@/types/interview';
import { getSystemPrompt } from "./prompt";
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
      const questionCount = session.config.questionCount || 5;

      const systemPrompt = getSystemPrompt(
        session.config.company,
        session.config.role,
        session.config.difficulty,
        questionIndex,
        questionCount
      );

      console.log(`Calling Groq for phase/question index ${questionIndex} out of ${questionCount}...`);

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

      // Parse JSON from reply, with a safe fallback and explicit type shape
      const parsed = safeJSONParse(reply, {
        question: null,
        evaluation: null,
        score: null,
        strengths: null,
        improvements: null,
        isCompleted: false,
        report: null
      } as {
        question: string | null;
        evaluation: string | null;
        score: any;
        strengths: string[] | null;
        improvements: string[] | null;
        isCompleted: boolean;
        report: string | null;
      });

      // Normalize any string "null" values to actual JavaScript null
      const normalize = (val: any) => {
        if (val === null || val === undefined || val === "null" || val === "Null" || val === "NULL") return null;
        return val;
      };

      const parsedQuestion = normalize(parsed.question);
      const parsedEvaluation = normalize(parsed.evaluation);
      const parsedReport = normalize(parsed.report);

      let parsedScore = normalize(parsed.score);
      if (typeof parsedScore === 'string') {
        const parsedNum = parseInt(parsedScore, 10);
        parsedScore = isNaN(parsedNum) ? null : parsedNum;
      }

      const parsedStrengths = Array.isArray(parsed.strengths)
        ? parsed.strengths.filter((s: any) => s !== null && s !== "null" && s !== "Null" && s !== "")
        : [];

      const parsedImprovements = Array.isArray(parsed.improvements)
        ? parsed.improvements.filter((i: any) => i !== null && i !== "null" && i !== "Null" && i !== "")
        : [];

      // Determine final completion based on questionIndex exceeding limit or the LLM's flag
      const isSessionCompleted = questionIndex >= questionCount + 1 || !!parsed.isCompleted;

      // Extract the last asked question from the history to identify the "current" active question being evaluated
      let lastAskedQuestion: string | null = null;
      for (let i = session.messages.length - 1; i >= 0; i--) {
        const msg = session.messages[i];
        if (msg.role === "assistant") {
          try {
            const parsedMsg = safeJSONParse(msg.content, {} as any);
            if (parsedMsg && typeof parsedMsg.question === 'string') {
              lastAskedQuestion = parsedMsg.question;
              break;
            }
          } catch (e) {
            // Ignore parse errors of historical assistant responses
          }
        }
      }

      return {
        success: true,
        data: {
          role: "assistant",
          question: isSessionCompleted ? null : parsedQuestion,
          content: reply, // Keep the raw reply in content for message history continuity
          feedback: parsedEvaluation,
          score: parsedScore,
          strengths: parsedStrengths,
          improvements: parsedImprovements,
          
          // Enhanced tracking support
          currentQuestion: isSessionCompleted ? lastAskedQuestion : (lastAskedQuestion || parsedQuestion),
          totalQuestions: questionCount,
          nextQuestion: isSessionCompleted ? null : parsedQuestion,
          
          isCompleted: isSessionCompleted,
          report: parsedReport,
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