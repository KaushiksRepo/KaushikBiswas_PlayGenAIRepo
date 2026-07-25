/**
 * AI Hooks - Extension points for AI agent integration
 *
 * These hooks are invoked at key lifecycle points to allow
 * AI agents to observe, analyze, and intervene in test execution.
 */

export interface IAiHookHandler {
  onTestStart?(context: IAiTestContext): Promise<void>;
  onTestEnd?(context: IAiTestContext, result: IAiTestResult): Promise<void>;
  onStepStart?(context: IAiStepContext): Promise<void>;
  onStepEnd?(context: IAiStepContext, result: IAiStepResult): Promise<void>;
  onLocatorFailure?(context: IAiLocatorFailureContext): Promise<IAiLocatorRecovery | null>;
  onAssertionFailure?(context: IAiAssertionFailureContext): Promise<void>;
}

export interface IAiTestContext {
  testName: string;
  featureName: string;
  tags: string[];
  startTime: string;
}

export interface IAiTestResult {
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  screenshot?: Buffer;
}

export interface IAiStepContext {
  stepText: string;
  stepType: 'Given' | 'When' | 'Then' | 'And' | 'But';
  arguments: unknown[];
}

export interface IAiStepResult {
  status: 'passed' | 'failed';
  duration: number;
  error?: string;
}

export interface IAiLocatorFailureContext {
  locator: string;
  strategy: string;
  pageUrl: string;
  pageHtml?: string;
  error: string;
}

export interface IAiLocatorRecovery {
  newLocator: string;
  confidence: number;
  shouldPersist: boolean;
}

export interface IAiAssertionFailureContext {
  assertion: string;
  expected: unknown;
  actual: unknown;
  pageUrl: string;
}

/**
 * AI Hook Registry - manages registered AI hook handlers.
 * Handlers are invoked in registration order.
 */
export class AiHookRegistry {
  private static handlers: IAiHookHandler[] = [];

  public static register(handler: IAiHookHandler): void {
    AiHookRegistry.handlers.push(handler);
  }

  public static unregister(handler: IAiHookHandler): void {
    const index = AiHookRegistry.handlers.indexOf(handler);
    if (index !== -1) {
      AiHookRegistry.handlers.splice(index, 1);
    }
  }

  public static getHandlers(): IAiHookHandler[] {
    return [...AiHookRegistry.handlers];
  }

  public static clear(): void {
    AiHookRegistry.handlers = [];
  }

  public static async invokeOnLocatorFailure(
    context: IAiLocatorFailureContext,
  ): Promise<IAiLocatorRecovery | null> {
    for (const handler of AiHookRegistry.handlers) {
      if (handler.onLocatorFailure) {
        const recovery = await handler.onLocatorFailure(context);
        if (recovery) {
          return recovery;
        }
      }
    }
    return null;
  }
}
