import { NextRequest, NextResponse } from 'next/server';
import { InterviewCoachAgent } from '@/agents/interview';
import { validateInterviewConfig, validateMessageHistory } from '@/utils/validators';

const agent = new InterviewCoachAgent();

/**
 * POST /api/interview
 *
 * Endpoint to communicate with the Groq API for generating
 * conversational interview questions and evaluation replies.
 * Uses validators and delegates AI reasoning to the Interview Coach Agent.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, config, isCompleted } = body;

    // Validate request payloads
    if (!validateInterviewConfig(config) || !validateMessageHistory(messages)) {
      return NextResponse.json(
        { error: 'Invalid session config or message history request payloads.' },
        { status: 400 }
      );
    }

    // Delegate generation and execution to the agent model
    const agentResponse = await agent.run({
      id: crypto.randomUUID(),
      config,
      currentQuestionIndex: 0,
      questions: [],
      messages,
      isCompleted: !!isCompleted,
    });

    if (!agentResponse.success) {
      return NextResponse.json(
        { error: agentResponse.error || 'Agent execution failed' },
        { status: 500 }
      );
    }

    return NextResponse.json(agentResponse.data);
  } catch (err: any) {
    console.error('Error in interview API route:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
