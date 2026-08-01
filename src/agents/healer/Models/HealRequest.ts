import { ExecutionResult } from "../../../playwright/Models/ExecutionResult";
import { FailureAnalysis } from "../../reviewer/Analyzer/FailureAnalysis";
import { ReviewResult } from "../../reviewer/Reviewer_Models/ReviewResult";

export interface HealRequest {

    executionResult: ExecutionResult;

    failureAnalysis: FailureAnalysis;

    reviewResult: ReviewResult;

    generatedCode: string;

}