export interface RetryStrategy {

    shouldRetry(error: unknown): boolean;

}