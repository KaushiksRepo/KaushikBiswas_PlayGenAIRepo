import { ExecutionStatus } from "./ExecutionStatus";
import { TestResult } from "./TestResult";

export interface ExecutionResult {

    status: ExecutionStatus;

    exitCode: number;

    executionTime: number;

    passedTests: number;

    failedTests: number;

    skippedTests: number;

    consoleLogs: string[];

    errors: string[];

    testResults: TestResult[];

}