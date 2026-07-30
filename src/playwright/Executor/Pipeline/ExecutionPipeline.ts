import { ExecutionContext } from "./ExecutionContext";
import { ExecutionStep } from "./ExecutionStep";

export class ExecutionPipeline {

    constructor(
        private readonly steps: ExecutionStep[]
    ) {}

    async execute(
        context: ExecutionContext
    ): Promise<void> {

        for (const step of this.steps) {
            await step.execute(context);
        }

    }

}