import { AIRequest } from "../models/AIRequest";
import { AIResponse } from "../models/AIResponse";
import { ProviderFactory } from "../factories/ProviderFactory";
import { PromptEngine } from "./PromptEngine";

export class AICore {

    private promptEngine = new PromptEngine();

    async execute(request: AIRequest): Promise<AIResponse> {

        const finalPrompt = this.promptEngine.build(
            request.template,
            request.input
        );

        const provider = ProviderFactory.create(request.provider);

        return await provider.generate({
            ...request,
            input: finalPrompt
        });
    }
}