import { HealRequest } from "../Models/HealRequest";

export class HealPromptBuilder {

    build(
        request: HealRequest
    ): string {

        return `
You are a Senior Playwright Automation Architect.

Your task is to repair the Playwright test.

Failure Category:
${request.failureAnalysis.category}

Probable Cause:
${request.failureAnalysis.probableCause}

Detected Error:
${request.failureAnalysis.detectedError}

Reviewer Recommendation:
${request.reviewResult.suggestedFix}

Current Playwright Code:

${request.generatedCode}

Return ONLY the corrected Playwright code.
`;

    }

}