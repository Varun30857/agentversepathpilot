import { NextRequest, NextResponse } from "next/server";
import { generateCareerAdvice } from "@/agents/career-advisor";
import { CareerRequest } from "@/types/career";

export async function POST(req: NextRequest) {
    try {
        const body: CareerRequest = await req.json();

        // Validate structure
        if (!body.company || !body.role || typeof body.interviewScore !== 'number') {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid request payload. Please ensure company, role, and interview score are provided.",
                },
                { status: 400 }
            );
        }

        const result = await generateCareerAdvice(body);

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error: any) {
        console.error("API error inside career-advisor route:", error);

        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to generate career advice.",
            },
            { status: 500 }
        );
    }
}
