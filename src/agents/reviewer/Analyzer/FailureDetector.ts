import { ExecutionResult } from "../../../playwright/Models/ExecutionResult";

export class FailureDetector {

    detect(
        executionResult: ExecutionResult
    ): string {

        console.log("========== TEST RESULTS ==========");
console.log(
    JSON.stringify(
        executionResult.testResults,
        null,
        2
    )
);
console.log("==================================");

        // Highest priority: parsed Playwright test failures
        for (const test of executionResult.testResults) {

            if (
                test.status === "FAILED" &&
                test.errorMessage &&
                test.errorMessage.trim().length > 0
            ) {
                return test.errorMessage.trim();
            }

        }

        // Second priority: real stderr (ignore npm noise)
        const realErrors = executionResult.errors.filter(error => {

            const text = error.trim().toLowerCase();

            return (
                text.length > 0 &&
                !text.startsWith("npm notice") &&
                !text.includes("playwright test")
            );

        });

        if (realErrors.length > 0) {
            return realErrors.join("\n");
        }

        return "Unknown failure";

    }

}