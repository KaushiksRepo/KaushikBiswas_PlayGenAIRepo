import { ExecutionResult } from "../../playwright/Models/ExecutionResult";
import { ReviewResult } from "./Reviewer_Models/ReviewResult";

export interface Reviewer {

    review(
        executionResult: ExecutionResult
    ): Promise<ReviewResult>;

}