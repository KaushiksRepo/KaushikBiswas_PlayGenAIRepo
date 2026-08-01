import { ReviewResult } from "../Reviewer_Models/ReviewResult";

export class ReviewResponseParser {

    parse(
        response: string
    ): ReviewResult {

        return JSON.parse(response);

    }

}