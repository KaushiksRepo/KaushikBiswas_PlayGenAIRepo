export interface RetryPolicy {

    maxAttempts: number;

    delayInMillis: number;

    exponentialBackoff: boolean;

}