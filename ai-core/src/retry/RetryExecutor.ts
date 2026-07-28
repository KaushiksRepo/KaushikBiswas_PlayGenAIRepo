import { RetryPolicy } from "./RetryPolicy";
import { RetryStrategy } from "./RetryStrategy";
import { DefaultRetryStrategy } from "./DefaultRetryStrategy";

export class RetryExecutor {

    constructor(
        private readonly strategy: RetryStrategy = new DefaultRetryStrategy()
    ) {}

    async execute<T>(
        operation: () => Promise<T>,
        policy: RetryPolicy
    ): Promise<T> {

        let currentAttempt = 1;
        let delay = policy.delayInMillis;

        while (true) {

            try {

                const result = await operation();

                console.log(
                    `Operation succeeded on attempt ${currentAttempt}.`
                );

                return result;

            } catch (error) {

                if (!this.strategy.shouldRetry(error)) {
                    throw error;
                }

                if (currentAttempt >= policy.maxAttempts) {
                    throw error;
                }

                console.log(
                    `Retry attempt ${currentAttempt} of ${policy.maxAttempts}. Retrying in ${delay} ms...`
                );

                await this.sleep(delay);

                if (policy.exponentialBackoff) {
                    delay *= 2;
                }

                currentAttempt++;
            }
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}