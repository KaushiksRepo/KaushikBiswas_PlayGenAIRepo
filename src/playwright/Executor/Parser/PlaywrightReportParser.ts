import { TestResult } from "../../Models/TestResult";

export class PlaywrightReportParser {

    parse(reportJson: string): TestResult[] {

    try {

        const report = JSON.parse(reportJson);

        return this.extractTestResults(report);

    } catch (error) {


        return [];

    }

}

private extractTestResults(report: any): TestResult[] {

    const results: TestResult[] = [];

    const suites = report?.suites ?? [];

    for (const suite of suites) {

        for (const spec of suite.specs ?? []) {

            for (const test of spec.tests ?? []) {

                // Find the first failed result (or fall back to the first result)
               const failedResult =
    test.results?.find((r: any) => r.status === "failed")
    ?? test.results?.[0];

console.log("========== FAILED RESULT ==========");
console.log(
    JSON.stringify(
        failedResult,
        null,
        2
    )
);
console.log("==================================");

const errorMessage =
    failedResult?.error?.message
    ?? failedResult?.errors?.[0]?.message
    ?? test.error?.message
    ?? "";


                results.push({

                    testName: spec.title,

                    status: this.mapStatus(test.status),

                    duration: failedResult?.duration ?? 0,

                    errorMessage

                });

            }

        }

    }

    return results;

}

    private mapStatus(status: string): "PASSED" | "FAILED" | "SKIPPED" {

        switch (status) {

            case "passed":
                return "PASSED";

            case "skipped":
                return "SKIPPED";

            default:
                return "FAILED";

        }

    }

}