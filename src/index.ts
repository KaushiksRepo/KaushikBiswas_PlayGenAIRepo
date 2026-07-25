// PlayGenAI Framework - Main Export
// Enterprise-grade Playwright + Cucumber BDD Automation Framework

// Configuration
export { EnvConfig, BrowserConfig, TestConfig } from './config';

// Core - Browser
export { BrowserFactory, BrowserManager, ContextManager } from './core/browser';

// Core - Pages
export { BasePage } from './core/pages/base.page';

// Core - API
export { ApiClient, ApiRequestBuilder, LoggingInterceptor, AuthInterceptor, RetryInterceptor, CorrelationIdInterceptor } from './core/api';

// Core - Database
export { BaseDatabaseClient, DatabaseFactory } from './core/database';

// Core - Logger
export { Logger } from './core/logger';

// Utilities
export {
  WaitUtility,
  RetryUtility,
  ScreenshotUtility,
  VideoUtility,
  FileUtility,
  DateUtility,
  StringUtility,
  AssertionUtility,
  LocatorUtility,
  DataUtility,
  JsonUtility,
} from './utilities';

// Support
export { CustomWorld, PageFactory } from './support';

// Reporters
export { ReportManager, HtmlReporter, JsonReporter, AllureReporter } from './reporters';

// AI (interfaces only)
export { AiHookRegistry } from './ai';

// Constants
export { TIMEOUTS, MESSAGES, PATHS } from './constants';

// Types
export * from './types';
