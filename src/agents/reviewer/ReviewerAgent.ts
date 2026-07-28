import { AICore } from "../../../ai-core/src/services/aicore";
import { ReviewerRequest } from "./ReviewerRequest";
import { ReviewerResponse } from "./ReviewerResponse";
import { ReviewerRequestMapper } from "./ReviewerRequestMapper";
import { ReviewerResponseMapper } from "./ReviewerResponseMapper";

export class ReviewerAgent {

    private readonly requestMapper = new ReviewerRequestMapper();

    private readonly responseMapper = new ReviewerResponseMapper();

    constructor(
        private readonly aiCore: AICore
    ) {}

    async review(
        request: ReviewerRequest
    ): Promise<ReviewerResponse> {

        const aiRequest = this.requestMapper.map(request);

        const aiResponse = await this.aiCore.execute(aiRequest);

        return this.responseMapper.map(aiResponse);

    }

}