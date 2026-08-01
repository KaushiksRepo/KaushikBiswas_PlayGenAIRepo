import { AIRequest } from "../../../ai-core/src/models/AIRequest";
import { Provider } from "../../../ai-core/src/models/Provider";
import { ReviewerRequest } from "./ReviewerRequest";

export class ReviewerRequestMapper {

    map(request: ReviewerRequest): AIRequest {

        return {
            provider: Provider.OPENAI,
            model: "gpt-5.5",
            template: "reviewer",
            input: request.generatedCode
        };

    }

}

import { AIResponse } from "../../../ai-core/src/models/AIResponse";
import { ReviewerResponse } from "./ReviewerResponse";

export class ReviewerResponseMapper {

    map(response: AIResponse): ReviewerResponse {

        return {
            reviewComments: response.output
        };

    }

}



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



import { AIResponse } from "../../../ai-core/src/models/AIResponse";
import { HealerResponse } from "./HealerResponse";

export class HealerResponseMapper {

    map(response: AIResponse): HealerResponse {

        return {
            healedCode: response.output
        };

    }

}