import { AIRequest } from "../../../ai-core/src/models/AIRequest";
import { Provider } from "../../../ai-core/src/models/Provider";
import { GeneratorRequest } from "./GeneratorRequest";

export class GeneratorRequestMapper {

    map(request: GeneratorRequest): AIRequest {

        return {
            provider: Provider.OPENAI,
            model: "gpt-5.5",
            template: "generator",
            input: request.testPlan
        };

    }

}