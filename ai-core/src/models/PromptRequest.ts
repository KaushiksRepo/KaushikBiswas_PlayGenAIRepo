import { AgentType } from "./AgentType";
import { Provider } from "./Provider";

export interface PromptRequest {
    agent: AgentType;
    provider: Provider;
    model: string;
    task: string;
    input: string;
}