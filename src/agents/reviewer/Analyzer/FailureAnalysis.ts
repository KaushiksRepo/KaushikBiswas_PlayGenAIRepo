import { FailureCategory } from "./FailureCategory";

export interface FailureAnalysis {

    category: FailureCategory;

    detectedError: string;

    probableCause: string;

    confidence: number;

    shouldHeal: boolean;

}