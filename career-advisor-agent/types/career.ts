export interface CareerRequest {
    company: string;
    role: string;
    interviewScore: number;
    strengths: string[];
    improvements: string[];
}

export interface CareerResponse {
    placementReadiness: number;
    recommendation: string;
    recommendedCompanies: string[];
    roadmap: string[];
    motivation: string;
}