export interface TestResult {

    testName: string;

    status: "PASSED" | "FAILED" | "SKIPPED";

    duration: number;

    errorMessage?: string;

}