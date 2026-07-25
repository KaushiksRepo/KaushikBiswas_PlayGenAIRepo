import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { IEnvironmentConfig } from '../types/config.types';
import { ILogger } from '../types/logger.types';
import { ApiClient } from '../core/api/api.client';
import { Logger } from '../core/logger';
import { EnvConfig } from '../config/env.config';
import { WaitUtility } from '../utilities/wait.utility';
import { LocatorUtility } from '../utilities/locator.utility';
import { AssertionUtility } from '../utilities/assertion.utility';
import { DataUtility } from '../utilities/data.utility';

export interface ICustomWorldOptions extends IWorldOptions {
  parameters: Record<string, unknown>;
}

export class CustomWorld extends World {
  // Core Playwright
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;

  // Configuration
  public config: IEnvironmentConfig;
  public logger: ILogger;

  // Utilities (initialized after page is created)
  public waitUtil!: WaitUtility;
  public locatorUtil!: LocatorUtility;
  public assertUtil: AssertionUtility;
  public dataUtil: DataUtility;

  // API
  public apiClient!: ApiClient;

  // Test context
  public testName: string = '';
  public scenarioTags: string[] = [];
  public scenarioStatus: 'passed' | 'failed' | 'skipped' = 'passed';
  public startTime: number = Date.now();

  // Shared state across steps within a scenario
  public scenarioContext: Map<string, unknown> = new Map();

  constructor(options: ICustomWorldOptions) {
    super(options);
    this.config = EnvConfig.getInstance().getConfig();
    this.logger = Logger.getInstance('world');
    this.assertUtil = new AssertionUtility();
    this.dataUtil = new DataUtility();
  }

  /**
   * Initialize page-dependent utilities.
   * Called from hooks after page is created.
   */
  public initializePageUtilities(): void {
    if (this.page) {
      this.waitUtil = new WaitUtility(this.page);
      this.locatorUtil = new LocatorUtility(this.page);
    }
  }

  /**
   * Initialize API client.
   * Called from hooks or steps when API access is needed.
   */
  public initializeApiClient(baseUrl?: string): void {
    this.apiClient = new ApiClient(baseUrl);
  }

  /**
   * Store a value in scenario context for sharing between steps.
   */
  public setContext<T>(key: string, value: T): void {
    this.scenarioContext.set(key, value);
  }

  /**
   * Retrieve a value from scenario context.
   */
  public getContext<T>(key: string): T {
    if (!this.scenarioContext.has(key)) {
      throw new Error(`Scenario context does not contain key: "${key}"`);
    }
    return this.scenarioContext.get(key) as T;
  }

  /**
   * Check if scenario context contains a key.
   */
  public hasContext(key: string): boolean {
    return this.scenarioContext.has(key);
  }

  /**
   * Get elapsed time since scenario start.
   */
  public getElapsedTime(): number {
    return Date.now() - this.startTime;
  }
}

setWorldConstructor(CustomWorld);
