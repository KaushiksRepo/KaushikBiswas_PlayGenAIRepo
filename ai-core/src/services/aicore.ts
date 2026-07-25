import { PromptRequest } from "../models/PromptRequest";
import { PromptResponse } from "../models/PromptResponse";
import { ProviderFactory } from "../factories/ProviderFactory";

export class AICore {

    async execute(request: PromptRequest): Promise<PromptResponse> {

        const provider = ProviderFactory.create(request.provider);

        return await provider.generate(request);
    }

}