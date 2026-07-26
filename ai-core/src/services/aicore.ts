import { AIRequest } from "../models/AIRequest";
import { AIResponse } from "../models/AIResponse";
import { ProviderFactory } from "../factories/ProviderFactory";
import { PromptEngine } from "./PromptEngine";
import { ResponseValidator } from "../validation/ResponseValidator";

export class AICore {

    private promptEngine = new PromptEngine();
    private responseValidator = new ResponseValidator();

    async execute(request: AIRequest): Promise<AIResponse> {

        const finalPrompt = this.promptEngine.build(
            request.template,
            request.input
        );

        const provider = ProviderFactory.create(request.provider);

        const response = await provider.generate({
    ...request,
    input: finalPrompt
});

const validation = this.responseValidator.validate(response);

if (!validation.valid) {
    return {
        ...response,
        success: false,
        error: validation.message
    };
}

return response;

    }
}