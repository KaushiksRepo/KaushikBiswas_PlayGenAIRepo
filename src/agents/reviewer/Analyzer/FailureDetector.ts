import { ExecutionResult } from "../../../playwright/Models/ExecutionResult";

export class FailureDetector {

    detect(
        executionResult: ExecutionResult
    ): string {

        // 1. Framework errors
        if (executionResult.errors.length > 0) {
            return executionResult.errors.join("\n");
        }

        // 2. Playwright test errors
        for (const test of executionResult.testResults) {

            const error = (test as any).error;

            if (error) {

                if (typeof error === "string") {
                    return error;
                }

                if (error.message) {
                    return error.message;
                }

                return JSON.stringify(error);

            }

        }

        // 3. Fallback to console logs
        return executionResult.consoleLogs.join("\n");

    }

}