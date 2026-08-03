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
`import { test, expect } from '@playwright/test';

test('Launch Browser', async ({ page }) => {

    await page.goto('https://playwright.dev');

    await page.waitForTimeout(5000);

    await expect(page).toHaveTitle(/Playwright/);

});`

                };

             case "reviewer": {

    const prompt = request.input.toLowerCase();

    let response;

    if (
        prompt.includes("executable doesn't exist") ||
        prompt.includes("chrome-headless-shell") ||
        prompt.includes("browsertype.launch")
    ) {

        response = {

            failureType: "ENVIRONMENT",

            probableRootCause:
                "Playwright browser binaries are not installed.",

            confidence: 100,

            suggestedFix:
                "Run 'npx playwright install'.",

            shouldHeal: false,

            severity: "HIGH",

            aiExplanation:
                "Browser executable is missing."

        };

    } else if (
        prompt.includes("locator")
    ) {

        response = {

            failureType: "LOCATOR",

            probableRootCause:
                "Locator may have changed.",

            confidence: 95,

            suggestedFix:
                "Update the locator.",

            shouldHeal: true,

            severity: "HIGH",

            aiExplanation:
                "Locator failure detected."

        };

    } else if (
        prompt.includes("timeout")
    ) {

        response = {

            failureType: "TIMEOUT",

            probableRootCause:
                "Application did not respond within timeout.",

            confidence: 92,

            suggestedFix:
                "Increase timeout or investigate application performance.",

            shouldHeal: false,

            severity: "MEDIUM",

            aiExplanation:
                "Timeout detected."

        };

    } else {

        response = {

            failureType: "UNKNOWN",

            probableRootCause:
                "Unable to determine the root cause.",

            confidence: 60,

            suggestedFix:
                "Review execution logs.",

            shouldHeal: false,

            severity: "LOW",

            aiExplanation:
                "Unknown failure."

        };

    }

    return {

        success: true,

        provider: "MOCK",

        model: "mock-model",

        output: JSON.stringify(response)

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