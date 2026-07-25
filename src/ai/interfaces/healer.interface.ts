/**
 * AI Healer Agent Interface
 *
 * Responsible for self-healing broken locators and tests.
 * Detects locator failures and proposes alternatives.
 */
export interface IAiHealer {
  /**
   * Attempt to heal a broken locator by analyzing the page.
   */
  healLocator(context: IHealingContext): Promise<IHealingResult>;

  /**
   * Analyze a test failure and suggest fixes.
   */
  analyzeFailure(failure: ITestFailure): Promise<IHealingSuggestion[]>;

  /**
   * Record a successful locator resolution for learning.
   */
  recordSuccess(locator: string, element: IElementSnapshot): void;

  /**
   * Get healing statistics.
   */
  getStats(): IHealingStats;
}

export interface IHealingContext {
  /** The original locator that failed */
  originalLocator: string;
  /** The locator strategy used */
  strategy: 'css' | 'xpath' | 'testid' | 'role' | 'text' | 'label';
  /** Page URL where failure occurred */
  pageUrl: string;
  /** HTML snapshot around the expected element location */
  htmlSnapshot?: string;
  /** Previously known attributes of the element */
  previousAttributes?: Record<string, string>;
  /** Screenshot of the page at failure time */
  screenshot?: Buffer;
}

export interface IHealingResult {
  healed: boolean;
  newLocator?: string;
  newStrategy?: string;
  confidence: number;
  reasoning: string;
  alternatives: ILocatorAlternative[];
}

export interface ILocatorAlternative {
  locator: string;
  strategy: string;
  confidence: number;
  reasoning: string;
}

export interface ITestFailure {
  testName: string;
  stepName: string;
  error: string;
  stackTrace: string;
  locator?: string;
  pageUrl: string;
  screenshot?: Buffer;
  timestamp: string;
}

export interface IHealingSuggestion {
  type: 'locator-change' | 'step-modification' | 'wait-addition' | 'flow-change';
  description: string;
  suggestedCode: string;
  confidence: number;
  breaking: boolean;
}

export interface IElementSnapshot {
  tagName: string;
  attributes: Record<string, string>;
  textContent: string;
  boundingBox: { x: number; y: number; width: number; height: number };
  xpath: string;
  cssPath: string;
}

export interface IHealingStats {
  totalAttempts: number;
  successfulHeals: number;
  failedHeals: number;
  healRate: number;
  mostHealedLocators: { locator: string; count: number }[];
}
