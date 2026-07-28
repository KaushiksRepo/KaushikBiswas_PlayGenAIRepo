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