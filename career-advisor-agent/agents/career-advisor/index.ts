import { groq } from "@/services/groq";
import { CareerRequest, CareerResponse } from "@/types/career";
import { CAREER_ADVISOR_PROMPT } from "./prompt";

export async function generateCareerAdvice(
    request: CareerRequest
): Promise<CareerResponse> {
    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        messages: [
            {
                role: "system",
                content: CAREER_ADVISOR_PROMPT,
            },
            {
                role: "user",
                content: JSON.stringify(request),
            },
        ],
    });

    const content = completion.choices[0].message.content;

    if (!content) {
        throw new Error("No response received from Groq.");
    }

    return JSON.parse(content) as CareerResponse;
}