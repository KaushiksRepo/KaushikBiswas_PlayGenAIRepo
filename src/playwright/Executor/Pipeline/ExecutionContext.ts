import { ExecutionRequest } from "../../Models/ExecutionRequest";
import { ExecutionResult } from "../../Models/ExecutionResult";

export class ExecutionContext {

    constructor(
        public readonly request: ExecutionRequest
    ) {}

    stdout = "";

    stderr = "";

    exitCode = 0;

    startTime = Date.now();

    endTime = 0;

    report: any = null;

    result?: ExecutionResult;

}