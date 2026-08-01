import { ExecutionResult } from "../playwright/Models/ExecutionResult";
import { ReviewResult } from "../agents/reviewer/Reviewer_Models/ReviewResult";
import { HealResult } from "../agents/healer/Models/HealResult";

export interface AIWorkflowResponse {

    generatedCode?: string;

    executionResult?: ExecutionResult;

    reviewResult?: ReviewResult;

    healResult?: HealResult;

    finalCode?: string;

}