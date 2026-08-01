import { ExecutionResult } from "../../../playwright/Models/ExecutionResult";

export class FailureDetector {

    detect(
        executionResult: ExecutionResult
    ): string {

        return executionResult.errors.join("\n");

    }

}