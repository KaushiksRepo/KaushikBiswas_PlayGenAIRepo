import { AIRequest } from "../../../ai-core/src/models/AIRequest";
import { Provider } from "../../../ai-core/src/models/Provider";
import { ReviewerRequest } from "./ReviewerRequest";

export class ReviewerRequestMapper {

    map(request: ReviewerRequest): AIRequest {

       return {

    provider: Provider.MOCK,

    model: "mock-model",

    template: "reviewer",

    input: JSON.stringify(
        request.executionResult,
        null,
        2
    )

};

    }

}