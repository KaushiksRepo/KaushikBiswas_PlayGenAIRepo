import { PromptRequest } from "../models/PromptRequest";
import { PromptResponse } from "../models/PromptResponse";

export interface ILLMProvider {
    generate(request: PromptRequest): Promise<PromptResponse>;
}