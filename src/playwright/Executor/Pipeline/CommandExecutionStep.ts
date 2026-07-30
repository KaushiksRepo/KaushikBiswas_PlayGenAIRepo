import { CommandBuilder } from "../Command/CommandBuilder";
import { CommandRunner } from "../Command/CommandRunner";
import { ExecutionContext } from "./ExecutionContext";
import { ExecutionStep } from "./ExecutionStep";

export class CommandExecutionStep implements ExecutionStep {

    constructor(
        private readonly commandBuilder: CommandBuilder,
        private readonly commandRunner: CommandRunner
    ) {}

    async execute(
        context: ExecutionContext
    ): Promise<void> {

        const command = this.commandBuilder.build(context.request);

        const result = await this.commandRunner.run(
            command,
            context.request.projectRoot
        );

        context.stdout = result.stdout;
        context.stderr = result.stderr;
        context.exitCode = result.exitCode;
        context.endTime = Date.now();

    }

}