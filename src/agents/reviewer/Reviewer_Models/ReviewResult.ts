import { FailureType } from "./FailureType";
import { Severity } from "./Severity";

export interface ReviewResult {

    failureType: FailureType;

    probableRootCause: string;

    confidence: number;

    suggestedFix: string;

    shouldHeal: boolean;

    severity: Severity;

    aiExplanation: string;
}