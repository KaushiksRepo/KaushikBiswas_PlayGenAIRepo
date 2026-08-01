import OpenAI from "openai";

import { AIConfig } from "../config/AIConfig";
import { ILLMProvider } from "../Interfaces/LLMProvider";
import { AIRequest } from "../models/AIRequest";
import { AIResponse } from "../models/AIResponse";

export class OpenAIProvider implements ILLMProvider {

    private readonly client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: AIConfig.getOpenAIApiKey()
        });
    }

    async generate(request: AIRequest): Promise<AIResponse> {

        try {

            const response = await this.client.responses.create({
                model: request.model,
                input: request.input
            });

            return {
                success: true,
                provider: request.provider,
                model: request.model,
                output: response.output_text
            };

        } catch (error) {

            return {
                success: false,
                provider: request.provider,
                model: request.model,
                output: "",
                error: error instanceof Error ? error.message : "Unknown error"
            };

        }

    }

}