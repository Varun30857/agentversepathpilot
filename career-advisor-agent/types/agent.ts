export interface AgentResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}