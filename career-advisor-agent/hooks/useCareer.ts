import { useState } from "react";
import { CareerRequest, CareerResponse } from "@/types/career";
import { AgentResponse } from "@/types/agent";

export function useCareer() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<CareerResponse | null>(null);

    const getCareerAdvice = async (request: CareerRequest) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch("/api/career-advisor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `HTTP error! status: ${response.status}`);
            }

            const result: AgentResponse<CareerResponse> = await response.json();

            if (result.success && result.data) {
                setData(result.data);
            } else {
                throw new Error(result.error || "Failed to retrieve advice from agent.");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    };

    return {
        loading,
        error,
        data,
        getCareerAdvice,
        reset,
    };
}
