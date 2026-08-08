import { FailureAnalysis } from "../Analyzer/FailureAnalysis";
import { FailureType } from "./FailureType";
import { Severity } from "./Severity";

export interface ReviewResult {

    failureType: FailureType;

    probableRootCause: string;

    confidence: number;

    suggestedFix: string;

    shouldHeal: boolean;

    isHealable: boolean;

    severity: Severity;

    aiExplanation: string;

    failureAnalysis?: FailureAnalysis;

}