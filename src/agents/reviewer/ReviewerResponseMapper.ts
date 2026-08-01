import { AIResponse } from "../../../ai-core/src/models/AIResponse";
import { ReviewResult } from "./Reviewer_Models/ReviewResult";

export class ReviewerResponseMapper {

    map(response: AIResponse): ReviewResult {

        return JSON.parse(response.output);

    }

}