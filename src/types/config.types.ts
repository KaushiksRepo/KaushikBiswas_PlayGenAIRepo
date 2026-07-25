import { LaunchOptions, BrowserContextOptions } from '@playwright/test';

export interface IEnvironmentConfig {
  baseUrl: string;
  appName: string;
  browser: BrowserType;
  headless: boolean;
  slowMo: number;
  viewportWidth: number;
  viewportHeight: number;
  defaultTimeout: number;
  navigationTimeout: number;
  expectTimeout: number;
  workers: number;
  retries: number;
  retryDelay: number;
  screenshotOnFailure: boolean;
  videoOnFailure: boolean;
  traceOnFailure: boolean;
  logLevel: LogLevel;
  logDir: string;
  apiBaseUrl: string;
  apiTimeout: number;
}

export type Environment = 'dev' | 'qa' | 'uat' | 'stage' | 'prod';

export type BrowserType = 'chromium' | 'firefox' | 'webkit' | 'mobile-chrome' | 'mobile-safari';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface IBrowserConfig {
  launchOptions: LaunchOptions;
  contextOptions: BrowserContextOptions;
}

export interface ITestExecutionConfig {
  parallel: boolean;
  workers: number;
  retries: number;
  retryDelay: number;
  tags: string[];
  timeout: number;
}

export interface IReportConfig {
  outputDir: string;
  screenshotDir: string;
  videoDir: string;
  traceDir: string;
  allureResultsDir: string;
  htmlReportDir: string;
  jsonReportDir: string;
  attachScreenshotOnFailure: boolean;
  attachVideoOnFailure: boolean;
  attachTraceOnFailure: boolean;
}
