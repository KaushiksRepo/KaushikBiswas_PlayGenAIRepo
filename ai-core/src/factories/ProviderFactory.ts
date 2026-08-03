import { ILLMProvider } from "../Interfaces/LLMProvider";
import { Provider } from "../models/Provider";

import { OpenAIProvider } from "../provider/OpenAIProvider";
import { MockProvider } from "../provider/MockProvider";

export class ProviderFactory {

    static create(provider: Provider): ILLMProvider {

        switch (provider) {

            case Provider.OPENAI:
                return new OpenAIProvider();

            case Provider.MOCK:
                return new MockProvider();

            default:
                throw new Error(
                    `Provider '${provider}' is not supported.`
                );

        }

    }

}