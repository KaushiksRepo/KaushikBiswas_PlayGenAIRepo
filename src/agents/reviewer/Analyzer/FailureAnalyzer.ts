import { ExecutionResult } from "../../../playwright/Models/ExecutionResult";

import { FailureAnalysis } from "./FailureAnalysis";
import { FailureCategory } from "./FailureCategory";
import { FailureClassifier } from "./FailureClassifier";
import { FailureDetector } from "./FailureDetector";

export class FailureAnalyzer {

    constructor(

        private readonly detector =
            new FailureDetector(),

        private readonly classifier =
            new FailureClassifier()

    ) {}

    analyze(
        executionResult: ExecutionResult
    ): FailureAnalysis {

        const error =
            this.detector.detect(executionResult);

        const category =
            this.classifier.classify(error);

        return {

            category,

            detectedError: error,

            probableCause: this.getProbableCause(category),

            confidence: this.getConfidence(category),

            shouldHeal: this.shouldHeal(category)

        };

    }

    private getProbableCause(
        category: FailureCategory
    ): string {

        switch (category) {

            case FailureCategory.LOCATOR:
                return "Locator may have changed.";

            case FailureCategory.TIMEOUT:
                return "Application response exceeded timeout.";

            case FailureCategory.ASSERTION:
                return "Expected value did not match actual value.";

            case FailureCategory.NETWORK:
                return "Network communication failed.";

            case FailureCategory.API:
                return "Backend API returned an error.";

            case FailureCategory.AUTHENTICATION:
                return "Authentication or authorization failed.";

            case FailureCategory.NAVIGATION:
                return "Navigation to page failed.";

            case FailureCategory.TEST_DATA:
                return "Required test data may be missing.";

            case FailureCategory.ENVIRONMENT:
                return "Execution environment issue detected.";

            default:
                return "Unable to determine probable cause.";

        }

    }

    private getConfidence(
        category: FailureCategory
    ): number {

        switch (category) {

            case FailureCategory.LOCATOR:
                return 95;

            case FailureCategory.TIMEOUT:
                return 90;

            case FailureCategory.ASSERTION:
                return 92;

            case FailureCategory.NETWORK:
                return 85;

            case FailureCategory.API:
                return 88;

            case FailureCategory.AUTHENTICATION:
                return 96;

            default:
                return 60;

        }

    }

    private shouldHeal(
        category: FailureCategory
    ): boolean {

        switch (category) {

            case FailureCategory.LOCATOR:
            case FailureCategory.TIMEOUT:
            case FailureCategory.ASSERTION:
                return true;

            default:
                return false;

        }

    }

}