import { ExecutionRequest } from "../Models/ExecutionRequest";
import { ExecutionResult } from "../Models/ExecutionResult";
import { ExecutionContext } from "./Pipeline/ExecutionContext";
import { ExecutionPipeline } from "./Pipeline/ExecutionPipeline";
import { ValidationStep } from "./Pipeline/ValidationStep";
import { CommandExecutionStep } from "./Pipeline/CommandExecutionStep";
import { ResultAggregationStep } from "./Pipeline/ResultAggregationStep";
import { CommandBuilder } from "./Command/CommandBuilder";
import { CommandRunner } from "./Command/CommandRunner";
import { PlaywrightReportParser } from "./Parser/PlaywrightReportParser";

export class PlaywrightExecutor {

    private readonly pipeline: ExecutionPipeline;

    constructor() {

        this.pipeline = new ExecutionPipeline([

            new ValidationStep(),

            new CommandExecutionStep(
                new CommandBuilder(),
                new CommandRunner()
            ),

            new ResultAggregationStep(
                new PlaywrightReportParser()
            )

        ]);

    }

    async execute(
        request: ExecutionRequest
    ): Promise<ExecutionResult> {

        const context = new ExecutionContext(request);

        await this.pipeline.execute(context);

        return context.result!;

    }

}