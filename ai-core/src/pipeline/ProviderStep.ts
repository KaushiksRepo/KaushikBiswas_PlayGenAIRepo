import { ExecutionContext } from "./ExecutionContext";
import { ExecutionStep } from "./ExecutionStep";
import { ProviderFactory } from "../factories/ProviderFactory";

export class ProviderStep implements ExecutionStep {

    async execute(context: ExecutionContext): Promise<void> {

        if (!context.prompt) {
            throw new Error("Prompt has not been generated.");
        }

        const provider = ProviderFactory.create(
            context.request.provider
        );

        context.response = await provider.generate({
            ...context.request,
            input: context.prompt
        });
    }
}