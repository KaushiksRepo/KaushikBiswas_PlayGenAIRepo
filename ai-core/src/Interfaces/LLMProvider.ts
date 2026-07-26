import { AIRequest } from "../models/AIRequest";
import { AIResponse } from "../models/AIResponse";

export interface ILLMProvider {
    generate(request: AIRequest): Promise<AIResponse>;
}