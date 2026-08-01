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