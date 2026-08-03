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

        case FailureCategory.ENVIRONMENT:
            return "Playwright browser executable is missing or not installed.";

        case FailureCategory.LOCATOR:
            return "Locator may have changed in the application.";

        case FailureCategory.TIMEOUT:
            return "Application did not respond within the configured timeout.";

        case FailureCategory.ASSERTION:
            return "Actual result did not match the expected result.";

        case FailureCategory.NETWORK:
            return "Network connectivity issue detected.";

        case FailureCategory.API:
            return "Backend API returned an unexpected response.";

        case FailureCategory.AUTHENTICATION:
            return "Authentication or authorization failed.";

        case FailureCategory.NAVIGATION:
            return "Navigation to the requested page failed.";

        case FailureCategory.TEST_DATA:
            return "Required test data is missing or invalid.";

        default:
            return "Unknown failure.";

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
        case FailureCategory.ASSERTION:
            return true;

        case FailureCategory.TIMEOUT:
            return false;

        case FailureCategory.ENVIRONMENT:
            return false;

        case FailureCategory.NETWORK:
            return false;

        default:
            return false;

    }

}

    }