import { TestResult } from "../../Models/TestResult";

export class PlaywrightReportParser {

    parse(reportJson: string): TestResult[] {

    console.log(">>> Entered PlaywrightReportParser.parse()");

    try {

        const report = JSON.parse(reportJson);

        console.log(">>> JSON parsed successfully");
        console.log(">>> Suites:", report.suites?.length);

        return this.extractTestResults(report);

    } catch (error) {

        console.error(">>> JSON Parse Failed");
        console.error(error);

        return [];

    }

}

    private extractTestResults(report: any): TestResult[] {

        const results: TestResult[] = [];

        const suites = report?.suites ?? [];

        for (const suite of suites) {

            for (const spec of suite.specs ?? []) {

                for (const test of spec.tests ?? []) {

                    results.push({

                        testName: spec.title,

                        status: this.mapStatus(test.status),

                        duration: test.results?.[0]?.duration ?? 0,

                        errorMessage: test.results?.[0]?.error?.message

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