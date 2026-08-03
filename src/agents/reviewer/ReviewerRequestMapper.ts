import { AIRequest } from "../../../ai-core/src/models/AIRequest";
import { Provider } from "../../../ai-core/src/models/Provider";

export class ReviewerRequestMapper {

    map(prompt: string): AIRequest {

        return {

            provider: Provider.MOCK,

            model: "mock-model",

            template: "reviewer",

            input: prompt

        };

    }

}