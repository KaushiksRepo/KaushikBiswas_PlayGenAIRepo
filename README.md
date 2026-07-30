Playwright Repor Parser


import { TestResult } from "../../Models/TestResult";

export class PlaywrightReportParser {

    parse(reportJson: string): TestResult[] {

      try {

    const report = JSON.parse(reportJson);

console.log("===== DEBUG =====");
        console.log(JSON.stringify(report.suites[0].specs[0], null, 2));
        console.log("===== END =====");
    return this.extractTestResults(report);

} catch {

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




Result Aggregation Step


import { ExecutionContext } from "./ExecutionContext";
import { ExecutionStep } from "./ExecutionStep";
import { ExecutionStatus } from "../../Models/ExecutionStatus";
import { PlaywrightReportParser } from "../Parser/PlaywrightReportParser";

export class ResultAggregationStep implements ExecutionStep {

    constructor(
        private readonly reportParser: PlaywrightReportParser
    ) {}

    async execute(
        context: ExecutionContext
    ): Promise<void> {

        const testResults = this.reportParser.parse(
    context.stdout
);

        const passedTests = testResults.filter(
            t => t.status === "PASSED"
        ).length;

        const failedTests = testResults.filter(
            t => t.status === "FAILED"
        ).length;

        const skippedTests = testResults.filter(
            t => t.status === "SKIPPED"
        ).length;

        context.result = {

            status: context.exitCode === 0
                ? ExecutionStatus.SUCCESS
                : ExecutionStatus.FAILED,

            exitCode: context.exitCode,

            executionTime: context.endTime - context.startTime,

            passedTests,

            failedTests,

            skippedTests,

            consoleLogs: context.stdout
                ? context.stdout.split("\n")
                : [],

            errors: context.stderr
                ? context.stderr.split("\n")
                : [],

            testResults

        };

    }

}