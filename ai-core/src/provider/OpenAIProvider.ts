import { ILLMProvider } from "../Interfaces/LLMProvider";
import { PromptRequest } from "../models/PromptRequest";
import { PromptResponse } from "../models/PromptResponse";

export class OpenAIProvider implements ILLMProvider {

    async generate(request: PromptRequest): Promise<PromptResponse> {

        console.log("Calling OpenAI...");

        return {
            success: true,
            provider: request.provider,
            model: request.model,
            output: "Dummy response from OpenAI"
        };
    }
}