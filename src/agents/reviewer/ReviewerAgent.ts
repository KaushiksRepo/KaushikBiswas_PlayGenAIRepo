import { AICore } from "../../../ai-core/src/services/aicore";

import { ExecutionResult } from "../../playwright/Models/ExecutionResult";

import { FailureAnalyzer } from "./Analyzer/FailureAnalyzer";
import { ReviewPromptBuilder } from "./Prompt/ReviewPromptBuilder";

import { ReviewerRequestMapper } from "./ReviewerRequestMapper";
import { ReviewerResponseMapper } from "./ReviewerResponseMapper";

import { ReviewResult } from "./Reviewer_Models/ReviewResult";
import { FailureType } from "./Reviewer_Models/FailureType";
import { Severity } from "./Reviewer_Models/Severity";

export class ReviewerAgent {

    private readonly failureAnalyzer = new FailureAnalyzer();

    private readonly promptBuilder = new ReviewPromptBuilder();

    private readonly requestMapper = new ReviewerRequestMapper();

    private readonly responseMapper = new ReviewerResponseMapper();

    constructor(
        private readonly aiCore: AICore
    ) {}

    async review(
        executionResult: ExecutionResult
    ): Promise<ReviewResult> {

        if (executionResult.status === "SUCCESS") {

           return {

    failureType: FailureType.NONE,

    probableRootCause: "No issues detected.",

    confidence: 100,

    suggestedFix: "",

    shouldHeal: false,

    isHealable: false,

    severity: Severity.LOW,

    aiExplanation: "All tests executed successfully."

};

        }

        const analysis =
            this.failureAnalyzer.analyze(executionResult);

        const prompt =
            this.promptBuilder.build(
                executionResult,
                analysis
            );

        const aiRequest =
            this.requestMapper.map(prompt);

        const aiResponse =
    await this.aiCore.execute(aiRequest);

const reviewResult =
    this.responseMapper.map(aiResponse);

reviewResult.failureAnalysis = analysis;

return reviewResult;

    }

}