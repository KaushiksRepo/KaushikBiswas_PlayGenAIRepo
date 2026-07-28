import { ExecutionContext } from "./ExecutionContext";
import { ExecutionStep } from "./ExecutionStep";
import { ProviderFactory } from "../factories/ProviderFactory";
import { RetryExecutor } from "../retry/RetryExecutor";

export class ProviderStep implements ExecutionStep {

    async execute(context: ExecutionContext): Promise<void> {

        if (!context.prompt) {
            throw new Error("Prompt has not been generated.");
        }

        const provider = ProviderFactory.create(
            context.request.provider
        );

        const retryExecutor = new RetryExecutor();

context.response = await retryExecutor.execute(
    () =>
        provider.generate({
            ...context.request,
            input: context.prompt!
        }),
    {
        maxAttempts: 3,
        delayInMillis: 1000,
        exponentialBackoff: true
    }
);
    }
}