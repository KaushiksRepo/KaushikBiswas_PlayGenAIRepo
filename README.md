import { promises as fs } from "fs";
import * as path from "path";
import { TestResult } from "../../Models/TestResult";

export class PlaywrightReportParser {

    async parse(projectRoot: string): Promise<TestResult[]> {

        const reportPath = path.join(projectRoot, "playwright-report.json");

        try {

            const reportExists = await fs.access(reportPath)
                .then(() => true)
                .catch(() => false);

            if (!reportExists) {
                return [];
            }

            const reportContent = await fs.readFile(reportPath, "utf8");
            const report = JSON.parse(reportContent);

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