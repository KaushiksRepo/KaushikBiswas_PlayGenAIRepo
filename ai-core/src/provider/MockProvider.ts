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

test('Login Test', async ({ page }) => {

    await page.goto('https://example.com');

    await page.locator('#username').fill('demo');

    await page.locator('#password').fill('demo');

    await page.locator('#login').click();

    await expect(page).toHaveURL(/dashboard/);

});`

                };

            case "reviewer":

                return {

                    success: true,

                    provider: "MOCK",

                    model: "mock-model",

                    output: JSON.stringify({

                        failureType: "LOCATOR",

                        probableRootCause: "Login button locator changed.",

                        confidence: 98,

                        suggestedFix: "Update locator using data-testid.",

                        shouldHeal: true,

                        severity: "HIGH",

                        aiExplanation:
                            "Mock reviewer analysis."

                    })

                };

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