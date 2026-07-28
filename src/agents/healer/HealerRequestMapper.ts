import { AIRequest } from "../../../ai-core/src/models/AIRequest";
import { Provider } from "../../../ai-core/src/models/Provider";
import { HealerRequest } from "./HealerRequest";

export class HealerRequestMapper {

    map(request: HealerRequest): AIRequest {

        return {
            provider: Provider.OPENAI,
            model: "gpt-5.5",
            template: "healer",
            input:
`Generated Playwright Code:

${request.generatedCode}

Review Feedback:

${request.reviewComments}`
        };

    }

}