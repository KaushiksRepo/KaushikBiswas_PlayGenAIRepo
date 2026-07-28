import { RetryStrategy } from "./RetryStrategy";

export class DefaultRetryStrategy implements RetryStrategy {

    shouldRetry(error: unknown): boolean {

        // Retry only for transient failures.
        // This can be enhanced later with provider-specific logic.

        if (!(error instanceof Error)) {
            return false;
        }

        const message = error.message.toLowerCase();

        return (
            message.includes("timeout") ||
            message.includes("429") ||
            message.includes("rate limit") ||
            message.includes("503") ||
            message.includes("502") ||
            message.includes("504") ||
            message.includes("network") ||
            message.includes("connection")
        );
    }

}