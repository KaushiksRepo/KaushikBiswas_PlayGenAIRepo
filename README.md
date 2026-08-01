export interface AIResponse {
    success: boolean;
    output: string;
    error?: string;

    provider: string;
    model: string;

    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
}