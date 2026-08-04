import { ILLMProvider } from "../Interfaces/LLMProvider";
import { AIRequest } from "../models/AIRequest";
import { AIResponse } from "../models/AIResponse";

export class MockProvider implements ILLMProvider {

    async generate(request: AIRequest): Promise<AIResponse> {

        switch (request.template) {

            case "planner":

                return {

                    success: true,

                    provider: "MOCK",

                    model: "mock-model",

                    output:
`1. Navigate to Login page
2. Enter valid username
3. Enter valid password
4. Click Login
5. Verify Dashboard is displayed`

                };

            case "generator":

                return {

                    success: true,

                    provider: "MOCK",

                    model: "mock-model",

                    output:
`import { test } from '@playwright/test';

test('Navigation Timeout', async ({ page }) => {

    page.setDefaultNavigationTimeout(1000);

    await page.goto('https://playwright.dev/');

});`

                };

             case "reviewer": {

    const prompt = request.input.toLowerCase();

    let failureType = "UNKNOWN";
    let probableRootCause = "Unknown failure.";
    let confidence = 60;
    let suggestedFix = "Investigate the execution logs.";
    let shouldHeal = false;
    let severity = "MEDIUM";
    let aiExplanation = "Unable to classify the failure.";

    if (prompt.includes("failure category:\nassertion")) {

        failureType = "ASSERTION";
        probableRootCause = "Actual result did not match the expected result.";
        confidence = 92;
        suggestedFix = "Review the expected assertion or update the application behaviour.";
        shouldHeal = false;
        severity = "MEDIUM";
        aiExplanation = "Assertion failure detected.";

    }
    else if (prompt.includes("failure category:\nlocator")) {

        failureType = "LOCATOR";
        probableRootCause = "Locator may have changed.";
        confidence = 95;
        suggestedFix = "Update the locator strategy.";
        shouldHeal = true;
        severity = "HIGH";
        aiExplanation = "Locator failure detected.";

    }
    else if (prompt.includes("failure category:\ntimeout")) {

        failureType = "TIMEOUT";
        probableRootCause = "Application did not respond within the configured timeout.";
        confidence = 90;
        suggestedFix = "Increase timeout or investigate application performance.";
        shouldHeal = false;
        severity = "MEDIUM";
        aiExplanation = "Timeout detected.";

    }
    else if (prompt.includes("failure category:\nenvironment")) {

        failureType = "ENVIRONMENT";
        probableRootCause = "Execution environment is not configured correctly.";
        confidence = 98;
        suggestedFix = "Install browsers or fix the execution environment.";
        shouldHeal = false;
        severity = "HIGH";
        aiExplanation = "Environment issue detected.";

    }

    return {

        success: true,

        provider: "MOCK",

        model: "mock-model",

        output: JSON.stringify({

            failureType,
            probableRootCause,
            confidence,
            suggestedFix,
            shouldHeal,
            severity,
            aiExplanation

        })

    };

}

            case "healer":

                return {

                    success: true,

                    provider: "MOCK",

                    model: "mock-model",

                    output:
`// Mock healed Playwright code`

                };

            default:

                return {

                    success: false,

                    provider: "MOCK",

                    model: "mock-model",

                    output: "",

                    error: "Unknown template."

                };

        }

    }

}