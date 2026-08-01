import { AIRequest } from "../../../ai-core/src/models/AIRequest";
import { Provider } from "../../../ai-core/src/models/Provider";

export class HealerRequestMapper {

    map(prompt: string): AIRequest {

        return {

            provider: Provider.OPENAI,

            model: "gpt-5.5",

            template: "healer",

            input: prompt

        };

    }

}