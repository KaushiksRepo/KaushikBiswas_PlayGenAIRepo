import { ExecutionResult } from "../../../playwright/Models/ExecutionResult";
import { FailureAnalysis } from "../Analyzer/FailureAnalysis";

export class ReviewPromptBuilder {

   build(
    executionResult: ExecutionResult,
    analysis: FailureAnalysis
): string {

    return `
You are a Senior Playwright Automation Architect.

Analyze ONLY the detected Playwright failure.

Failure Category:
${analysis.category}

Confidence:
${analysis.confidence}

Probable Cause:
${analysis.probableCause}

Detected Error:
${analysis.detectedError}

Execution Status:
${executionResult.status}

Passed Tests:
${executionResult.passedTests}

Failed Tests:
${executionResult.failedTests}

Return ONLY valid JSON.

{
  "failureType":"",
  "probableRootCause":"",
  "confidence":0,
  "suggestedFix":"",
  "shouldHeal":true,
  "severity":"",
  "aiExplanation":""
}
`;

}

}