import { AIResponse } from "../../../ai-core/src/models/AIResponse";
import { ReviewerResponse } from "./ReviewerResponse";

export class ReviewerResponseMapper {

    map(response: AIResponse): ReviewerResponse {

        return {
            reviewComments: response.output
        };

    }

}