import { Provider } from "./Provider";

export interface PromptResponse {
    success: boolean;
    provider: Provider;
    model: string;
    output: string;
    error?: string;
}