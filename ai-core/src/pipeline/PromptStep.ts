import { ExecutionContext } from "./ExecutionContext";
import { ExecutionStep } from "./ExecutionStep";
import { PromptEngine } from "../services/PromptEngine";

export class PromptStep implements ExecutionStep {

    private readonly promptEngine = new PromptEngine();

    async execute(context: ExecutionContext): Promise<void> {

        context.prompt = this.promptEngine.build(
            context.request.template,
            context.request.input
        );

    }

}