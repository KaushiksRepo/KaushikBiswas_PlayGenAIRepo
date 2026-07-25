import OpenAI from "openai";

import { AIConfig } from "../config/aiconfig";
import { ILLMProvider } from "../Interfaces/LLMProvider";
import { PromptRequest } from "../models/PromptRequest";
import { PromptResponse } from "../models/PromptResponse";

export class OpenAIProvider implements ILLMProvider {

    private readonly client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: AIConfig.getOpenAIApiKey()
        });
    }

    async generate(request: PromptRequest): Promise<PromptResponse> {

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