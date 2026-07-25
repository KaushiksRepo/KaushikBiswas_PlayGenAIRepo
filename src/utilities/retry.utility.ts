import { IRetryOptions } from '../types/framework.types';
import { Logger } from '../core/logger';

export class RetryUtility {
  private static readonly logger = Logger.getInstance('retry');

  public static async execute<T>(
    operation: () => Promise<T>,
    options: IRetryOptions,
    operationName: string = 'operation',
  ): Promise<T> {
    let lastError: Error | undefined;
    let delay = options.delayMs;

    for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
      try {
        const result = await operation();
        if (attempt > 1) {
          RetryUtility.logger.info(`Operation "${operationName}" succeeded on attempt ${attempt}`);
        }
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (options.retryOn && !options.retryOn(lastError)) {
          throw lastError;
        }

        if (attempt === options.maxAttempts) {
          break;
        }

        RetryUtility.logger.warn(
          `Attempt ${attempt}/${options.maxAttempts} failed for "${operationName}": ${lastError.message}. Retrying in ${delay}ms...`,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.round(delay * (options.backoffMultiplier || 1));
      }
    }

    RetryUtility.logger.error(
      `All ${options.maxAttempts} attempts exhausted for "${operationName}"`,
      { lastError: lastError?.message },
    );

    throw lastError;
  }

  public static async executeWithFallback<T>(
    operation: () => Promise<T>,
    fallback: () => Promise<T>,
    options: IRetryOptions,
    operationName: string = 'operation',
  ): Promise<T> {
    try {
      return await RetryUtility.execute(operation, options, operationName);
    } catch {
      RetryUtility.logger.warn(`Falling back for "${operationName}"`);
      return await fallback();
    }
  }
}
