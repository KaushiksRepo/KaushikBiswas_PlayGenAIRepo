import { ILLMProvider } from "../Interfaces/LLMProvider";
import { Provider } from "../models/Provider";
import { OpenAIProvider } from "../provider/OpenAIProvider";

export class ProviderFactory {

    static create(provider: Provider): ILLMProvider {

        switch (provider) {

            case Provider.OPENAI:
                return new OpenAIProvider();

            default:
                throw new Error(`Provider '${provider}' is not supported.`);
        }
    }

}